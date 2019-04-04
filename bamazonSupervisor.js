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
          "Create New Department",
          "Exit"
        ]
      }
    ])
    .then(ans => {
      switch (ans.option) {
        case "Update Sales Data":
          updateSales();
          break;
        case "View Sales by Department":
          viewSales();
          break;
        case "Create New Department":
          createDept();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
function createDept() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department you'll add?"
      },
      {
        name: "overhead",
        message: "How much is this departments overhead?"
      }
    ])
    .then(ans => {
      connection.query(
        "INSERT INTO departments SET ?",
        [
          {
            department: ans.name,
            overhead: parseFloat(ans.overhead)
          }
        ],
        (err, res) => {
          console.log("Department Added");
          displaySupervisor();
        }
      );
    });
}
