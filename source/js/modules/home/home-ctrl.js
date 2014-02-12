/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', ['$scope',
    function HomeController($scope) {
      $scope.helloWorld = "Hello, World!";
    }
  ]);
});
