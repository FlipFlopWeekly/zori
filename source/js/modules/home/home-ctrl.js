/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery'], function (controllers, $) {
  'use strict';

  controllers.controller('HomeController', ['$scope', 'fireRef',
    function HomeController($scope, fireRef) {

      $scope.newLink = '';
      var numberOfLinks = 0;

      $scope.$watch('links', function () {
        // Resize the list width, fits to the content size.
        var length = numberOfLinks;
        var totalLength = length * 9;
        $('ul').css('width', totalLength+"px");

        numberOfLinks += 1;
      }, true);

      $scope.addLink = function () {
        var newLink = $scope.newLink.trim();
        if (!newLink.length) {
          return;
        }
        $scope.links.$add({
          url: newLink,
          nbClick: 0
        });
        $scope.newLink = '';
      };

      $scope.incrementClick = function (id) {
        // Check if the attribute exists. Default value is 0.
        if ($scope.links[id].nbClick === undefined) {
            $scope.links[id].nbClick = 0;
        } else {
            $scope.links[id].nbClick++;
        }
        
        $scope.links.$save();
      };

      $scope.links = fireRef.links();
    }
  ]);
});
