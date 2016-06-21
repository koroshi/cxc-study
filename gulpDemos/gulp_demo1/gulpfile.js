var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task("default",function(){
    console.log("default");
})

gulp.task("mytest",function(){
    console.log("mytest");
})

gulp.task("mysql",["mytest"],function(){
    console.log("mysql");
})

gulp.task("ug",function(){
 gulp.src("src/*.js")
	.pipe(uglify())
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dist'));
})

gulp.task("clean",function(){
 gulp.src("dist/*.js")
	.pipe(clean());
})
