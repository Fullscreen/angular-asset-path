var gulp = require('gulp')
  , rename = require('gulp-rename')
  , ngAnnotate = require('gulp-ng-annotate')
  , uglify = require('gulp-uglify')

gulp.task('build', function() {
  gulp.src(['src/index.js'])
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(rename('index.min.js'))
      .pipe(gulp.dest('.'))
})

gulp.task('default', ['build'])


