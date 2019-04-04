var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("table");
// because "its drier to require" (working functionality from other files)
var rend = require("./bamazonCustomer");
// bamazon wouldn't work without a database!
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
// this is the initialization function for the database and waterfall program flow
connection.connect(function(err) {
  console.log("Bamazon Supervisor Interface");
  displaySupervisor();
});
// this function routes the program based on user input
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
// this function allows the creation of a department
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
function viewSales() {
  // after sales have been updated we would take the difference of the overhead and the sales to create the profits by department
}
function updateSales() {
  // total the sales by product from the sales table
  connection.query(
    "select product, sum(totalSales) as grandTotal from sales group by product",
    (err, re) => {
      re.forEach((v, i) => {
        let productTotal = re[i].grandTotal;
        let product = re[i].product;
        connection.query(
          `select department from products where product='${re[i].product}'`,
          (err, res) => {
            let productDept = res[0].department;
            // at this point we have grandtotal sales by product and associated department, and could easily
            // use this data to set the department sales total by adding to the present total by department
            console.log(productTotal, product, productDept);
          }
        );
      });
    }
  );
}
