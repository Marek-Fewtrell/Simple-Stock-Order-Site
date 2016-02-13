/*
 * data.js
 * File containing factory for site. Data interaction service.
 */
(function () {
  'use strict';
  angular.module('StockControlSite')
    .factory("dataservice", dataservice);

  function dataservice($http) {

    /* Public functions */
    var service = {
      getCustomer: getCustomer,
      getCustomerList: getCustomerList,
      insertCustomer: insertCustomer,
      updateCustomer: updateCustomer,
      deleteCustomer: deleteCustomer,

      getStock: getStock,
      getStockList: getStockList,
      insertStockItem: insertStockItem,
      updateStockItem: updateStockItem,
      removeStockItem: removeStockItem,

      getOrder: getOrder,
      getOrders: getOrders,
      insertOrder: insertOrder,
      updateOrder: updateOrder,
      deleteOrder: deleteOrder,

      getOrderPurchaseList: getOrderPurchaseList,
      insertPurchaseItem: insertPurchaseItem,
      updatePurchaseItem: updatePurchaseItem,
      removePurchaseItem: removePurchaseItem
    };
    return service;

    /* function to handle successful responses. */
    function onSuccess(response) {
      return response.data;
    }

    /* function to handle errors. */
    function onError(response) {
      //Error Handling.
      console.log(response);
    }

    /*--------------------------------------------------------------------------*/
    // Custopmer Section

    function getCustomer(customerID) {
      return $http.get('/customer/' + customerID).then(onSuccess, onError);
    }

    function getCustomerList() {
      return $http.get("/customer").then(onSuccess, onError);
    }

    function insertCustomer(custName, custCD) {
      var data = {
        name: custName,
        contactDetail: custCD
      };
      return $http.post('/customer', data).then(onSuccess, onError);
    }

    function updateCustomer(customerID, custName, custCD) {
      var data = {
        name: custName,
        contactDetail: custCD
      };
      return $http.put('/customer/' + customerID, data).then(onSuccess, onError);
    }

    function deleteCustomer(customerID) {
      return $http.delete('/customer/' + customerID).then(onSuccess, onError);
    }

    /*--------------------------------------------------------------------------*/
    // Stock Section

    function getStock(stockID) {
      return $http.get('/stock/' + stockID).then(onSuccess, onError);
    }

    function getStockList() {
      return $http.get("/stock").then(onSuccess, onError);
    }

    function insertStockItem(itemName, itemDesc, itemQuantity, itemPrice) {
      var data = {
        name: itemName,
        desc: itemDesc,
        quantity: itemQuantity,
        price: itemPrice
      };
      return $http.post('/stock', data).then(onSuccess, onError);
    }

    function updateStockItem(stockID, data) {
      return $http.put('/stock/' + stockID, data).then(onSuccess, onError);
    }

    function removeStockItem(stockID) {
      return $http.delete('/stock/' + stockID).then(onSuccess, onError);
    }

    /*--------------------------------------------------------------------------*/
    // Order Section
    function getOrder(orderID) {
      return $http.get('/order/' + orderID).then(onSuccess, onError);
    }

    function getOrders() {
      return $http.get("/order").then(onSuccess, onError);
    }

    function insertOrder(custID) {
      var data = {
        customerid: custID,
        status: 'pending'
      };
      return $http.post('/order', data).then(onSuccess, onError);
    }

    function updateOrder(orderID, status) {
      var data = {
        status: status
      };
      return $http.put('/order/' + orderID, data).then(onSuccess, onError);
    }

    function deleteOrder(orderID) {
      return $http.delete('/order/' + orderID).then(onSuccess, onError);
    }

    /*--------------------------------------------------------------------------*/
    // Purchase List Section
    function getOrderPurchaseList(orderID) {
      return $http.get('/purchaseList/' + orderID).then(onSuccess, onError);
    }

    function insertPurchaseItem(orderID, itemID, quantity) {
      var data = {
        orderid: orderID,
        stockid: itemID,
        quantity: quantity
      };
      return $http.post('/purchaseList', data).then(onSuccess, onError);
    }

    function updatePurchaseItem(orderID, itemID, quantity) {
      var data = {
        quantity: quantity,
        stockid: itemID
      };
      return $http.put('/purchaseList/' + orderID, data).then(onSuccess, onError);
    }

    function removePurchaseItem(orderID, stockID) {
      var data = {
          stockid: stockID
        },
        config = {
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        };
      // Angular does not allow a data section on a delete call, This adds one in.

      return $http.delete('/purchaseList/' + orderID, config).then(onSuccess, onError);
    }
  }
}());
