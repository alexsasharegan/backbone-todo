// -------- PLUGINS --------
var gulp = require('gulp');
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// -------- TASKS --------

gulp.task('scripts', function () {
	return gulp.src(['./dev/js/**/*.js'])
		.pipe(babel())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
  return gulp.src('./dev/scss/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
    	.on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./dev/**/*.js', ['scripts']);
  gulp.watch('./dev/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
