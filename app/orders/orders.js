/*
 * orders.js
 * File containing controller for order page.
 *
 */
(function () {
  'use strict';
  angular.module("StockControlSite.orders")
    .controller("Orders", Orders);

  function Orders($scope, dataservice, $http) {
    $scope.sortOrder = '+name';
    $scope.searchTerm = "";
    $scope.viewName = "Orders";
    $scope.totalPrice = 0;

    /* Error display function. */
    function onError() {
      $scope.errorMsg = "There was an error.";
    }

    /* Populate list of all orders on load. */
    dataservice.getOrders().then(function (data) {
      $scope.orderList = data.result;
    }, onError);

    /* Delete Order
     * removes from list of orders.
     */
    $scope.deleteOrder = function (orderID) {
      dataservice.deleteOrder(orderID).then(function (response) {
        if (response.error == 0) {
          alert(response.result);
          var i = 0;
          for (i = 0; i < $scope.orderList.length; i++) {
            if ($scope.orderList[i].id == orderID) {
              $scope.orderList.splice(i, 1);
            }
          }
        } else {
          alert(response.result);
        }
      }, onError);
    }

    /* Get Purchase List For Order
     * creates a total price of all items.
     */
    $scope.getPurchaseListForOrder = function (orderID) {
      dataservice.getOrderPurchaseList(orderID).then(function (data) {
        if (data.result != 'No results.') {
          $scope.purchaseList = data.result;
          console.log('here');
        } else {
          $scope.purchaseList = [];
        }

        var total = 0;
        angular.forEach($scope.purchaseList, function (value, key) {
          total = total + (value.price * value.quantity);
        });
        $scope.totalPrice = total;
      }, onError);
    }
  }

}());
