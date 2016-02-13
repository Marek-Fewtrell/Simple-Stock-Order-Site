/*
 * customers.js
 * File containing controller for customer page.
 *
 */
(function () {
  'use strict';
  angular.module("StockControlSite.customers")
    .controller("Customers", Customers);

  function Customers($scope, dataservice, $http) {
    $scope.sortOrder = '+name';
    $scope.searchTerm = "";
    $scope.viewName = "Customer";

    /* Populate list of all customers on load. */
    dataservice.getCustomerList().then(function (data) {
      $scope.userList = data.result;
    }, onError);

    /* Error display function. */
    function onError() {
      $scope.errorMsg = "There was an error.";
    }

    /* Delete Customer
     * removes from list of customers.
     */
    $scope.deleteCustomer = function (customerID) {
      dataservice.deleteCustomer(customerID)
        .then(function (response) {
          if (response.error == 0) {
            alert(response.result);
            var i = 0;
            for (i = 0; i < $scope.userList.length; i++) {
              if ($scope.userList[i].id == customerID) {
                $scope.userList.splice(i, 1);
              }
            }
          } else {
            alert(response.result);
          }
        }, onError);
    };
  }

}());
