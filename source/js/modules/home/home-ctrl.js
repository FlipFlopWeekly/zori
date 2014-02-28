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
          url: newLink
        });
        $scope.newLink = '';
      };

      $scope.editLink = function (id) {
        $scope.editedLink = $scope.links[id];
      };


      $scope.doneEditing = function (id) {
        var link = $scope.links[id];
        link.url = link.url.trim();
        $scope.links.$save();

        if (!link.url) {
          $scope.removeLink(id);
        }
        $scope.editedLink = null;
      };

      $scope.removeLink = function (id) {
        $scope.links.$remove(id);
      };

      $scope.links = fireRef.links();
    }
  ]);
});
