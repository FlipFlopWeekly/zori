'use strict';
/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define([
  './app',
  './config',
  'text!./modules/home/home.html',
  'text!./modules/link/link.html'
], function (app, conf, homeTpl, linkTpl) {

  app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        template: homeTpl,
        controller : 'HomeController'
      })
    ;

    $stateProvider
      .state('link', {
        url: '/link',
        template: linkTpl,
        controller : 'LinkController'
      })
    ;

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  }]);
});
