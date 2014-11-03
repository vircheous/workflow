var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

var coffeeSources = ['components/coffee/tagline.coffee'],
    coffeeDestinations = ['components/sass'];

gulp.task('coffee', function(){
    gulp.src(coffeeSources[0])
        .pipe(coffee({ bare: true })
            .on('error', gutil.log))
        .pipe(gulp.dest(coffeeDestinations[0])
    )
});