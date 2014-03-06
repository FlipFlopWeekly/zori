define([
    './module',
    'jquery',
    'text!./link.html'
], function(directives, $, linkTpl) {
    'use strict';

    directives.directive('zoriLink', ['$interval',
        function($interval) {
            function link(scope, element, attrs) {
                var timeoutId;
                var $link = $(element).find('a');

                function update() {
                    var nbClick = scope.link.nbClick;
                    var height = nbClick * 30 + 30;
                    var hue = Math.min(nbClick * 10, 100);

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

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
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
