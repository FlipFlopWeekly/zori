/**
 * Attach services to this module
 **/
define(['angular', './config'], function (ng) {
  'use strict';

  return ng.module('app.services', ['app.constants'])
    .factory('linkStorage', function () {
    var STORAGE_ID = 'zori-link';

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      put: function (links) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(links));
      }
    };
  });
});
