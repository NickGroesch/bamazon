# BAMAZON

### Node.js & MySQL

## Overview

In this activity, I created an Amazon-like storefront with MySQL. The app takes in orders from customers and depletes stock from the store's inventory. Additionally, it offers a manager's interface to allow for stock checking, restocking, and adding products.

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

### Video Demo

A demonstration of this command line interface app is available [here](https://youtu.be/lexx4e4u8u4).
