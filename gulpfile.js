var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify');

// CoffeeScript to JavaScript task

var coffeeSources = ['components/coffee/tagline.coffee'],
    coffeeDestination = 'components/scripts';

gulp.task('coffee', function(){
    gulp.src(coffeeSources[0])
        .pipe(coffee({ bare: true })
            .on('error', gutil.log))
        .pipe(gulp.dest(coffeeDestination)
    )
});


// Concatenate all JavaScript files into one.

var jsSources = [
        'components/scripts/rclick.js',
        'components/scripts/pixgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
    ],

    jsDestination ='builds/development/js';

gulp.task('js', function () {
    // 1. Specify source
    // 2. Pipe it through a a method.
    // 3. Send it to a destination
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest(jsDestination)
    )
});