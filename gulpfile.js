var gulp       = require('gulp')
var browserify = require('browserify')
var reactify   = require('reactify')
var source     = require('vinyl-source-stream');
var webserver  = require('gulp-webserver');

gulp.task('js', function() {
  browserify({
    entries: ['./src/app.js'],
    transform: [reactify],
    debug: true
  })
  .bundle()
  .on('error', function(err) {
    console.log(err.message);
    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('webserver', function () {
  gulp.src('./')
      .pipe(webserver({
        livereload: true,
        port: 8080,
        fallback: 'index.html',
        //open: true
      }))
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js'], ['js']);
})
