'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(cssmin())
    .pipe(dest('./lib'));
}


exports.build = series(compile)
