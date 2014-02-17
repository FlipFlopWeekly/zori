/**
 * Attach controllers to this module
 **/
define(['angular', '../../config', '../../services'], function (ng) {
  'use strict';
  return ng.module('app.link', ['app.constants', 'app.services']);
});
