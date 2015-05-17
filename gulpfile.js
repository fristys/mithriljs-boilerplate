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
    msx = require('gulp-msx'),
    del = require('del');

var devSRC = 'src/app/';

var paths = {
        development : {
            scripts : [devSRC + 'app.js', devSRC + 'models/*.js', devSRC + 'components/*.js',
                        devSRC + 'modules/**/**Module.js', devSRC + 'modules/**/**Model.js',
                        devSRC + 'modules/**/**Controller.js', devSRC + 'modules/**/**View.compiled.js',
                        devSRC + 'app.routes.js'],
            css : devSRC + 'css/style.css',
            img : devSRC + 'img/**/*'
        },
        production : {
            scripts : 'public/js/app',
            css : 'public/css',
            img : 'public/img'
        }
    },
    onError = function (err) {
        notify('An error has occurred');
        gutil.log(gutil.colors.green(err));
    };

// Development Webserver
gulp.task('webserver', function () {
    connect.server({ root : 'public', livereload : true, port : 1337 });
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
gulp.task('views', function () {
    return gulp.src(devSRC + 'modules/**/**View.jsx')
            .pipe(plumber({ errorHandler : onError }))
            .pipe(msx({ harmony : true }))
            .pipe(rename({suffix: '.compiled'}))
            .pipe(gulp.dest(devSRC + 'modules'));
});

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
  gulp.watch(devSRC + 'modules/**/**View.jsx', ['views']);
  gulp.watch(paths.development.scripts, ['scripts']);
  gulp.watch(paths.development.img, ['images']);
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('webserver', 'styles', 'views', 'scripts', 'images', 'watch');
});