/**
 * Admin controller definition
 * @scope Controllers
 */
define(['./module'], function(controllers) {
    'use strict';

    controllers.controller('AdminController', ['$scope', 'fireRef',
        function AdminController($scope, fireRef) {

            $scope.newLink = '';
            $scope.nbLinks = 0;

            $scope.$watch('links', function() {
                $scope.nbLinks = $scope.links.$getIndex().length;
            }, true);

            $scope.addLink = function() {
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

            $scope.editLink = function(id) {
                $scope.editedLink = $scope.links[id];
            };


            $scope.doneEditing = function(id) {
                var link = $scope.links[id];
                link.url = link.url.trim();
                $scope.links.$save();

                if (!link.url) {
                    $scope.removeLink(id);
                }
                $scope.editedLink = null;
            };

            $scope.removeLink = function(id) {
                $scope.links.$remove(id);
            };

            $scope.links = fireRef.links();
        }
    ]);
});
