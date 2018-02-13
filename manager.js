const inquirer = require('inquirer');
const connection = require('./connection.js');

products = ()=> {
  connection.query('SELECT * FROM products', function(err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      console.log('ID: ' + data[i].id + ' Product: ' + data[i].itemName + ' Cost: $' + data[i].price + ' Quantity: ' + data[i].in_stock);
    }
    if (selection === 'View Products') {
        mainMenu();
    };
  });
};

lowStock = ()=> {
  connection.query('SELECT * FROM `products` WHERE in_stock <= 5', function(err, data) {
    for (let i = 0; i < data.length; i++) {
      console.log('ID: ' + data[i].id + ' Product: ' + data[i].itemName + ' Cost: $' + data[i].price + ' Quantity: ' + data[i].in_stock);
    }
    if (selection === 'View Low Inventory') {
        mainMenu();
    };
  });
};

addStock = ()=> {
  inquirer.prompt([
    {
      type: 'input',
      name: 'item',
      message: 'What ID would you like to add stock to?'
    },
    {
      type: 'input',
      name: 'number',
      message: 'How many do you wish to add?'
    }]).then(function(manageStock){

      connection.query('SELECT * FROM `products` WHERE ?',[{id: manageStock.item}], function(err, data) {
        if (err) throw err;

          let itemStock = data[0].in_stock;
          let newStock = parseInt(manageStock.number) + itemStock;

          connection.query('UPDATE `products` SET ? WHERE ?',[{in_stock: newStock},{id: manageStock.item}], function(err, data) {
            if (err) throw err;

            console.log('Quantity has been updated.');
            mainMenu();
          })
      });
    })
};

addProduct= ()=> {
  console.log('Function not working! Sorry!');
  mainMenu();
}

mainMenu= ()=> {
inquirer.prompt([
  {
    type: 'confirm',
    name: 'done',
    message: 'Are you finished Reviewing?'
  }]).then(function(answr) {
      if (answr.done === true) {
        manager();
      }
      else if (answr.moveOn === false) {
          mainMenu();
      }
      else {
        console.log('Not valid input');
          mainMenu();
      }
    });
};

manager = ()=> {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View Products','View Low Inventory','Add to Inventory','Add Product']
    }]).then(function(input) {
      selection = input.choice;

      switch (selection) {
        case 'View Products':
              products();
        break;

        case 'View Low Inventory':
              lowStock();
        break;

        case 'Add to Inventory':
              addStock();
        break;

        case 'Add Product':
              addProduct();
        break;
      };

    });
};
















  connection.connect(function(err) {
    if (err) throw err;
    manager();
  });
