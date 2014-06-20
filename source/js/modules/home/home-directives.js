define([
    './module',
    'jquery',
    'text!./link.html'
], function(directives, $, linkTpl) {
    'use strict';

    directives.directive('zoriLink', ['$interval',
        function($interval) {
            function link(scope, $elt, attrs) {
                var timeoutId;
                var $link = $elt.find('a');

                function update() {
                    var nbClick = scope.link.nbClick;
                    var height  = Math.max(Math.min(nbClick * 3 + 7, 100), 10);
                    var hue     = Math.min(nbClick * 10, 100);

                    var style = {
                        'height': height + '%',
                        'top': (100 - height) / 2 + '%'
                    };
                    
                    // Color for authenticated users and visited links.
                    if (nbClick > 0 && typeof scope.user !== "undefined" 
                        && typeof scope.visitedLinks !== "undefined"
                        && $.inArray($link.attr('id'), scope.visitedLinks) != -1) {
                        
                        // Create the gradient background
                        style.background = 'linear-gradient(to bottom, ';
                        style.background += 'hsla(' + hue + ', 99%, 65%, 1) 50%, ';
                        style.background += 'hsla(' + hue + ', 99%, 30%, 0.2) 51%, ';
                        style.background += 'hsla(' + hue + ', 99%, 30%, 0.0) 75%, ';
                        style.background += 'hsla(' + hue + ', 99%, 30%, 0) 100%)';
                    } else {
                        // If the user is logged out
                        style.background = 'linear-gradient(to bottom, ';
                        style.background += 'rgba(198,198,198,1) 50%, ';
                        style.background += 'rgba(255,255,255,0.2) 51%, ';
                        style.background += 'rgba(255,255,255,0.2) 75%, ';
                        style.background += 'rgba(255,255,255,0) 76%, ';
                        style.background += 'rgba(255,255,255,0) 100%)';
                    }

                    $link.css(style);
                }

                scope.$watch(attrs.myCurrentTime, function(value) {
                    update();
                });

                $elt.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                // Hide link
                $elt.on('click', function(e) {
                    e.preventDefault();

                    if ($link.attr('data-link').length > 0) {
                        // If the user did not visit the link yet.
                        if (typeof scope.user !== "undefined" && $.inArray($link.attr('id'), scope.visitedLinks) == -1) {
                            // Save the id as a visited link (relative to the user) in the scope...
                            scope.visitedLinks.push($link.attr('id'));
                            var memberRef = new Firebase(scope.fb_url + "member/" + scope.user.id);
                            // ... and in Firebase database, in the good tree.
                            memberRef.set({visitedLinks : scope.visitedLinks});
                        }
                        // Open the link in a new tab.
                        window.open($link.attr('data-link'), '_blank');
                    }

                    return false;
                });

                timeoutId = $interval(function() {
                    update();
                }, 500);
            }

            return {
                restrict: 'A',
                template: linkTpl,
                link: link
            };
        }
    ]);
});
