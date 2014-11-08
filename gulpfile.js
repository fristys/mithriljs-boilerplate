var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');

var paths = {
    development : {
        scripts : ['_dev/app/app.js', '_dev/app/models/*.js', '_dev/app/modules/**/**Module.js',
                    '_dev/app/modules/**/**Model.js','_dev/app/modules/**/**Controller.js',
                    '_dev/app/modules/**/**View.js', '_dev/app/app.routes.js'],
        css : '_dev/css/style.css',
        img : '_dev/img/**/*'
    },
    production : {
        scripts : 'js/app',
        css : 'css',
        img : 'img'
    }
};

// CSS
gulp.task('styles', function () {
  return gulp.src(paths.development.css)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.production.css))
    .pipe(notify({ message: 'Styles task complete' }));
});

// JS
gulp.task('scripts', function() {
  return gulp.src(paths.development.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('application.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.production.scripts))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// IMG
gulp.task('images', function () {
  return gulp.src(paths.development.img)
    .pipe(imagemin({ optimizationLevel : 3, progressive : true, interlaced : true }))
    .pipe(gulp.dest(paths.production.img))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean up
gulp.task('clean', function (callback) {
    del([paths.production.css, paths.production.scripts, paths.production.img], callback);
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images', 'watch');
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.development.css, ['styles']);
  gulp.watch(paths.development.scripts, ['scripts']);
  gulp.watch(paths.development.img, ['images']);

  livereload.listen();

  gulp.watch([paths.production.css + '/**', paths.production.scripts + '/**', paths.production.img + '/**']).on('change', livereload.changed);
});