/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery', './home-directives'], function(controllers, $) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef',
        function HomeController($scope, fireRef) {
            $scope.newLink = '';
            $scope.nbLinks = 0;

            $scope.$watch('links', function() {
                $scope.nbLinks = $scope.links.$getIndex().length;

                // Resize the list width, fits to the content size.
                $('.link-list').css('width', $scope.nbLinks * 9 + 'px');
            }, true);

            $scope.showLinkForm = false;
            $scope.clickAdd = function() {
                $scope.showLinkForm = !$scope.showLinkForm;
                console.log($scope.showLinkForm);
            };

            $scope.addLink = function() {
                var newLink = $scope.newLink.trim();

                if (!newLink.length) {
                    return;
                }

                var unix = Math.round(+new Date()/1000);

                $scope.links.$add({
                    submitTime: unix,
                    url: newLink,
                    nbClick: 0
                });

                $scope.newLink = '';
            };

            $scope.incrementClick = function(id) {
                // Check if the attribute exists. Default value is 0.
                if ($scope.links[id].nbClick === undefined) {
                    $scope.links[id].nbClick = 0;
                }

                $scope.links[id].nbClick++;

                $scope.links.$save();
            };

            $scope.links = fireRef.links();
        }
    ]);
});
