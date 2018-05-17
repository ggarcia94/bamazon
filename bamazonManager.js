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
    // run the managerMene function after the connection is made to prompt the user
    managerMenu();
});

function managerMenu() {
    //This is our main manager function which shows the four manager options.
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
                case 'Add New Product':
                    addNewProduct();
                    break;
            }
        });
}

function viewProducts() {
    //This function will show us the products that are for sale.
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        displayProducts(res);
        managerMenu();
    });
}

function viewLowInventory() {
    //This function will show us any products that have 5 or less 
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, res) {
        if (err) throw err;
        displayProducts(res);
        managerMenu();
    });
}

function displayProducts(res) {
    //This function helps us format the products nicely on the terminal.
    console.log(sprintf("\n%-10s %-25s %-11s %-10s", "Item ID", "Product", "Price", "Quantity"));
    for (var i = 0; i < res.length; i++) {
        console.log(sprintf("%-10i %-25s $%-10.2f %-10i", res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity));
    }
    console.log("\n");
}

function addToInventory() {
    //This function will add more stock to existing products.
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
                if (err) throw err;
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
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("You have successfully added to inventory!")
                        managerMenu();
                    });
            });
        });
}

function addNewProduct() {
    //This function will add a new product to the products for sale.
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "Please enter the Item ID of the new product:"
            },
            {
                name: "product",
                type: "input",
                message: "Please enter the name of the product:"
            },
            {
                name: "price",
                type: "input",
                message: "Please enter the price of the product:"
            },
            {
                name: "department",
                type: "input",
                message: "Please enter a department for the product:"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the initial quantity of the product:"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    item_id: answer.itemID,
                    product_name: answer.product,
                    price: answer.price,
                    department_name: answer.department,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was added successfully!");
                    // re-prompt the user
                    managerMenu();
                });
        });
}