var gulp = require('gulp');
var path = require('path');
var open = require('open');
var csso = require('gulp-csso');
var express = require ('express');
var lr = require('tiny-lr');
var es = require('event-stream');

var server = lr();
var app = express();

var APP_ROOT = __dirname + '/source';
var APP_PORT = 4000;

// Opens a browser with the application path.
gulp.task('open', ['serve'], function(){
  open('http://localhost:' + APP_PORT);
});

// Statically serves files and adds the LiveReload script.
gulp.task('serve', function () {
  app.use(require('connect-livereload')());
  app.use(express.static(APP_ROOT));
  app.listen(APP_PORT);
});

// Watches for file changes and reloads browser pages.
gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch([
      'source/index.html',
      'source/assets/**/*',
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

// Builds the project for production.
gulp.task('build', function () {
  return es.concat(
    gulp.src(['source/index.html'])
      .pipe(gulp.dest('build')),
    gulp.src(['source/assets/css/*'])
      .pipe(csso())
      .pipe(gulp.dest('build/assets/css')),
    gulp.src(['source/assets/fonts/*'])
      .pipe(gulp.dest('build/assets/fonts')),
    gulp.src(['source/assets/images/*'])
      .pipe(gulp.dest('build/assets/images')),
    gulp.src(['source/vendor/**/*'])
      .pipe(gulp.dest('build/vendor'))
  );
});

// Default developer working task.
gulp.task('work', ['watch', 'open']);

gulp.task('default', ['work']);
