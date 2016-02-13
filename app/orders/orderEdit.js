/*
 * orderEdit.js
 * File containing controller for order edit page.
 *
 */
(function () {
  'use strict';
  angular.module('StockControlSite.orders')
    .controller('OrderEdit', OrderEdit);

  function OrderEdit($scope, dataservice, $routeParams, filterFilter) {
    var vm = this;
    vm.newItemSearch = '';
    var stockList = [];
    var customerList = [];
    vm.purchaseList = [];
    vm.actionTitle = 'Create';

    vm.orderID = $routeParams.orderId;
    if (vm.orderID) {
      /* Updating existing item.*/
      vm.actionTitle = 'Updating';
      getOrderInfo();
      dataservice.getOrderPurchaseList(vm.orderID).then(function (data) {
        vm.purchaseList = data.result;
        calculateTotalPrice();
      }, onError);
    }

    /* Error display function. */
    function onError() {
      $scope.errorMsg = "There was an error.";
    }

    /* Retrieves info about existing order. */
    function getOrderInfo() {
      dataservice.getOrder(vm.orderID).then(function (response) {
        vm.orderInfo = response.result;
      });
    }

    /* Calculates total price for list of items. */
    function calculateTotalPrice() {
      var total = 0;
      angular.forEach(vm.purchaseList, function (value, key) {
        total = total + (value.price * value.quantity);
      });
      vm.totalPrice = total;
    }

    /* Updates the order status. */
    $scope.updateStatus = function () {
      dataservice.updateOrder(vm.orderID, vm.orderInfo.status).then(function (response) {
        alert(response.result);
      }, onError);
    };

    /* Retrieves list of stock and filters by entered term. */
    $scope.searchItem = function () {
      if (stockList.length == 0) {
        dataservice.getStockList().then(function (response) {
          stockList = response.result;
          vm.searchedStockList = filterFilter(stockList, vm.newItemSearch);
        }, onError);
      }
      vm.searchedStockList = filterFilter(stockList, vm.newItemSearch);
    };

    /* Retrieves list of users and filters by entered term. */
    $scope.searchUsers = function () {
      if (customerList.length == 0) {
        dataservice.getCustomerList().then(function (response) {
          customerList = response.result;
          vm.searchedUserList = filterFilter(customerList, vm.customerSearch);
        }, onError);
      }
      vm.searchedUserList = filterFilter(customerList, vm.customerSearch);
    };

    /* Creates a new order for the selected user. */
    $scope.selectUser = function (custID) {
      dataservice.insertOrder(custID).then(function (response) {
        vm.orderID = response.insertedID;
        getOrderInfo();
      }, onError);
    };

    /* Adds selected item to purchase list of order. */
    $scope.addItem = function (item) {
      var quantityToAdd = prompt('Quantity of Product', '1');
      if (quantityToAdd == null || quantityToAdd < 0 || quantityToAdd == '') {
        alert('Input incorrect');
      } else {
        dataservice.insertPurchaseItem(vm.orderID, item.id, quantityToAdd).then(function (response) {
          alert(response.result);
          if (response.error == 0) {
            var newItem = {
              id: item.id,
              name: item.name,
              orderID: vm.orderID,
              price: item.price,
              quantity: quantityToAdd
            };
            vm.purchaseList.push(newItem);
          }
        }, onError);
      }
    }

    /* Remomves selected item from order. */
    $scope.removeItem = function (itemID) {
      dataservice.removePurchaseItem(vm.orderID, itemID).then(function (response) {
        alert(response.result);
        var i = 0;
        for (i = 0; i < vm.purchaseList.length; i++) {
          if (vm.purchaseList[i].id == itemID) {
            vm.purchaseList.splice(i, 1);
          }
        }
      }, onError);
    }

    /* Updates quantity of specific item in order. */
    $scope.editQuantity = function (item) {
      var newQuantity = prompt('New Quantity:');
      if (newQuantity == null || newQuantity < 0 || newQuantity == '') {
        alert('Input incorrect.');
      } else {
        dataservice.updatePurchaseItem(item.orderID, item.id, newQuantity).then(function (response) {
          alert(response.result);
          item.quantity = newQuantity;
          calculateTotalPrice();
        }, onError);
      }
    }
  }
}());
