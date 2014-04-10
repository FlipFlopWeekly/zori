angular.module('perfect_scrollbar', []).directive('perfectScrollbar', ['$parse', '$timeout',
    function($parse, $timeout) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div ng-transclude></div>',
            replace: true,
            link: function($scope, $elem, $attr) {
                $elem.perfectScrollbar({
                    wheelSpeed: $parse($attr.wheelSpeed)() || 50,
                    wheelPropagation: $parse($attr.wheelPropagation)() || false,
                    minScrollbarLength: $parse($attr.minScrollbarLength)() || false,
                    useBothWheelAxes: $parse($attr.useBothWheelAxes)() || false,
                    suppressScrollX: $parse($attr.suppressScrollX)() || false,
                    suppressScrollY: $parse($attr.suppressScrollY)() || false
                });

                if ($attr.refreshOnChange) {
                    $scope.$watchCollection($attr.refreshOnChange, function(newNames, oldNames) {
                        $timeout(function() {
                            $elem.perfectScrollbar('update');
                            return null;
                        }, 10);
                    });
                }
                $elem.bind('$destroy', function() {
                    $elem.perfectScrollbar('destroy');
                });
            }
        };
    }
]);
