CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
    (1000, "Bicyle", "Sporting Goods", 150, 5),
    (1001, "Skateboard", "Sporting Goods", 75, 10),
    (1002, "Baseball Bat", "Sporting Goods", 175, 8),
    (1003, "Baseball Glove", "Sporting Goods", 100, 10),
    (1005, "Baseball", "Sporting Goods", 3, 50),
    (2000, "Dell Laptop", "Electronics", 500, 3),
    (2001, "Acer Laptop", "Electronics", 250, 4),
    (2002, "Mouse", "Electronics", 25, 10),
    (2003, "Headset", "Electronics", 15, 20),
    (2004, "External Hard Drive", "Electronics", 100, 10); 