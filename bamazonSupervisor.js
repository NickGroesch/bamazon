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
  console.log("Bamazon Supervisor Interface");
  displaySupervisor();
});
function displaySupervisor() {
  inquirer
    .prompt([
      {
        name: "option",
        message: "What do you want to do?",
        type: "list",
        choices: [
          "Update Sales Data",
          "View Sales by Department",
          "Create New Department"
        ]
      }
    ])
    .then(ans => {
      console.log(ans.option);
    });
}
