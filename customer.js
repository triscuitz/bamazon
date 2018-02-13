const inquirer = require('inquirer');
const connection = require('./connection.js');

// Shows prodoct listing
buyProducts = ()=> {
  let buyItem;
  let buyQuantity;

  connection.query('SELECT * FROM products', function(err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      console.log('ID: ' + data[i].id + ' Product: ' + data[i].itemName + ' Cost: $' + data[i].price);
    };

    inquirer.prompt([
      {
        type: 'input',
        name: 'item',
        message: 'What is the ID of the item you wish to purchase?'
      }]).then(function(purchaseObj) {
          buyItem=purchaseObj.item;
          inquirer.prompt([
            {
              type: 'input',
              name: 'number',
              message: 'How many do you wish to purchase?'
            }]).then(function(numberObj) {
              buyNumber=numberObj.number;
              stockCheck(buyNumber, buyItem);
            });

      });
  });
};

//Checks to see if you have stock of items
stockCheck = (buyNumber, buyItem)=> {
  connection.query('SELECT * FROM products WHERE ? ',[{id: buyItem}], function(err, data) {

    if (err) throw err;
      // console.log(data);
      // console.log(buyItem);
      // console.log(buyNumber);

    if (buyNumber <= data[0].in_stock) {
      let totalCost = buyNumber * data[0].price;
      let newStock = data[0].in_stock - buyNumber;

      console.log('Your purchase has gone through.  The total bill was: $' + totalCost);

      connection.query('UPDATE `products` SET ? WHERE ?',[{in_stock: newStock}, {id: buyItem}], function(err, data) {
        if (err) throw err;
        // console.log(newStock);
      });
      buyProducts();
    }

    else {

      console.log('Not enough stock to fulfill your order.  Please try a different product OR purchase less.');

      buyProducts();
    }
  });
};

connection.connect(function(err) {
  if (err) {
    throw err
  };

  buyProducts();

});
