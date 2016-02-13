/*
 * customerEdit.js
 * File containing controller for customer edit page.
 *
 */
(function () {
  'use strict';
  angular.module('StockControlSite.customers')
    .controller('CustomerEdit', CustomerEdit);

  function CustomerEdit($scope, dataservice, $routeParams) {
    var vm = this;
    var applyActionUpdate = true;
    vm.customerID = $routeParams.customerId;

    if (!vm.customerID) {
      /* Creating item.*/
      applyActionUpdate = false;
      vm.actionTitle = 'Create';
    } else {
      /* Updating existing item.*/
      vm.actionTitle = 'Updating';
      dataservice.getCustomer(vm.customerID).then(function (data) {
        vm.customerItem = data.result;
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
          dataservice.updateCustomer(vm.customerID, vm.customerItem.name, vm.customerItem.contactDetail)
            .then(function (response) {
              alert(response.result);
            }, onError);
          break;
        case false:
          dataservice.insertCustomer(vm.customerItem.name, vm.customerItem.contactDetail)
            .then(function (response) {
              vm.customerID = response.insertedID;
              applyActionUpdate = true;
              vm.actionTitle = 'Updating';
              alert(response.result);
            }, onError);
          break;
      }
    };
  }

}());
