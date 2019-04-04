# BAMAZON

### Node.js & MySQL

## Overview

In this activity, I created an Amazon-like storefront with MySQL. The app takes in orders from customers and depletes stock from the store's inventory. Additionally, it offers a manager's interface to allow for stock checking, restocking, and adding products.

<!-- ## Submission Guide

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku. This time, though, you need to include screenshots, a gif, and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file.

* Include screenshots (or a video) of typical user flows through your application (for the customer and if relevant the manager/supervisor). This includes views of the prompts and the responses after their selection (for the different selection options).

* Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works.

* Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.

If you haven't written a markdown file yet, [click here for a rundown](https://guides.github.com/features/mastering-markdown/), or just take a look at the raw file of these instructions.

### Submission on BCS

* Please submit the link to the Github Repository! -->

<!-- ## Instructions -->

## Minimum Viable Product: Customer View

In a MySQL Database called `bamazon` I created three tables: **products**, **cart** and **sales**.

The products table has each of the following columns:

- id (unique id for each product)

- product_name (Name of product)

- department_name

- price (cost to customer)

- quantity (how much of the product is available in stores)

I initially populated this database with around 10 different products. Then I created a Node application called `bamazonCustomer.js`which first displays all of the items available for sale. The app then prompts users with two messages.

- The first should ask them the ID of the product they would like to buy. Input validation is supplied to help users who have trouble with ID entry through a list prompt.
- The second message asks how many units of the product they would like to buy, reminding them of the price.

The application checks if your store has enough of the product to meet the customer's request.

- If not, the app informs the user of the shortcoming and prevents the order from going through.
- However, if the store _does_ have enough of the product, it fulfills the user's order, updating the SQL database to reflect the remaining quantity.
- Once the update goes through, the user is allowed to add more items to the cart.
- The user may empty the cart, in which case the stock is updated in the products table.
- The user may check out, in which case the sales table is updated with the subtotal of each item (price\*quantity), and the user is charged the total of all items.

## More Valuable Program: Manager View

I created a Node application called `bamazonManager.js`. Running this application will:

- List a set of menu options:

  - View Products for Sale

  - View Low Inventory

  - Add to Inventory

  - Add New Product

- If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

- If a manager selects `View Low Inventory`, it lists all items with an inventory count lower than forty.

- If a manager selects `Add to Inventory`, the app displays a prompt that allows the manager to "add more" of any item currently in the store.

- If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.
  <!--

---

- If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge. -->

<!-- - - -

### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department

   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :) -->
<!--
### Reminder: Submission on BCS

* Please submit the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!** -->
