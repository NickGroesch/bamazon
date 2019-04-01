const inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  console.log(err);
  console.log("connected");
  displayProducts();

  connection.end();
});
function displayProducts() {
  connection.query(`SELECT * FROM products`, function(err, res) {
    console.log(err);
    res.forEach(v => console.log(v.price));
    console.log(res);
  });
}

function invite() {
  inquirer.prompt([]);
}
