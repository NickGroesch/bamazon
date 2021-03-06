const inquirer = require("inquirer");
var mysql = require("mysql");
const table = require("table");
// bamazon wouldn't work without a database!
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
// global flags for data that we don't want scoped
let productX;
let quantityX;
let idX;
let priceX;
let userQuantity;
let maxIndex = 0;
// this conditional is super important, as it allows for promiseDisplay to be exported without automatically running with arguments from timetobuy() if called from another file
if (__filename == process.argv[1]) {
  //when called from this file, this initialization function begins the waterfall program flow
  connection.connect(function(err) {
    console.log(
      "----------------------Welcome to BAMAZON------------------------"
    );
    // // // if i disable this the trouble works in manager
    timetobuy();
  });
}
// this function grabs the data from database and renders a table for shopper, then directs them to shop
function timetobuy() {
  promiseDisplay(chooseBuy, "select * from products");
}
// this function takes a callback(param), and a query, and creates a table with the help of renderRow and renderTable
let promiseDisplay = function(param, query) {
  displayProducts = new Promise((resolve, reject) => {
    connection.query(query, function(err, res) {
      let displayTable = [];
      displayTable.push([
        "-ID-",
        "-Product-",
        "-Price-",
        "-Department-",
        "-Quantity-"
      ]);
      res.forEach((v, i) => {
        displayTable.push(renderRow(v));
        maxIndex = i + 1;
      });
      renderTable(displayTable);
      param();
      resolve("success");
    });
  });
};
// for in loop renders table row for each product
function renderRow(v) {
  let row = [];
  for (var prop in v) {
    row.push(v[prop]);
  }
  return row;
}
// actually renders the table to the console
function renderTable(data) {
  let output = table.table(data);
  console.log(output);
}
// basic numeral entry to choose which item to shop for
function chooseBuy() {
  inquirer
    .prompt([
      {
        message: "Enter the ID of the product you'd like to buy.",
        name: "buyId"
      }
    ])
    .then(ans => {
      // validate user input, first making sure its a number (>0), then making sure its a valid id (<maxIndex)
      if (0 < ans.buyId && ans.buyId <= maxIndex) {
        howMany(ans.buyId);
      } else {
        pickList();
      }
    });
}
// this function reminds the user of the price and asks how many they want
function howMany(buyId) {
  connection.query(`SELECT * FROM products WHERE id='${buyId}'`, function(
    err,
    res
  ) {
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
        if (userQuantity > quantityX) {
          console.log(
            `So sorry, we only have ${quantityX}. We can't sell you ${userQuantity}.`
          );
          howMany(idX);
        } else {
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
        }
      });
  });
}
// in case the user needs help picking items because of validation issues
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
// after the user has picked an item and quantity, we give them a choice to shop more, checkout, or empty the cart
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
        checkOut();
      }
      if (ans.decide == "Keep Shopping") {
        timetobuy();
      }
      if (ans.decide == "Empty Cart") {
        emptyCart();
      }
    });
}
// if they empty the cart, we put the items they didn't pay for back on the virtual shelves, taking them out of the virtual cart when we do so
function emptyCart() {
  connection.query(`SELECT * FROM cart`, function(err, res) {
    res.forEach((v, i) => {
      // cart row id
      let returnCart = res[i].id;
      // foreign product id (where to return product)
      let returnId = res[i].productId;
      // quantity in cart
      let returnQuantity = res[i].cartQuantity;
      connection.query(
        `UPDATE products SET quantity=quantity+${returnQuantity} WHERE ?`,
        [{ id: returnId }],
        function(err, res) {
          connection.query(`delete from cart where id= '${returnCart}'`);
        }
      );
    });
  });
  shopMore();
}
// when the customer has shopped enough, it's time to take their money!
function checkOut() {
  let totalPrice = 0;
  connection.query("select * from cart", function(err, res) {
    res.forEach((v, i) => {
      let subtotal = res[i].cartQuantity * res[i].price;
      console.log(
        `${res[i].cartQuantity} ${res[i].product}s at $${
          res[i].price
        } each is ${subtotal}`
      );
      totalPrice += subtotal;
      // can't leave them in the cart
      connection.query(`delete from cart where id= '${res[i].id}'`);
      // the store prefers to track sales
      connection.query("INSERT INTO sales SET ?", {
        product: res[i].product,
        price: res[i].price,
        unitsSold: res[i].cartQuantity,
        productId: res[i].productId,
        totalSales: subtotal
      });
    });
    console.log(
      `Your total comes out to ${totalPrice.toFixed(2)}. Have a bamazing day!`
    );
    connection.end();
  });
}
// export the promise display functionality
module.exports = promiseDisplay;
