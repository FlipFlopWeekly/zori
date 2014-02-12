'use strict';
// To be able to require file from node.
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define({
  // Here paths are set relative to `/source/js` folder.
  paths: {
    'angular'               : '../vendor/angular/angular',
    'angular-ui-router'     : '../vendor/angular-ui-router/release/angular-ui-router',
    'async'                 : '../vendor/requirejs-plugins/src/async',
    'domReady'              : '../vendor/requirejs-domready/domReady'
  },

  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-ui-router' : {
      'deps': ['angular']
    }
  }
});
