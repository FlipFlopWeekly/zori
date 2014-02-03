'use strict';

describe('E2E: Testing App', function () {

  beforeEach(function () {
    browser.get('/');
    browser.debugger();
  });

  describe('Home page', function () {
    it('should set test binding', function () {
      expect(element(by.css('body')).getText()).toEqual("It's as easy as 2 * 2 = 4");
    });
  });

});
