'use strict';
/**
 * Links controller definition
 * @scope Controllers
 */
define(['./module', './link-service'], function (controllers) {
  controllers.controller('LinkController', ['$scope', 'linkStorage',
    function LinkController($scope, linkStorage) {
      $scope.test = 'link';

      var links = $scope.links = linkStorage.get();

      $scope.newLink = '';

      $scope.$watch('links', function () {
        linkStorage.put(links);
      }, true);

      $scope.addLink = function () {
        var newLink = $scope.newLink.trim();
        if (!newLink.length) {
          return;
        }

        links.push({
          url: newLink
        });

        $scope.newLink = '';
      };

      $scope.editLink = function (link) {
        $scope.editedLink = link;
      };


      $scope.doneEditing = function (link) {
        $scope.editedLink = null;
        link.url = link.url.trim();

        if (!link.url) {
          $scope.removeLink(link);
        }
      };

      $scope.removeLink = function (link) {
        links.splice(links.indexOf(link), 1);
      };
    }
  ]);
});
