define(['./module', 'text!./link.html', ], function(directives, linkTpl) {
    'use strict';

    directives.directive('zoriLink', ['$interval',
        function($interval) {
            return {
                restrict: 'A',
                template: linkTpl
            };
        }
    ]);
});
