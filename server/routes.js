/*
* routes.js
* File containing all routes available on the server.
*
*/

var appRouter = function(app, dbconn) {

  app.get("/", function(req,res) {
    res.send("Hello World");
  });

  //All the routes for stock.
  app.route('/stock')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var selectTableQuery = 'SELECT * FROM stock;';
    dbconn.query(selectTableQuery, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows;
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .post(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'INSERT INTO stock (`name`, `desc`, `quantity`, `price`) VALUES (?, ?, ?, ?);';
    var values=[req.body.name, req.body.desc, req.body.quantity, req.body.price];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["insertedID"] = rows.insertId;
        data["result"] = 'Added Successfull.';
      } else {
        data["result"] = 'Error Adding data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });

  app.route('/stock/:stock_ID')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'SELECT * FROM stock WHERE id =?;';
    var value = [req.params.stock_ID];
    dbconn.query(sql, value, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows[0];
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .put(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'UPDATE stock SET `name`=?, `desc`=?, `quantity`=?, `price`=? WHERE `id` =?;';
    var values =[req.body.name, req.body.desc, req.body.quantity, req.body.price, req.params.stock_ID];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Update Successfull.';
      } else {
        data["result"] = 'Error updating data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .delete(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'DELETE FROM stock WHERE id =?;';
    var values = [req.params.stock_ID];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Delete successfull.';
      } else {
        data["result"] = 'Error deleting data.';
      }
      res.json(data);
      data["result"] = 'Error updating data.';
    });
  });

/*----------------------------------------------------------------------------*/

  //All routes for the customer
  app.route('/customer')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    dbconn.query('SELECT * FROM customer;', function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows;
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .post(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'INSERT INTO customer (name, contactDetail) VALUES (?, ?);';
    var values=[req.body.name, req.body.contactDetail];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["insertedID"] = rows.insertId;
        data["result"] = "Added Successfull.";
      } else {
        data["result"] = 'Error Adding data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });
  app.route('/customer/:customer_ID')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'SELECT * FROM customer WHERE id =?;';
    var values = [req.params.customer_ID];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows[0];
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .put(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'UPDATE customer SET name=?, contactDetail=? WHERE id =?;';
    var values =[req.body.name, req.body.contactDetail, req.params.customer_ID];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Update Successfull.';
      } else {
        data["result"] = 'Error updating data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .delete(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'DELETE FROM customer WHERE id =?;';
    var values =[req.params.customer_ID];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Delete successfull.';
      } else {
        data["result"] = 'Error deleting data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });

/*----------------------------------------------------------------------------*/

  //All routes for the order
  app.route('/order')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    dbconn.query('SELECT orders.id, customer.name, orders.status FROM orders, customer WHERE orders.customerid = customer.id;', function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows;
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .post(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'INSERT INTO orders (customerid, `status`) VALUES (?, ?);';
    var values=[req.body.customerid, req.body.status];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["insertedID"] = rows.insertId;
        data["result"] = 'Added Successfull.';
      } else {
        data["result"] = 'Error Adding data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });
  app.route('/order/:order_id')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'SELECT orders.id, customer.name, orders.status FROM orders, customer WHERE orders.customerid = customer.id AND orders.id =?;';
    var values =[req.params.order_id];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows[0];
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .put(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'UPDATE orders SET status=? WHERE id =?;';
    var values =[req.body.status, req.params.order_id];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Update Successfull.';
      } else {
        data["result"] = 'Error updating data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .delete(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'DELETE FROM orders WHERE id=?;';
    var values = [req.params.order_id];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Delete successfull.';
      } else {
        data["result"] = 'Error deleting data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });

  /*----------------------------------------------------------------------------*/

  //All routes for the purchaselist in orders
  app.route('/purchaseList')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    dbconn.query('SELECT purchaselist.orderID, stock.name, purchaselist.quantity FROM purchaselist, stock WHERE purchaselist.stockID = stock.id;', function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows;
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .post(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'INSERT INTO purchaseList (orderid, stockid, quantity) VALUES (?, ?, ?);';
    var values=[req.body.orderid, req.body.stockid, req.body.quantity];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["insertedID"] = rows.insertId;
        data["result"] = 'Added Successfull.';
      } else {
        data["result"] = 'Error Adding data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });
  app.route('/purchaseList/:purchaseList_id')
  .get(function(req,res) {
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'SELECT purchaselist.orderID, stock.name, stock.id, purchaselist.quantity, stock.price FROM purchaselist, stock WHERE purchaselist.stockID = stock.id AND purchaselist.orderid =?;';
    var values = [req.params.purchaseList_id];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = rows;
      } else {
        data["result"] = 'No results.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .put(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'UPDATE purchaselist SET quantity=? WHERE orderid=? AND stockid=?;';
    var values =[req.body.quantity, req.params.purchaseList_id, req.body.stockid];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Update Successfull.';
      } else {
        data["result"] = 'Error updating data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  })
  .delete(function(req,res){
    var data = {
      "error":1,
      "result":""
    };
    var sql = 'DELETE FROM purchaselist WHERE orderid=? AND stockid=?;';
    var values = [req.params.purchaseList_id, req.body.stockid];
    dbconn.query(sql, values, function(err, rows, fields){
      if (rows) {
        data["error"] = 0;
        data["result"] = 'Delete successfull.';
      } else {
        data["result"] = 'Error deleting data.';
      }
      res.json(data);
      if (err) {
        console.log(err);
      }
    });
  });

}
module.exports = appRouter;
