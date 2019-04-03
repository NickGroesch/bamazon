const inquirer = require("inquirer");
var mysql = require("mysql");
const table = require("table");
// var promiseDisplay = require("./display");
// bamazon wouldn't work without a database!
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
connection.connect(function(err) {
  // grabs the data from database and renders a table for shopper, then directs them to shop
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
        res.forEach(v => displayTable.push(renderRow(v)));
        renderTable(displayTable);
        resolve("success");
        param();
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
  module.exports = promiseDisplay;
  // module.exports = {
  //   // row: renderRow(),
  //   // table: renderTable(),
  //   // display: promiseDisplay()
  // };
});
