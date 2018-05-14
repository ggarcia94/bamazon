var mysql = require("mysql");
var inquirer = require("inquirer");
var sprintf=require("sprintf-js").sprintf;

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
    displayProducts();
});

// function which prompts the user for what action they should take
function start() {
    inquirer

        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "Enter the Item ID you would like to purchase:"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            var itemID = answer.itemID;
            var quantity = answer.quantity;
            connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE item_id=" + itemID, function (err, res) {
                if (res === undefined || res.length === 0) {
                    console.log("Sorry you have entered an incorrect item ID.\nPlease try again");
                    displayProducts();
                } else if (quantity > res[0].stock_quantity) {
                    console.log("You have requested to purchase the following quantity: " + quantity + ".  We only have " + res[0].stock_quantity + " in stock.\nPlease try again.");
                    displayProducts();
                } else {
                    var newQuantity = Number(res[0].stock_quantity) - Number(quantity);
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
                    var total = Number(quantity) * Number(res[0].price);
                    console.log(sprintf("Your total is: $%.2f", total));
                    displayProducts();
                }
            });

        });
}

function displayProducts() {
    console.log("PRODUCTS FOR SALE\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            //console.log("Item ID: %i Product: %s Pricw" + res[i].item_id + " Product: " + res[i].product_name + "        Price: $" + res[i].price);
            console.log(sprintf("Item ID: %-8i Product: %-25s Price: $%-10.2f", res[i].item_id, res[i].product_name, res[i].price));
            
        }
    
        start();
        //console.log(res[0]);
        //connection.end();
    });
}