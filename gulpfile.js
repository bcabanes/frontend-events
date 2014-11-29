/* global require */
(function(){
  'use strict';

  /**
  * Include Gulp & Tools
  */
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var del = require('del');
  var reload = browserSync.reload;
  var AUTOPREFIXER_BROWSERS =[
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  /**
   * List all available tasks
   */
  gulp.task('default', $.taskListing);

  /**
   * Optimize Images
   */
  gulp.task('images', function () {
    return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('app/assets/images'))
    .pipe($.size({title: 'images'}));
  });

  /**
   * Lint javascript
   */
  gulp.task('jshint', function () {
    return gulp.src('app/assets/scripts/js/**/*.js')
      .pipe(reload({stream: true, once: true}))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

  /**
   * Compile and Automatically Prefix Stylesheets
   */
  gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'app/assets/styles/scss/**/*.scss',
      ])
      .pipe($.changed('styles', {extension: '.scss'}))
      // .pipe($.sourcemaps.init())
      .pipe($.sass({
        precision: 10
      }))
      // .pipe($.sourcemaps.write('app/assets/styles/css'))
      .on('error', console.error.bind(console))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest('app/assets/styles/css/'))
      .pipe($.size({title: 'styles'}));
  });

  // Clean Output Directory
  gulp.task('clean', del.bind(null, ['.tmp', 'www/*'], {dot: true}));
  gulp.task('clean:tmp', del('.tmp', {dot: true}));

  /**
  * Setup a local node server
  * Watch Files For Changes & Reload
  */
  gulp.task('browser-sync', function() {
    browserSync({
      notify: true, // Show notification in the browser
      server: {
        baseDir: './app/'
      }
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/assets/styles/scss/**/*.{scss, sass}'], ['styles', reload]);
    gulp.watch(['app/assets/scripts/js/**/*.js'], ['jshint']);
    gulp.watch(['app/assets/images/**/*'], reload);
  });

  /**
   * Concat, uglify files for prodctions
   */
  gulp.task('usemin', function() {
    gulp.src('./app/*.html')
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      // html: [$.minifyHtml({empty: true})],
      js: [$.uglify(), $.rev()]
    }))
    .pipe(gulp.dest('./www/'));
  });

  /**
   * Task: 'gulp server'
   */
  // gulp.task('server', ['clean:tmp'], function(cb){
  //   runSequence('styles', ['usemin'],cb);
  // });
  gulp.task('server', ['clean:tmp', 'browser-sync']);

})();
