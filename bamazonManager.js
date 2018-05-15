var mysql = require("mysql");
var inquirer = require("inquirer");
var sprintf = require("sprintf-js").sprintf;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    managerMenu();
});

function managerMenu() {
    inquirer
        .prompt([
            {
                name: "managerChoice",
                type: "rawlist",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "MANAGER MENU"
            }
        ])
        .then(function (answer) {
            switch (answer.managerChoice) {
                case 'View Products for Sale':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Add to Inventory':
                    addToInventory();
                    break;
                case 'Add New Inventory':
                    addNewProduct();
                    break;
            }
        });
}

function viewProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        displayProducts(res);
        managerMenu();
    });
}

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, res) {
        if (err) throw err;
        displayProducts(res);
        managerMenu();
    });
}

function displayProducts(res) {
    console.log(sprintf("\n%-10s %-25s %-11s %-10s", "Item ID", "Product", "Price", "Quantity"));
    for (var i = 0; i < res.length; i++) {
        console.log(sprintf("%-10i %-25s $%-10.2f %-10i", res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity));
    }
    console.log("\n");
}

function addToInventory() {

    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        displayProducts(res);
    });

    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "Enter the Item ID"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to add to inventory?"
            }
        ])
        .then(function (answer) {
            var itemID = answer.itemID;
            var quantity = answer.quantity;
            connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE item_id=" + itemID, function (err, res) {
            var newQuantity = Number(res[0].stock_quantity) + Number(quantity);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: itemID
                    }
                ]
            )
            managerMenu();
        });
    });
}

