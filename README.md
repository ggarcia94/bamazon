# bamazon
This is the Readme file for my bamazon app.  The bamazon app requires three packages:
inquirer 
mysql
sprinf-js

The package.json file has these dependencies and the packages can be loaded by the "npm install" command.

The file bamazonSeeds.sql has the mysql database commands needed to build the bamazon database, add the products table and add the 
initial product information.  

The file bamazonCustomer.js runs the customer application and the file bamazonManager.js runs the manager application.

bamazonCustomer.js
-------------------
Launching the customer app:

gerardo:bamazon$ node bamazonCustomer.js 

PRODUCTS FOR SALE

Item ID    Product                   Price      
1000       Bicyle                    $150.00    
1001       Skateboard                $75.00     
1002       Baseball Bat              $175.00    
1003       Baseball Glove            $100.00    
1005       Baseball                  $3.00      
2000       Dell Laptop               $500.00    
2001       Acer Laptop               $250.00    
2002       Mouse                     $25.00     
2003       Headset                   $15.00     
2004       External Hard Drive       $100.00    
2005       Keyboard                  $35.00     


? Enter the Item ID you would like to purchase: 

The customer application shows the products that are for sale.  The customer chooses a product by entering an Item ID.

? Enter the Item ID you would like to purchase: 1001
? How many would you like to purchase? 2
Your total is: $150.00

The customer chooses and item and the quantity required.  The application then gives the customer the total for the sale and the
amount of items sold are removed from inventory.  

If a customer tries to buy more than there is in stock we gove them an error message and prompt them to try again.

? Enter the Item ID you would like to purchase: 1001
? How many would you like to purchase? 100
You have requested to purchase the following quantity: 100.  We only have 9 in stock.
Please try again.

bamazonManager.js
-----------------
The bamazon manager application gives the manager four functions shown below:

gerardo:bamazon$ node bamazonManager.js 
? MANAGER MENU 
  1) View Products for Sale
  2) View Low Inventory
  3) Add to Inventory
  4) Add New Product
  Answer: 


1. Let's view the products for sale:

? MANAGER MENU View Products for Sale

Item ID    Product                   Price       Quantity  
1000       Bicyle                    $150.00     10        
1001       Skateboard                $75.00      7         
1002       Baseball Bat              $175.00     8         
1003       Baseball Glove            $100.00     10        
1005       Baseball                  $3.00       50        
2000       Dell Laptop               $500.00     4         
2001       Acer Laptop               $250.00     4         
2002       Mouse                     $25.00      10        
2003       Headset                   $15.00      20        
2004       External Hard Drive       $100.00     10        
2005       Keyboard                  $35.00      9         


? MANAGER MENU 
  1) View Products for Sale
  2) View Low Inventory
  3) Add to Inventory
  4) Add New Product
  Answer: 

2.  Let's view any items in inventory that have 5 or less in stock:

? MANAGER MENU View Low Inventory

Item ID    Product                   Price       Quantity  
2000       Dell Laptop               $500.00     4         
2001       Acer Laptop               $250.00     4         


3.  Let's add to inventory:

? MANAGER MENU Add to Inventory
? Enter the Item ID 2005
? How many items would you like to add to inventory? 11
You have successfully added to inventory!


We have added 11 keyboards.  Let's run option 1 again to check the stock.

? MANAGER MENU View Products for Sale

Item ID    Product                   Price       Quantity  
1000       Bicyle                    $150.00     10        
1001       Skateboard                $75.00      7         
1002       Baseball Bat              $175.00     8         
1003       Baseball Glove            $100.00     10        
1005       Baseball                  $3.00       50        
2000       Dell Laptop               $500.00     4         
2001       Acer Laptop               $250.00     4         
2002       Mouse                     $25.00      10        
2003       Headset                   $15.00      20        
2004       External Hard Drive       $100.00     10        
2005       Keyboard                  $35.00      20        

We now have 20 keyboards in stock.

4.  Let's add a new product 
? MANAGER MENU Add New Product
? Please enter the Item ID of the new product: 2006
? Please enter the name of the product: Fidget Spinner
? Please enter the price of the product: 5
? Please enter a department for the product: Sporting Goods
? Please enter the initial quantity of the product: 100
Your product was added successfully!

Let's check our products now.

? MANAGER MENU View Products for Sale

Item ID    Product                   Price       Quantity  
1000       Bicyle                    $150.00     10        
1001       Skateboard                $75.00      7         
1002       Baseball Bat              $175.00     8         
1003       Baseball Glove            $100.00     10        
1005       Baseball                  $3.00       50        
2000       Dell Laptop               $500.00     4         
2001       Acer Laptop               $250.00     4         
2002       Mouse                     $25.00      10        
2003       Headset                   $15.00      20        
2004       External Hard Drive       $100.00     10        
2005       Keyboard                  $35.00      20        
2006       Fidget Spinner            $5.00       100       

We now sell Fidget Spinners but I think we missed the boat on that one.  
