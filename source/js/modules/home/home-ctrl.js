/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery', './home-directives', 'zori-toolbox'], function(controllers, $, tooltips) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef',
        function HomeController($scope, fireRef) {
            $scope.newLink          = '';
            $scope.newLinkComment   = '';
            $scope.nbLinks          = 0;

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
                var newLinkComment = $scope.newLinkComment.trim();
                
                if (!newLink.length) {
                    return;
                }
                
                var regexp = new RegExp("^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)");
                
                if ( !regexp.test(newLink)) {
                    return;
                }

                var unix = Math.round(+new Date()/1000);

                $scope.links.$add({
                    submitTime: unix,
                    url: newLink,
                    nbClick: 0,
                    comment: newLinkComment
                });

                $scope.newLink          = '';
                $scope.newLinkComment   = '';
            };

            $scope.incrementClick = function(id) {
                // Check if the attribute exists. Default value is 0.
                if ($scope.links[id].nbClick === undefined) {
                    $scope.links[id].nbClick = 0;
                }

                $scope.links[id].nbClick++;

                $scope.links.$save();
            };
            
            // Shows a tooltip on top of a link
            $scope.showTooltip = function(elementId, content) {
                var tooltip = $('#link-tooltip');
                var link = $('#link-' + elementId);
                
                if (content === undefined || content === '') {
                    tooltip.hide();
                    
                    return;
                }
                
                // Set the tooltip content
                tooltip.html(content);
                
                // Set the tooltip position
                tooltip
                    .css("top", link.position().top - tooltip.outerHeight() - (link.outerHeight() / 2) - 15)
                    .css("left", link.position().left - (tooltip.outerWidth() / 2) + 6)
                    .show();
            };
            
            $scope.hideTooltip = function() {
                $('#link-tooltip').hide();
            };

            $scope.links = fireRef.links();
        }
    ]);
});
