/*
 * app.js
 * File containing the main app and config of the site.
 *
 */
(function () {
  'use strict';

  angular.module('StockControlSite', ['ngRoute', 'StockControlSite.inventory', 'StockControlSite.customers', 'StockControlSite.orders'])
    .config(['$routeProvider', function ($routeProvider) {
      /* Routes for the whole site. */
      $routeProvider.
      when('/inventory', {
        templateUrl: 'inventory/inventory.html',
        controller: 'Inventory'
      }).
      when('/inventoryEdit/:stockId?', {
        templateUrl: 'inventory/inventoryEdit.html',
        controller: 'InventoryEdit as invenEdit'
      }).
      when('/orders', {
        templateUrl: 'orders/orders.html',
        controller: 'Orders'
      }).
      when('/orderEdit/:orderId?', {
        templateUrl: 'orders/orderEdit.html',
        controller: 'OrderEdit as ordEdit'
      }).
      when('/customers', {
        templateUrl: 'customers/customers.html',
        controller: 'Customers'
      }).
      when('/customerEdit/:customerId?', {
        templateUrl: 'customers/customerEdit.html',
        controller: 'CustomerEdit as custEdit'
      }).
      otherwise({
        redirectTo: '/inventory'
      });
    }]);

}());
