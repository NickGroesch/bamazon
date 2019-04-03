const inquirer = require("inquirer");
var mysql = require("mysql");
const table = require("table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
// global flags
let productX;
let quantityX;
let idX;
let priceX;
let userQuantity;

connection.connect(function(err) {
  console.log("connected");
  displayProducts();
  // chooseBuy();
});

function displayProducts() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    let displayTable = [];
    displayTable.push([
      "-ID-",
      "-Product-",
      "-Price-",
      "-Department-",
      "-Quantity-"
    ]);
    res.forEach(v => displayTable.push(renderRow(v)));
    renderTable(displayTable);
    chooseBuy();
  });
}

function renderRow(v) {
  let row = [];
  for (var prop in v) {
    row.push(v[prop]);
  }
  return row;
}

function renderTable(data) {
  let output = table.table(data);
  console.log(output);
}

function chooseBuy() {
  // displayProducts();
  inquirer
    .prompt([
      {
        message: "Enter the ID of the product you'd like to buy.",
        name: "buyId"
      }
    ])
    .then(ans => {
      // validate user input
      if (0 < ans.buyId) {
        howMany(ans.buyId);
      } else {
        pickList();
      }
    });
}
function howMany(buyId) {
  connection.query(`SELECT * FROM products WHERE id='${buyId}'`, function(
    err,
    res
  ) {
    console.log(res);
    idX = buyId;
    priceX = res[0].price;
    productX = res[0].product;
    quantityX = res[0].quantity;
    inquirer
      .prompt([
        {
          message: `${productX}s cost ${priceX} each. How many would you like?`,
          name: "quantity"
        }
      ])
      .then(ans => {
        userQuantity = ans.quantity;
        connection.query(
          "INSERT INTO cart SET ?",
          {
            product: productX,
            price: priceX,
            cartQuantity: userQuantity,
            productId: idX
          },
          function(err, res) {
            console.log("Added to cart!");
            connection.query("UPDATE products SET ? WHERE ?", [
              {
                quantity: quantityX - userQuantity
              },
              {
                id: idX
              }
            ]);

            shopMore();
          }
        );
      });
  });
}
function pickList() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    let choiceArray = [];
    res.forEach((v, i) => {
      let item = { value: `${v.id}`, name: `${v.product}` };
      choiceArray.push(item);
    });
    inquirer
      .prompt([
        {
          message: "I couldn't understand that, pick this way.",
          name: "buyList",
          type: "list",
          choices: choiceArray
        }
      ])
      .then(ans => {
        howMany(ans.buyList);
      });
  });
}
function shopMore() {
  inquirer
    .prompt([
      {
        name: "decide",
        message: "What's next?",
        type: "list",
        choices: ["Keep Shopping", "Empty Cart", "Check Out"]
      }
    ])
    .then(function(ans) {
      if (ans.decide == "Check Out") {
        console.log("?CHECKOUT");
      }
      if (ans.decide == "Keep Shopping") {
        displayProducts();
      }
      if (ans.decide == "Empty Cart") {
        emptyCart();
      }
    });
}
function emptyCart() {
  connection.query(`SELECT * FROM cart`, function(err, res) {
    res.forEach((v, i) => {
      let returnId = res[i].productId;
      let returnQuantity = res[i].cartQuantity;
      connection.query(
        `UPDATE products SET quantity=quantity+${returnQuantity} WHERE ?`,
        [{ id: returnId }],
        function(err, res) {
          connection.query(`delete from cart where id= '${i + 1}'`);
        }
      );
    });
  });
}
