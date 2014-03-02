/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery'], function (controllers, $) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef',
        function HomeController($scope, fireRef) {
            $scope.newLink = '';

            $scope.$watch('links', function () {
                // Count the number of links
                var numberOfLinks = $('.category-block').length,
                    length = numberOfLinks,
                    totalLength = length * 9;

                // Resize the list width, fits to the content size.
                $('ul').css('width', totalLength + "px");
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
