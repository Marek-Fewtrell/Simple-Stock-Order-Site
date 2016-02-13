/*
 * inventoryEdit.js
 * File containing controller for inventory edit page.
 *
 */
(function () {
  'use strict';
  angular.module("StockControlSite.inventory")
    .controller("InventoryEdit", InventoryEdit);

  function InventoryEdit($scope, dataservice, $routeParams) {
    var vm = this;
    var applyActionUpdate = true;
    vm.invenID = $routeParams.stockId;

    if (!vm.invenID) {
      /* Creating item. */
      applyActionUpdate = false;
      vm.actionTitle = 'Create';
    } else {
      /* Updating existing item. */
      vm.actionTitle = 'Updating';
      dataservice.getStock(vm.invenID).then(function (data) {
        vm.stockItem = data.result;
      }, onError);
    }

    /* Error display function. */
    function onError() {
      $scope.errorMsg = "There was an error.";
    }

    /* Reacts to apply button click.
     * Either updates the existing item.
     * Creates a new item.
     */
    $scope.applyAction = function () {
      switch (applyActionUpdate) {
        case true:
          dataservice.updateStockItem(vm.invenID, vm.stockItem)
            .then(function (response) {
              alert(response.result);
            }, onError);
          break;
        case false:
          dataservice.insertStockItem(vm.stockItem.name, vm.stockItem.desc, vm.stockItem.quantity, vm.stockItem.price)
            .then(function (response) {
              vm.invenID = response.insertedID;
              applyActionUpdate = true;
              vm.actionTitle = 'Updating';
              alert(response.result);
            }, onError);
          break;
      }
    };
  }

}());
