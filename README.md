# Blamazon
Node.js and MySQL-based storefront platform. 

## Getting Started

1. Copy the respository link and install to your drive.
2. Add the Inquirer and MySQL node packages by running `npm install` in your console.
3. Utilize `schema.sql` and `seeds.sql` to create a local SQL database.

## Blamazon Customer View (blamazoncustomer.js)

As a customer, users can view and purchase products. The user is presented with the full list of avaiable items, and then prompted to make a purchase with the product ID and quantity:

![blamazon customer view](/images/blamazoncustomer.png)

## blamazonmanager.js

As a manager, users can view the full inventory, see which items are low in stock, add inventory, and add new products. The below screenshots show all of these features in action:

![blamazon manager view 1](/images/blamazonmanager1.png)
![blamazon manager view 2](/images/blamazonmanager2.png)

## Technologies Used

- Javascript
- mySQL
- nodeJS
- npm packages
  - mysql
  - inquirer