'use strict';
/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  controllers.controller('HomeController', ['$scope',
    function HomeController($scope) {
      $scope.helloWorld = "Hello, World!";
    }
  ]);
});
