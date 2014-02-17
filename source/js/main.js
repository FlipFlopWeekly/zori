/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
  'require',
  'angular',
  './app',
  './routes'
], function (require, angular) {
  'use strict';

  angular.bootstrap(document, ['app']);
});
