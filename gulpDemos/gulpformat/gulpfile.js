var yargs = require('yargs').argv;
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var fs = require('fs');


var uglify = require("gulp-uglify");
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');

var distCss = __dirname + '/public/stylesheets';
var distJs = __dirname + '/public/javascripts';


var stylesOneBuild = function(name,cb){
	var path = './client/'+name+'/stylesheets/sequenceCSS.json';
	var concatCSSname = name+'.min.css';
    var files = fs.readFileSync(path,'utf-8');
    files = JSON.parse(files);
    pump([
    	gulp.src(files),
    	concat(concatCSSname),
    	cleanCSS({compatibility: 'ie8'}),
    	gulp.dest(distCss)
    	],cb);
};

var stylesOne = function(name,cb){
	var path = './client/'+name+'/stylesheets/sequenceCSS.json';
	var concatCSSname = name+'.min.css';
    var files = fs.readFileSync(path,'utf-8');
    files = JSON.parse(files);
    pump([
    	gulp.src(files),
    	concat(concatCSSname),
    	gulp.dest(distCss)
    	],cb);
};

gulp.task('guideCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('guide',cb);
    } else {
    	stylesOne('guide',cb);
    }
});

gulp.task('indexCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('index',cb);
    } else {
    	stylesOne('index',cb);
    }
});

gulp.task('loginCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('login',cb);
    } else {
    	stylesOne('login',cb);
    }
});

gulp.task('navbarCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('navbar',cb);
    } else {
    	stylesOne('navbar',cb);
    }
});

gulp.task('pathCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('path',cb);
    } else {
    	stylesOne('path',cb);
    }
});

gulp.task('pointCss',function(cb){
	if (yargs.b) {
    	stylesOneBuild('point',cb);
    } else {
    	stylesOne('point',cb);
    }
});

gulp.task('styles',['guideCss','indexCss','loginCss','navbarCss','pathCss','pointCss']);

var jsOneBuild = function(name,cb){
	var path = './client/'+name+'/javascripts/sequenceJS.json';
	var concatJSname = name+'.min.js';
    var files = fs.readFileSync(path,'utf-8');
    files = JSON.parse(files);
        pump([
	    	gulp.src(files),
	    	concat(concatJSname),
	    	uglify(),
	    	gulp.dest(distJs)
    	],cb);
}

var jsOne = function(name,cb){
	var path = './client/'+name+'/javascripts/sequenceJS.json';
	var concatJSname = name+'.min.js';
    var files = fs.readFileSync(path,'utf-8');
    files = JSON.parse(files);
        pump([
	    	gulp.src(files),
	    	concat(concatJSname),
	    	gulp.dest(distJs)
    	],cb);
}

gulp.task('guideJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('guide',cb);
    } else {
    	jsOne('guide',cb);
    }
});

gulp.task('indexJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('index',cb);
    } else {
    	jsOne('index',cb);
    }
});

gulp.task('loginJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('login',cb);
    } else {
    	jsOne('login',cb);
    }
});

gulp.task('navbarJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('navbar',cb);
    } else {
    	jsOne('navbar',cb);
    }
});

gulp.task('pathJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('path',cb);
    } else {
    	jsOne('path',cb);
    }
});

gulp.task('pointJS',function(cb){
	if (yargs.b) {
    	jsOneBuild('point',cb);
    } else {
    	jsOne('point',cb);
    }
});

gulp.task('js',['guideJS','indexJS','loginJS','navbarJS','pathJS','pointJS']);

// gulp.task('js',function(){
//     var files = fs.readFileSync('./client/javascripts/sequenceJS.json','utf-8');
//     files = JSON.parse(files);
//     gulp.src(files)
//         .pipe(concat('all.min.js'))
//         .pipe(gulp.dest(distJs))
// });

gulp.task('watch', function () {
    gulp.watch(['./client/**/*.css'], ['styles']);
    gulp.watch(['./client/**/*.js'], ['js']);
    gulp.watch(['./client/**/sequenceJS.json'], ['js']);
    gulp.watch(['./client/**/sequenceCSS.json'], ['styles']);
});



gulp.task('release', ['styles','js']);


gulp.task('server', function () {
    browserSync.init({
        open:false,
        ui:false,
        notify:false,
        proxy:'localhost:3010',
        files: ['./views/**','./public/javascripts/*.min.js','./public/stylesheets/*.min.css'],
        port: 8080
    });
});


// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', function () {
    gulp.start('release')
    if (yargs.s) {
        gulp.start('server');
    }
    if (yargs.w) {
        gulp.start('watch');
    }
//    } else {
//        gulp.start('release');
//    }
});