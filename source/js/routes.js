'use strict';
/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config'], function (app) {

  app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/js/modules/home/home.html',
        controller : 'HomeController'
      })
    ;

    $stateProvider
      .state('link', {
        url: '/link',
        templateUrl: '/js/modules/link/link.html',
        controller : 'LinkController'
      })
    ;

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  }]);
});
