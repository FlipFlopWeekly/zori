var gulp = require('gulp');
var path = require('path');
var open = require('open');
var csso = require('gulp-csso');
var express = require ('express');
var lr = require('tiny-lr');
var es = require('event-stream');
var extend = require('extend');
var replace = require('gulp-replace');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

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
    // Build main sources.
    gulp.src(['source/index.html'])
      .pipe(replace("require(['./js/main.js'])", "require(['./js/main.js'], function () { require(['main']); })"))
      .pipe(gulp.dest('build')),
    gulp.src(['source/js/config-require.js'])
      .pipe(uglify())
      .pipe(gulp.dest('build/js')),
    // Build assets.
    gulp.src(['source/assets/css/*'])
      .pipe(csso())
      .pipe(gulp.dest('build/assets/css')),
    gulp.src(['source/assets/fonts/*'])
      .pipe(gulp.dest('build/assets/fonts')),
    gulp.src(['source/assets/images/*'])
      .pipe(gulp.dest('build/assets/images')),
    // Build vendor files.
    gulp.src(['source/vendor/**/*'])
      .pipe(gulp.dest('build/vendor')),
    gulp.src(['build/vendor/requirejs/require.js'])
      .pipe(uglify())
      .pipe(gulp.dest('build/vendor/requirejs')),
    gulp.src(['build/vendor/requirejs-domready/domReady.js'])
      .pipe(uglify())
      .pipe(gulp.dest('build/vendor/requirejs-domready'))
  );
});

// Compiles with RequireJS' r.js.
gulp.task('compile', function () {
  var configRequire = require('./source/js/config-require.js');
  var config = {
    baseUrl: 'source/js',
    name: 'main',
    optimize: 'none',
    out: 'main.js',
    wrap: true,
    stubModules : ['text']
  };
  extend(config, configRequire);

  return rjs(config)
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// Default developer working task.
gulp.task('work', ['watch', 'open']);

gulp.task('default', ['work']);
