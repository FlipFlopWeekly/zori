/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-ui-router',
    './config',
    './services',
    './modules/home/index',
    './modules/admin/index'
], function(ng) {
    'use strict';

    return ng.module('app', [
        'app.constants',
        'app.services',
        'app.home',
        'app.admin',
        'ui.router'
    ]);
});
