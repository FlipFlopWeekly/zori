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
                    var height = nbClick * 30 + 30;
                    var hue = Math.min(nbClick * 10, 100);
                    
                    // get div width
                    var width = $elt.find('span').width();
                    
                    // calculate margin size
                    var marginLeft = width - 2;
                    
                    // set css
                    $elt.find('span').css('margin-left', -marginLeft);

                    var style = {
                        height      : height + 'px',
                        'margin-top': -(height / 2) + 'px'
                    };

                    if (nbClick > 0) {
                        style.background = 'linear-gradient(to bottom, hsl(' + hue + ', 99%, 65%) 50%, hsl(' + hue + ', 99%, 30%) 51%)';
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
                        window.open($link.attr('data-link'), '_blank');
                    }

                    return false;
                });

                timeoutId = $interval(function() {
                    update();
                }, 1000);
            }

            return {
                restrict: 'A',
                template: linkTpl,
                link: link
            };
        }
    ]);
});
