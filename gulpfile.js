var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    chmod = require('gulp-chmod'),
    notify = require('gulp-notify'),
    del = require('del');

var paths = {
        development : {
            scripts : [ '_dev/app/app.js', '_dev/app/models/*.js', '_dev/app/components/*.js',
                        '_dev/app/modules/**/**Module.js', '_dev/app/modules/**/**Model.js',
                        '_dev/app/modules/**/**Controller.js', '_dev/app/modules/**/**View.js',
                        '_dev/app/app.routes.js'
                        ],
            css : '_dev/css/style.css',
            img : '_dev/img/**/*'
        },
        production : {
            scripts : 'js/app',
            css : 'css',
            img : 'img'
        }
    },
    onError = function (err) {
        notify('An error has occurred');
        gutil.log(gutil.colors.green(err));
    };

// Development Webserver
gulp.task('webserver', function () {
    connect.server({ livereload : true, port : 1337 });
});

// CSS
gulp.task('styles', function () {
  return gulp.src(paths.development.css)
    .pipe(plumber({ errorHandler : onError }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.production.css))
    .pipe(notify('Styles task complete'))
    .pipe(connect.reload());
});

// JS
gulp.task('scripts', function() {
  return gulp.src(paths.development.scripts)
    .pipe(plumber({ errorHandler : onError }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('application.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.production.scripts))
    .pipe(notify('Scripts task complete'))
    .pipe(connect.reload());
});

// IMG
gulp.task('images', function () {
  return gulp.src(paths.development.img)
    .pipe(imagemin({ optimizationLevel : 3, progressive : true, interlaced : true }))
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.production.img))
    .pipe(notify('Images task complete'))
    .pipe(connect.reload());
});

// Clean up
gulp.task('clean', function (callback) {
    del([paths.production.css + '/style.min.css', paths.production.scripts, paths.production.img], callback);
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.development.css, ['styles']);
  gulp.watch(paths.development.scripts, ['scripts']);
  gulp.watch(paths.development.img, ['images']);
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('webserver', 'styles', 'scripts', 'images', 'watch');
});