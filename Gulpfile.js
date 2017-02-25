var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('studychess/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('studychess/build'))
});
