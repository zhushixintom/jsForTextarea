var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');
// var livereload = require('gulp-livereload');

var pkg = require("./package.json");

var banner =
"/** \n\
* jsForTextarea" + pkg.version + " \n\
* By Tom Zhu\n\
* https://github.com/zhushixintom/jsForTextarea.git/\n \
*/\n";

gulp.task('js', function() {
  /*count = 0;
  var end = function(){
    count ++;
    if(count >= 3) cb();
  };
*/
  gulp.src([
    'src/js/jsForTextarea.js',
  ])
    // .pipe(concat({ path: 'jsForRadio.js'}))
    // .pipe(header(banner))
    .pipe(gulp.dest('./js'))
    // .on("end", end);
});

gulp.task('copy', function(){
	gulp.src([
		'src/lib/*',
		]).pipe(gulp.dest('js/lib'));
});

gulp.task('uglify', function () {
    gulp.src(['js/*.js', '!js/*.min.js'])
        // .pipe(uglify())
        .pipe(uglify({
          preserveComments: "license"
        }))
        .pipe(ext_replace('.min.js'))
        .pipe(header(banner))
        .pipe(gulp.dest('js/'));
});

// gulp.task('uglify', ["js"], function() {
//   return gulp.src(['./js/*.js', '!./js/*.min.js'])
//     .pipe(uglify({
//       preserveComments: "license"
//     }))
//     .pipe(ext_replace('.min.js'))
//     .pipe(gulp.dest('./js'));
// });

gulp.task('ejs', function () {
  return gulp.src(["./demos/*.html", "!./demos/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./"));
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('js/*.js', ['uglify']);
  gulp.watch('demos/*.html', ['ejs']);
});

gulp.task('server', function () {
  connect.server();
});
gulp.task("default", ['js', 'uglify', 'copy', 'ejs']);
