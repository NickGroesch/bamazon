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
});

function displayProducts() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    let displayTable = [];
    res.forEach(v => displayTable.push(renderRow(v)));
    renderTable(displayTable);
    invite();
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

function invite() {
  inquirer
    .prompt([
      {
        message: "Enter the ID of the product you'd like to buy",
        name: "buyId"
      }
    ])
    .then(ans => {
      console.log(ans.buyId);

      connection.query(
        `SELECT * FROM products WHERE id='${ans.buyId}'`,
        function(err, res) {
          console.log(res);

          inquirer
            .prompt([
              {
                message: `${res[0].product}s costs ${
                  res[0].price
                } each. How many would you like?`,
                name: "quantity"
              }
            ])
            .then(ans => {
              console.log(ans.quantity);
            });
        }
      );
    });
}
