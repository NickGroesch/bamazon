var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("table");
// because "its drier to require" (working functionality from other files)
var rend = require("./bamazonCustomer");
//console.log(rend);

// bamazon wouldn't work without a database!
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  console.log("Bamazon Manager Interface");
  displayManager();
});

function displayManager() {
  inquirer
    .prompt([
      {
        name: "option",
        message: "What do you want to do?",
        type: "list",
        choices: [
          "View Products",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ]
      }
    ])
    .then(ans => {
      switch (ans.option) {
        case "View Products":
          view();
          break;
        case "View Low Inventory":
          low();
          break;
        case "Add to Inventory":
          restock();
          break;
        case "Add New Product":
          newProd();
          break;
        case "Exit/n":
          connection.end();
          break;
      }
    });
}
function view() {
  console.log("view func");
  rend(displayManager, "select * from products;");
  //displayManager();
}
function low() {
  console.log("WARNING: Low Inventory");
  rend(displayManager, "select * from products where quantity<10;");
  //displayManager();
}
function restock() {
  console.log("restock");
  inquirer
    .prompt([
      {
        name: "which",
        message: "Enter item ID to restock"
      },
      {
        name: "many",
        message: "How many will you restock?"
      }
    ])
    .then(ans => {
      connection.query(
        `UPDATE products SET quantity=quantity+${parseInt(ans.many)} WHERE ?`,
        [{ id: ans.which }]
      );
      displayManager();
    });
}
function newProd() {
  inquirer
    .prompt([
      {
        name: "what",
        message: "What is the name of the product you'll add?"
      },
      {
        name: "price",
        message: "How much will it cost?"
      },
      {
        name: "which",
        message: "Which department will the product be in?"
      },
      {
        name: "stock",
        message: "How many will you stock?"
      }
    ])
    .then(ans => {
      connection.query(
        "INSERT INTO products SET ?",
        [
          {
            product: ans.what,
            price: parseFloat(ans.price),
            department: ans.which,
            quantity: parseInt(ans.stock)
          }
        ],
        (err, res) => {
          console.log("item inserted");
          displayManager();
        }
      );
    });
}
