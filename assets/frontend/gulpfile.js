var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglifyjs');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var makeBeep = require('make-beep');
var notify = require("gulp-notify");
var imageResize  = require("gulp-image-resize");
var taskListing = require('gulp-task-listing');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     ERROR
//////////
/*http://stackoverflow.com/questions/25782341/global-error-message-using-gulp-notify-plumber*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var onError = notify.onError({
   title:    'Error',
   subtitle: '<%= file.relative %> did not compile!',
   message:  '<%= error.message %>'   
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     WEBSITE TASKS
//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// JS
gulp.task('uglifyjs', function() {
    return gulp.src([
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',            
            './js/main.js'
         
        ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify('app.js', {
            compress: false
        }))
        .pipe(gulp.dest('./js/'))
        .pipe(livereload())
            .pipe(notify({ 
            title: 'JAVASCRIPT',
            subtitle: 'success',
            sound: "Beep",            
            message: " <%= file.relative %>  compressed!", onLast: true }));     

});

// Sass
gulp.task('sass', function() {

    return gulp.src([
        './scss/app.scss'
    ])
    .pipe(sourcemaps.init())  
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    /*
    .pipe(sass({
        style: 'compressed',
        cacheLocation: './cache/.sass-cache'
        
    }))
    */
    .pipe(sourcemaps.write())

    .pipe(gulp.dest('./css/'))
    .pipe(livereload())

    .pipe(notify({ 
            title: 'SASS',
            subtitle: 'success',
            sound: "Beep",            
            message: " <%= file.relative %>  compressed!", onLast: true }))    

});

// HTML
gulp.task('html', function() {
    return gulp.src([
            '../../public/*.html'
        ])

    .pipe(livereload())  
        .pipe(notify({ 
            title: 'HTML',
            subtitle: 'success',
            sound: "Beep",
            message: "Livereload!", onLast: true })); 
});

// PHP
gulp.task('php', function() {
    return gulp.src([
            '../../public/*.php'
        ])

    .pipe(livereload())  
        .pipe(notify({ 
            title: 'PHP',
            subtitle: 'success',
            sound: "Beep",
            message: "Livereload!", onLast: true }));
});

// images
gulp.task('img', function() {
    return gulp.src([
            './assets/img.*'
        ])
        .pipe(livereload()); 

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     WATCH AND BUILD TASKS
//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Primary task to watch other tasks
    gulp.task('start', function() {
    // LiveReload
    livereload.listen();
    
    // Watch JS    
    gulp.watch('./bower_components/jquery/dist/jquery.min.js', ['uglifyjs']);
    gulp.watch('./bower_components/bootstrap/dist/js/bootstrap.min.js', ['uglifyjs']);
    gulp.watch('./js/main.js', ['uglifyjs']);  
  
    // Watch Sass
    gulp.watch(['./scss/*.scss'], ['sass']);

    // Watch HTML AND PHP - livereload
    gulp.watch('../../public/*.html', ['html']);
    gulp.watch('../../public/*.php', ['php']);

    // Watch 'Images'
    gulp.watch('./img/*.*', ['img']);   
    gulp.watch('./img/*.*', ['imagemin']);

});

// Manually build all
    gulp.task('build', function() {
    gulp.start('uglifyjs', 'sass');
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     IMAGES Compressed Image from img-normal to img-optimized
//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('optimized-images', function() {
    return gulp.src(              
        './img/img-normal/*.png'
        )
    .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('./img/img-optimized'))

        .pipe(notify({ 
            title: 'IMAGE',
            subtitle: 'success',
            sound: "Beep",            
            message: "Images optimized!", onLast: true }));  
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     IMAGES Resizing images 50px;
//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('resized-images', function () {
  gulp.src('./img/img-normal/*.png')
    .pipe(imageResize({ 
      width : 50,
      height : 50,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('./img/img-resized'))

    .pipe(notify({ 
            title: 'IMAGE RESIZED',
            subtitle: 'success',
            sound: "Beep",            
            message: "Images resized!", onLast: true }));  
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
//////////     IMAGES Resizing images 50px;
//////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('help', taskListing);