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


connection.connect(function (err) {
    if (err) throw err;
    // run the displayProducts function
    displayProducts();
});


function start() {
    //This function will prompt the customer to choose and item to buy and then give a total for the sale.
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
            var itemID = answer.itemID;
            var quantity = answer.quantity;
            connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE item_id=" + itemID, function (err, res) {
                if (err) throw err;
                //Check to make sure customer chose a valid item ID.
                if (res === undefined || res.length === 0) {
                    console.log("Sorry you have entered an incorrect item ID.\nPlease try again");
                    displayProducts();
                //Let the customer know if we don't have enough inventory.
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
                        ],
                        function (err) {
                            if (err) throw err;
                            var total = Number(quantity) * Number(res[0].price);
                            console.log(sprintf("Your total is: $%.2f", total));
                            displayProducts();
                        });
                }
            });
        });
}

function displayProducts() {
    //This function will display all of the products for sale.
    console.log("\nPRODUCTS FOR SALE");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log(sprintf("\n%-10s %-25s %-11s", "Item ID", "Product", "Price"));
        for (var i = 0; i < res.length; i++) {
            console.log(sprintf("%-10i %-25s $%-10.2f", res[i].item_id, res[i].product_name, res[i].price));
        }
        console.log("\n");
        start();
    });
}