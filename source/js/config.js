/**
 * defines constants for application
 */
define(['angular'], function (ng) {
    'use strict';

    return ng.module('app.constants', [])
        .constant('CONFIG', {})
        .constant('FB_URL', 'https://shining-fire-3337.firebaseio.com/');
});
