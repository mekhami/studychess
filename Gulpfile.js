var gulp = require('gulp'),
    browserify = require('browserify'),
    sass = require('gulp-sass'),
    del = require('del'),
    source = require('vinyl-source-stream'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

var folder = {
        src: 'studychess/**/',
        build: 'studychess/build/'
    };

gulp.task('sass', function() {
    return gulp.src([folder.src + '*.scss'])
        .pipe(sass()).on('error', function(err){
            this.emit('end');
        })
        .pipe(gulp.dest(folder.build + 'css'))
        .pipe(livereload());
});

gulp.task('js', function() {
    return browserify('studychess/core/static/js/main.js')
        .bundle().on('error', function(err){
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(folder.build + 'js'))
        .pipe(livereload());
});


gulp.task('watch', ['js', 'sass'], function() {
    livereload.listen();
    gulp.watch([folder.src + '*.js', '!studychess/{build,build/**}'], ['js']);
    gulp.watch(folder.src + '*.scss', ['sass']);
    gulp.watch(folder.build + '*.css').on('change', livereload.changed);
    gulp.watch(folder.src + '*.html').on('change', livereload.changed);
});

gulp.task('clean', function() {
    return del([folder.build + '*']);
});

gulp.task('default', ['clean', 'watch']);

gulp.task('build', ['sass', 'js']);
