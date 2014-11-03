var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');




// Process Sass to CSS


var sassSources = ['components/sass/style.scss'],
    sassDestination = 'builds/development/css';

gulp.task('compass',function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        })
            .on('error',gutil.log))
        .pipe(gulp.dest(sassDestination))
        .pipe(connect.reload()
    )
});




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
        .pipe(gulp.dest(jsDestination))
        .pipe(connect.reload()
    )
});


// Connect Task - LiveReloading
gulp.task('connect', function(){
    connect.server({
        root: 'builds/development/',
        livereload: true
    });

});

// Watch Task
gulp.task('watch', function(){
    gulp.watch(coffeeSources,['coffee']);
    gulp.watch(jsSources,['js']);
    gulp.watch('components/sass/*.scss',['compass']);
    gulp.watch(htmlSources,['html']);
    gulp.watch(jsonSources,['json']);

});


// Data Watch

var jsonSources = ['builds/development/js/*.json'];

gulp.task('json',function(){
    gulp.src(jsonSources)
        .pipe(connect.reload())
});


// HTML Watch Task
var htmlSources = ['builds/development/*.html'];

gulp.task('html',function(){
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

// Default Task

gulp.task('default',['json','html','coffee', 'js', 'compass', 'connect','watch']);