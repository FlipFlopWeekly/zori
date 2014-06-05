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
        'jquery-ui'                 : '../vendor/jquery-ui/ui/jquery-ui',
        'bootstrap'                 : '../vendor/bootstrap/dist/js/bootstrap',
        'firebase'                  : '../vendor/firebase/firebase',
        'angularfire'               : '../vendor/angularfire/angularfire',
        'text'                      : '../vendor/requirejs-text/text',
        'firebase-simple-login'     : '../vendor/firebase-simple-login/firebase-simple-login',
        'jquery-mousewheel'         : '../vendor/angular-perfect-scrollbar/dependencies/jquery.mousewheel',
        'perfect-scrollbar'         : '../vendor/angular-perfect-scrollbar/dependencies/perfect-scrollbar',
        'angular-perfect-scrollbar' : '../vendor/angular-perfect-scrollbar/src/angular-perfect-scrollbar',
        'zori-toolbox'              : '../assets/javascript/zori-toolbox'
    },
    
    shim: {
        'angular': {
            exports: 'angular',
            deps: [
                'jquery'
            ]
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
        'jquery-mousewheel' : {
            deps: [
                'jquery'
            ]
        },
        'perfect-scrollbar': {
            deps: [
                'jquery',
                'jquery-mousewheel'
            ]
        },
        'angular-perfect-scrollbar': {
            deps: [
                'angular',
                'perfect-scrollbar'
            ]
        },
        'zori-toolbox': {
            exports: 'tooltips',
            deps: [
                'jquery'
            ]
        }
    }
});
