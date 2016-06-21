var yargs = require('yargs').argv;
var gulp = require('gulp');
var browserSync = require('browser-sync');
var option = {base: 'src'};
var dist = __dirname + '/dist';
var clean = require('gulp-clean');
var uglify = require("gulp-uglify");
var sourcemaps = require('gulp-sourcemaps');
var usemin = require('gulp-usemin');
var react = require('gulp-react');

gulp.task('source',['clean'], function(){
    gulp.src('src/lib/*.js', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function(){
    gulp.src('dist/**/*.*', {read:false})
        .pipe(clean({force:true}));
});

//gulp.task('ug',function(){
//    gulp.src("src/*.js",option)
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest(dist))
//});

gulp.task('ownCode', ['source'],function(){
    gulp.src('src/*.html',option)
        .pipe(usemin({js:[sourcemaps.init(),react(),uglify(),sourcemaps.write()]}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('release', ['ownCode']);

gulp.task('watch', function () {
    gulp.watch('src/*.{js,html}', ['ownCode'],function(){
        browserSync.reload();
    });
});


gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: 8081,
            weinre: {
                port: 9090
            }
        },
        port: 8080,
        startPath: '/reactView.html'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', function () {
    if (yargs.s) {
        gulp.start('server');
    }
    if (yargs.w) {
        gulp.start('release');
        gulp.start('watch');
    } else {
        gulp.start('release');
    }
});

