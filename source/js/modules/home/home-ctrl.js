/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery'], function (controllers, $) {
  'use strict';

  controllers.controller('HomeController', ['$scope', 'linkStorage', '$firebase',
    function HomeController($scope, linkStorage, $firebase) {
      var fireRef = new Firebase('https://shining-fire-3337.firebaseio.com/');

      $scope.newLink = '';

      $scope.$watch('links', function () {
      	var length = Object.keys($scope.links).length;
      	var totalLength = length * 8.23;
      	$('ul').css('width', totalLength+"px");
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
