
//collecting dependencies
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

//----- Functions -----

//doSomethingElse gives the user the option to select another task, or exit the program.
function doSomethingElse() {
	inquirer.prompt([
	{
		type: 'confirm',
		name: 'doSomethingElse',
		message: 'Would you like to do something else?'
	}
	]).then(function(user) {
		if (user.doSomethingElse) {
			blamazonManager();
		} else {
			console.log('Thank you for visiting! Have a blamtastic day!');
			connection.end();
		}
	});
}


//listProducts is used in listProducts and viewLowInventory to create a friendlier display for the product list.
function listProducts (response) {
	for (var i = 0; i < response.length; i++) {
		console.log('Product ID ' 
	 		+ response[i].ID  + ' | ' 
	 		+ response[i].product_name + ' | $'
	 		+ response[i].price + ' | ' 
	 		+ response[i].stock_quantity + ' units');
	 		}
}

// View Products for Sale: Does what it says on the label
function viewProducts() {
	connection.query('SELECT * FROM products', function(error, response) {
		if (error) {
	 		console.log(error);
		} else {
			console.log('Here are our current products:');
			listProducts(response);
			doSomethingElse();
		}

	});
}

// View Low Inventory
//lists all items with inventoty lower than 5
function viewLowInventory () {
	connection.query('SELECT * FROM products where stock_quantity < 5', function(error, response) {
		if(error) {
			consoloe.log(error);
		} else {
			console.log('These products are low in stock:');
			listProducts(response);
			doSomethingElse();
		}
	});
}

// Add to Inventory
//"add more" of any item in store
function addInventory (productID, newInventoryCount) {

	connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE id= ?', [newInventoryCount, productID], function(error, response) {
		if(error) {
			consoloe.log(error);
		} else {
			console.log('New stock added!');
			doSomethingElse();
		}
	});
}

// Add New Product
//add a completely new product to the store.

//newProduct constructor to feed the user's entered product specifications into.
//!!!potential problem to solve: ensuring the price and quantiity are stored as numbers and not strings.
function newProduct(productName, departmentName, price, stockQuantity) {
	if (this instanceof newProduct) {
		this.product_name = productName;
		this.department_name = departmentName;
		this.price = price;
		this.stock_quantity = stockQuantity;
	} else {
		return new newProduct (productName, departmentName, price, stockQuantity);
	}
}

function addNewProduct(productName, departmentName, price, stockQuantity) {

	var item = newProduct(productName, departmentName, price, stockQuantity);

	connection.query('INSERT INTO products SET ?', [item], function(error, response) {
		if(error) {
			consoloe.log(error);
		} else {
			console.log('New product added!');
			doSomethingElse();
		}
	});
}

//Blamazon manager is the function that guides the user throughthe various functions of the program, and directs the program to specialized functions with a switch.
function blamazonManager () {
	inquirer.prompt([
		{
			type: 'list',
			name: 'command',
			message: 'Welcome to Blamazon! What would you like to do?',
			choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product', 'Exit']
		}
	]).then(function(input) {
			switch (input.command) {
				case ('View Products'):
					viewProducts();
				break;

				case ('View Low Inventory'):
					viewLowInventory();
				break;

				case ('Add Inventory'):
					inquirer.prompt([
					{
						type: 'input',
						name: 'id',
						message: 'Please enter the ID number of the item with new stock:'
					}, {
						type: 'input',
						name: 'unitAddCount',
						message: 'How many more units do you want to add?'
					}
					]).then(function(user) {
							addInventory(user.id, user.unitAddCount);
					});
				break;

				case('Add New Product'):
					inquirer.prompt([
					{
						type: 'input',
						name: 'productName',
						message: 'What is the name of the new product?'
					}, {
						type: 'input',
						name: 'departmentName',
						message: 'Which department is it a part of?'
					}, {
						type: 'input',
						name: 'price',
						message: 'How much should we charge for it?'
					}, {
						type: 'input',
						name: 'stockQuantity',
						message: 'How many do we have in stock?'
					}
					]).then(function(user) {
							addNewProduct(user.productName, user.departmentName, user.price, user.stockQuantity);
					});
				break;

				case ('Exit'):
					connection.end();
				break;

			}
		});
}

blamazonManager();