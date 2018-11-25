var	gulp	=	require('gulp'),	
				sass	=	require('gulp-sass'),	
				concat	=	require('gulp-concat'),	
				uglify	=	require('gulp-uglify'),	
				rename	=	require('gulp-rename'),	
				livereload	=	require('gulp-livereload');	

var config = {
    scripts: [
        './js/app/app.js'
    ]
};

	
gulp.task('sass',	function	()	{	
	return	gulp.src('./*.scss')	
		.pipe(sass.sync({outputStyle:	'compressed'}).on('error',	sass.logError))	
		.pipe(livereload())	
		.pipe(gulp.dest('./'));	
});	

gulp.task('scripts', function() {
    return gulp.src(config.scripts)
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('./js/'))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(livereload())
            .pipe(gulp.dest('./js/'));
});
	
gulp.task('watch',	function	()	{	
	livereload.listen(35729);

	gulp.watch('./*.html').on('change', function(file) {
		livereload.changed(file.path);
});

	gulp.watch('./*.scss',	['sass']);	
	gulp.watch('./js/**/*.js', ['scripts']);
});	

