// To be able to require file from node.
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define({
    // Here paths are set relative to `/source/js` folder.
    paths: {
        'angular'                   : '../vendor/angular/angular',
        'angular-ui-router'         : '../vendor/angular-ui-router/release/angular-ui-router',
        'jquery'                    : '../vendor/jquery/dist/jquery',
        'bootstrap'                 : '../vendor/bootstrap/dist/js/bootstrap',
        'firebase'                  : '../vendor/firebase/firebase',
        'angularfire'               : '../vendor/angularfire/angularfire',
        'text'                      : '../vendor/requirejs-text/text',
        'firebase-simple-login'     : '../vendor/firebase-simple-login/firebase-simple-login'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        },
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: [
                'jquery'
            ]
        },
        'firebase': {
            exports: 'Firebase'
        },
        'angularfire': {
            deps: [
                'angular',
                'firebase'
            ]
        },
        'firebase-simple-login': {
            exports: 'FirebaseSimpleLogin',
            deps: [
                'firebase'
            ]
        },
    }
});
