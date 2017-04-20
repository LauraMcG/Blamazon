//BLAMAZON
//Blamazon is a baisc storefront app that utilizes Node and mySQL.

//getting the required node packages
var inquirer = require('inqurer');
var mysql = require('mysql');

//Connecting to mySQL
var connection = mysql.createConnection({
	host:'localhost',
	port: 3306,
	user: 'root',
//DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	password: 'TOOT!b00t!W00T!',
	database: 'blamazon'
});

connection.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('connection successful!');
	}
});

connection.end();
