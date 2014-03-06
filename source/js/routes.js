/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define([
    './app',
    './config',
    'text!./modules/home/home.html',
    'text!./modules/admin/admin.html'
], function(app, conf, homeTpl, adminTpl) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider.state('home', {
                url: '/',
                template: homeTpl,
                controller: 'HomeController'
            });

            $stateProvider.state('admin', {
                url: '/admin',
                template: adminTpl,
                controller: 'AdminController'
            });

            $urlRouterProvider.otherwise('/');
        }
    ]);
});
