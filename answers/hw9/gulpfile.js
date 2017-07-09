var gulp = require('gulp');
var inline = require('gulp-inline');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-csso');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');
var minify = require('gulp-minify');
var gulpSequence = require('gulp-sequence');

gulp.task('inline', function(){
  return gulp.src('index.html')
    .pipe(inline({
      base: './',
    }))
    .pipe(gulp.dest('dist/'));
})


gulp.task('css',function(){
  return gulp.src('src/css/*.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('webpack', function(){
  return gulp.src('src/js/*.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js'))
})


gulp.task('uglify', function(){
  return gulp.src('dist/js/bundle.js')
    .pipe(minify({
      ext:{
          src:'-debug.js',
          min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('default',gulpSequence('css', 'webpack', 'uglify', 'inline'))
