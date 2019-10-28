const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


function style() {
return gulp.src('./src/styles/sass/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./src/styles/css'))
.pipe(browserSync.stream())
}

function watch() {
  server();
  gulp.watch('./src/styles/sass/**/*.scss', style);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/*.js').on('change', browserSync.reload);
}
function server(){
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
}

exports.style = style;
exports.watch = watch;