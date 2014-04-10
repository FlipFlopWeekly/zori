/**
 * Attach controllers to this module
 **/
define(['angular', '../../config', '../../services', 'angular-perfect-scrollbar'], function(ng) {
    'use strict';

    return ng.module('app.home', ['app.constants', 'app.services', 'perfect_scrollbar']);
});
