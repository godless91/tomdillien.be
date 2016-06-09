/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    fontmin = require('gulp-fontmin'),
    angularComponents = require('gulp-angular-components'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),  
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    es = require('event-stream'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./gulp-config.json');
;

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('app/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('app/src/css/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('app/src/js/**/*.js', ['scripts']);
  // Watch .js files
  gulp.watch('app/components/**/*.js', ['components']);
  // Watch image files
  gulp.watch('app/src/img/**/*', ['images']);
  // Watch image files
  gulp.watch('app/components/**/*', ['components']);
});

// js task
var jsFiles = 'app/src/js/**/*.js',  
    jsDest = 'app/dist/js';

gulp.task('scripts', function() {  
  return gulp.src(jsFiles)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(jsDest))
      .pipe(rename('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));
});

// css task
var cssFiles = 'app/src/css/*.css',  
    cssDest = 'app/dist/css';

gulp.task('styles', function() {
  return gulp.src(cssFiles)
    .pipe(concat('style.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/dist/css'))
    .pipe(gulp.dest(cssDest));
});

// images task
var imageFiles = 'app/src/img/**/*',  
    imageDest  = 'app/dist/img';

gulp.task('images', function() {
  return gulp.src(imageFiles)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(imageDest))
    .pipe(notify({ message: 'Images task complete' }))
  ;
});

// fonts task
var fontFiles = 'app/src/fonts/*.ttf',  
    fontDest  = 'app/dist/fonts';

gulp.task('fonts', function () {
    return gulp.src(fontFiles)
        .pipe(fontmin())
        .pipe(gulp.dest(fontDest))
        .pipe(notify({ message: 'fonts task complete' }))
    ;
});

// bower components task
var vendorDest = 'app/dist/vendor';

gulp.task('bower', function() {
  return gulp
    .src(config.paths.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(vendorDest))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(vendorDest))
    .pipe(notify({ message: 'bower task complete' }))
  ;
});

// angular components task
var componentFiles = ['app/components/*'],  
    componentDest  = 'app/dist/components';

var moduleFiles = gulp.src(['app/components/**/*.module.js']);
var componentFiles = gulp.src(['app/components/**/*.component.js']);
var configFiles = gulp.src(['app/components/**/*.config.js']);

gulp.task('components', function() {  
  return es.merge(moduleFiles, componentFiles, configFiles)
        .pipe(concat('components.js'))
        .pipe(gulp.dest(componentDest))
        .pipe(rename('components.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(componentDest))
});

// angular templates task
var templatesFiles = ['app/components/**/*.html'],  
    templatesDest  = 'app/dist/templates';

gulp.task('templates', function () {
  return gulp.src(templatesFiles)
    .pipe(templateCache())
    .pipe(gulp.dest(templatesDest));
});

// good idea to clean out the destination folders and rebuild the files
gulp.task('clean', function() {
    return del(['app/dist/css', 'app/dist/js', 'app/dist/img', 'app/dist/fonts', 'app/dist/components']);
});