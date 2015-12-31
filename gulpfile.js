var gulp = require('gulp'),
	minifCSS = require('gulp-minify-css'),//压缩CSS
	minifyHtml = require('gulp-minify-html'),//压缩html
	uglify = require('gulp-uglify'),
	spriter = require('gulp-css-spriter'),//雪碧图插件
	rename = require('gulp-rename');//重命名

gulp.task('html', function(){
	gulp.src('html/*.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist/html'))
});

gulp.task('img', function(){
	gulp.src('public/images/**/*')
		.pipe(gulp.dest('dist/public/images'))
});

gulp.task('css', function(){
	gulp.src('public/css/*.css')
		.pipe(spriter({
			'spriteSheet': './dist/public/images/sprite.png',
			'pathToSpriteSheetFromCSS': '../images/sprite.png'
		}))
		.pipe(gulp.dest('dist/public/css'))
		.pipe(minifCSS())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('dist/public/css'))
});

gulp.task('js', function() {
  	gulp.src('public/js/*.js')
	    .pipe(gulp.dest('dist/public/js'))
	    .pipe(rename({extname: '.min.js'}))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/public/js'))
});

gulp.task('default', ['css', 'js', 'html', 'img']);