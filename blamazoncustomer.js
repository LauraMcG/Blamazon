//BLAMAZON
//Blamazon is a baisc storefront app that utilizes Node and mySQL.

//getting the required node packages
var inquirer = require('inquirer');
var mysql = require('mysql');

//Connecting to mySQL
var connection = mysql.createConnection({
	host:'localhost',
	port: 3306,
	user: '',
	password: '',
	database: 'blamazon'
});

connection.connect(function(err) {
	if(err) {
		console.log(err);
	}
});

//viewProducts simply displays a list of products, including their ID number and price.
function viewProducts() {
	connection.query('SELECT * FROM products', function(error, response) {
		if (error) {
	 		console.log(error);
		} else {
			console.log('Welcome to Blamazon! Please browse our products below:');
	 		for (var i = 0; i < response.length; i++) {
	 			console.log('Product ID ' 
	 				+ response[i].ID  + ' | ' 
	 				+ response[i].product_name + ' | $'
	 				+ response[i].price );
	 		}

	 		makeAnOrder();
		}		
	});
}
//asking the user to 
function makeAnOrder() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'productID',
			message: 'Please provide the ID for the product you want to buy:'
		},

		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you want?'
		}
	]).then(function(order){
		//once we know what item and how many, we'll run a query to pull all the info on the item in question
		//we'll log any errors that appear
		//then we'll check to make sure we have enough in stock. if not, we'll display an error.
		//if we've got enough, we'll change the stock accordingly and display the amount owed.
		connection.query('SELECT * FROM products WHERE id = ?', [order.productID], function(error, response) {
			if (error) {
				console.log('There was an error: ' + error);
			} else if (order.quantity > response[0].stock_quantity) {
				console.log('Low stock!');
			} else {

				var newStock = response[0].stock_quantity - order.quantity;

				var orderPrice = order.quantity * response[0].price;

				connection.query('UPDATE products SET stock_quantity = ? WHERE id= ?', [newStock, order.productID],
					function (error, response) {
						if (error) {
							console.log('There was an error: ' + error);
						} else {
							console.log('order placed! your total is $' + orderPrice);
						}
					});
			}
		});
	});
}

viewProducts();
