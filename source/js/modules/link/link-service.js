/*global define*/
'use strict';

/**
 * Services that persists and retrieves links from localStorage.
 */
define(['./module'], function (services) {
	services.factory('linkStorage', function () {
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
