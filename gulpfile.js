var gulp = require('gulp');
var path = require('path');
var express = require ('express');
var lr = require('tiny-lr');

var server = lr();
var app = express();

var APP_ROOT = __dirname + '/source';

// Statically serves files and adds the LiveReload script.
gulp.task('serve', function () {
  app.use(require('connect-livereload')());
  app.use(express.static(APP_ROOT));
  app.listen(4000);
});

// Watches for file changes and reloads browser pages.
gulp.task('watch', ['serve'], function () {

  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch([
      'source/index.html',
      'source/js/**/*',
      '!source/js/**/*.spec.js'
    ], function (evt) {
      server.changed({
        body: {
          files: [path.relative(APP_ROOT, evt.path)]
        }
      });
    });
  });
});

gulp.task('default', ['']);
