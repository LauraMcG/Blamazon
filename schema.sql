CREATE database blamazon;

USE blamazon;

CREATE TABLE products (
ID INT(4) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (10, 4) NOT NULL,
stock_quantity INT (4) NOT NULL,
PRIMARY KEY (id)
);

