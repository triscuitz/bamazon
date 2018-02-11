# bamazon
This is a node based store app. 

# customer view
The customer view is the main (currently only) view working in this app. It is accessed via running customer.js.
Once your are in customer view you will be given a list of the items in the store. This list will contain a unique ID for each item, an item name and a cost, ie: 'ID: 1 PRODUCT: iPhone 8 COST: $699'.

![Shot1](./images/image1.png)

The customer will be asked what item they would like to purchase and then they will be asked how many of the given item they would like to purchase. Upon responce to both of these the system will check if there is suffecient stock to fill the order, if there is, the order will be placed and the customer will be given a total cost for the purchase. 

![Shot2](./images/image2.png)

After the customer makes a purchase the product Db will be updated to reflect the change in stock of the purchased item. And the customer will be again asked if they would like to make a purchase.
