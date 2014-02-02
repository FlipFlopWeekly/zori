var gulp = require('gulp');
var path = require('path');
var open = require('open');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var express = require ('express');
var lr = require('tiny-lr');

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

// Compiles sass into CSS and minifies it.
gulp.task('sass', function () {
  return gulp.src([
      'source/sass/*.scss',
      '!source/sass/_*.scss'
    ])
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(minify({
      relativeTo: APP_ROOT
    }))
    .pipe(gulp.dest('source/assets/css'));
});

// Watches for file changes and reloads browser pages.
gulp.task('watch', ['serve', 'sass'], function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    // Run the sass task for all .scss files.
    gulp.watch('source/sass/**/*.scss', ['sass']);

    gulp.watch([
      'source/index.html',
      'source/assets/css/*.css',
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

gulp.task('default', ['watch']);
