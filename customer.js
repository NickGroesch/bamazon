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

connection.connect(function(err) {
  // console.log("connected");
  displayProducts();

  connection.end();
});

function displayProducts() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    let displayTable = [];
    res.forEach(v => displayTable.push(renderRow(v)));
    renderTable(displayTable);
  });
}

function renderRow(v) {
  let row = [];
  for (var prop in v) {
    row.push(v[prop]);
  }
  return row;
}

function invite() {
  //   inquirer.prompt([]);
}
function renderTable(data) {
  let output = table.table(data);
  console.log(output);
}
