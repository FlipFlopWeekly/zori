/**
 * Attach services to this module
 **/
define(['angular', 'firebase', 'angularfire', './config'], function (ng, Firebase, conf) {
  'use strict';

  return ng.module('app.services', ['app.constants', 'firebase'])
    .factory('exampleStorage', function () {
      var STORAGE_ID = 'zori-link';

      return {
        get: function () {
          return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        put: function (links) {
          localStorage.setItem(STORAGE_ID, JSON.stringify(links));
        }
      };
    })
    .factory('LinkFire', ['$firebase', function ($firebase) {
      return {
        ref : function() {
          var fireRef = new Firebase('https://shining-fire-3337.firebaseio.com/links');
          return $firebase(fireRef);
        }
      };
    }
  ]);
});
