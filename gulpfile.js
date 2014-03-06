var gulp = require('gulp');
var path = require('path');
var open = require('open');
var csso = require('gulp-csso');
var express = require('express');
var lr = require('tiny-lr');
var es = require('event-stream');
var extend = require('extend');
var replace = require('gulp-replace');
var rjs = require('requirejs');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var recess = require('gulp-recess');
var bump = require('gulp-bump');

var server = lr();
var app = express();

var APP_ROOT = __dirname + '/source';
var APP_PORT = 4000;

// Opens a browser with the application path.
gulp.task('open', ['serve'], function() {
    open('http://localhost:' + APP_PORT);
});

// Statically serves files and adds the LiveReload script.
gulp.task('serve', function() {
    app.use(require('connect-livereload')());
    app.use(express.static(APP_ROOT));
    app.listen(APP_PORT);
});

// Watches for file changes and reloads browser pages.
gulp.task('watch', function() {
    server.listen(35729, function(err) {
        if (err) {
            return console.log(err);
        }

        gulp.watch([
            'source/index.html',
            'source/assets/**/*',
            'source/js/**/*'
        ], function(evt) {
            server.changed({
                body: {
                    files: [path.relative(APP_ROOT, evt.path)]
                }
            });
        });
    });
});

// Builds the project for production.
gulp.task('build', ['compile'], function() {
    return es.concat(
        // Build main sources.
        gulp.src(['source/index.html'])
            .pipe(replace('vendor/requirejs/', 'js/'))
            .pipe(replace("require(['./js/main.js'])", "require(['./js/main.js'], function () { require(['main']); })"))
            .pipe(replace('vendor/bootstrap/dist', 'assets'))
            .pipe(gulp.dest('build')),
        gulp.src(['source/js/config-require.js'])
            .pipe(uglify())
            .pipe(gulp.dest('build/js')),
        // Build assets.
        gulp.src(['source/favicon.ico'])
            .pipe(gulp.dest('build')),
        gulp.src(['source/assets/css/*'])
            .pipe(csso())
            .pipe(gulp.dest('build/assets/css')),
        gulp.src(['source/assets/fonts/*'])
            .pipe(gulp.dest('build/assets/fonts')),
        gulp.src(['source/assets/images/*'])
            .pipe(gulp.dest('build/assets/images')),
        // Build vendor files.
        gulp.src(['source/vendor/bootstrap/dist/css/bootstrap.min.css'])
            .pipe(gulp.dest('build/assets/css')),
        gulp.src(['source/vendor/bootstrap/dist/fonts/*'])
            .pipe(gulp.dest('build/assets/fonts')),
        gulp.src(['source/vendor/requirejs/require.js'])
            .pipe(uglify())
            .pipe(gulp.dest('build/js'))
    );
});

// Compiles with RequireJS' r.js.
gulp.task('compile', function() {
    var config = {
        baseUrl: 'source/js',
        name: 'main',
        optimize: 'uglify2',
        out: 'build/js/main.js',
        wrap: true,
        stubModules: ['text']
    };

    extend(config, require('./source/js/config-require.js'));

    return rjs.optimize(config);
});

// Asserts code quality with various static code analysis tools.
gulp.task('lint', function() {
    return es.concat(
        gulp.src('source/js/**/*.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter(stylish)),
        gulp.src('source/assets/css/*')
            .pipe(recess())
    );
});

// Bumps version number.
gulp.task('bump', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

// Default developer working task.
gulp.task('work', ['watch', 'open']);

gulp.task('default', ['work']);
