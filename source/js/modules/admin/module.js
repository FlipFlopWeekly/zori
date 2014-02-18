/**
 * Attach controllers to this module
 **/
define(['angular', 'angularfire', '../../config', '../../services'], function (ng) {
  'use strict';

  return ng.module('app.admin', ['app.constants', 'app.services', 'firebase']);
});
