/*
 * inventory.js
 * File containing controller for inventory page.
 *
 */
(function () {
  'use strict';
  angular.module("StockControlSite.inventory")
    .controller("Inventory", Inventory);

  function Inventory($scope, dataservice) {
    $scope.sortOrder = '+name';
    $scope.searchTerm = "";
    $scope.viewName = "Inventory";

    /* Populate list of all inventory on load. */
    dataservice.getStockList().then(function (data) {
      $scope.stockList = data.result;
    }, onError);

    /* Error display function. */
    function onError() {
      $scope.errorMsg = "There was an error.";
    }

    /* Delete Stock
     * removes from list of stock.
     */
    $scope.deleteItem = function (itemID) {
      dataservice.removeStockItem(itemID)
        .then(function (response) {
          if (response.error == 0) {
            alert(response.result);
            var i = 0;
            for (i = 0; i < $scope.stockList.length; i += 1) {
              if ($scope.stockList[i].id == itemID) {
                $scope.stockList.splice(i, 1);
              }
            }
          } else {
            alert(response.result);
          }
        }, onError);
    };
  }

}());
