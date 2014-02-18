/**
 * Admin controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('AdminController', ['$scope', 'linkStorage', '$firebase',
    function AdminController($scope, linkStorage, $firebase) {
      var fireRef = new Firebase('https://shining-fire-3337.firebaseio.com/');

      $scope.newLink = '';

      $scope.$watch('links', function () {
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

      $scope.links = $firebase(fireRef);
    }
  ]);
});