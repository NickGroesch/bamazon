const inquirer = require("inquirer");
var mysql = require("mysql");
const table = require("table");
const rend = require("./bamazonCustomer");
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
  displayOptions();
});

function displayOptions() {
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
        case "Exit":
          connection.end();
          break;
      }
    });
}
function view() {
    
    connection.query(`select * from products`, (err, res) => {
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
        console.log("view");
}
function low() {
  connection.query(`select * from products where quantity<10`, (err, res) => {
    console.log("low");
    console.log(res);
  });
}
function restock() {
  console.log("restock");
}
function newProd() {
  console.log("newProd");
}
