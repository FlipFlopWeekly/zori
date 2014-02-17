/**
 * Attach services to this module
 **/
define(['angular', 'angularfire', './config'], function (ng, Firebase) {
  'use strict';

  return ng.module('app.services', ['app.constants', 'firebase'])
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
  }).factory('LinkFire', function LinkFire ($firebase) {
    var STORAGE_URL = 'https://shining-fire-3337.firebaseio.com/';
    // var fireRef = new Firebase('https://shining-fire-3337.firebaseio.com/');
    return {};
  });
});
