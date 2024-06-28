const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImages() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
    }

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback){
    setTimeout(function(){
    console.log("executando via gulp");
    callback();
    },2000);
}

function dizOi(callback){
    setTimeout(function(){
    console.log("ola gulp");
    dizTchau();
    callback();
    },1000);
}

function dizTchau(){
    console.log("tchau gulp");
}

exports.default = gulp.parallel(funcaoPadrao, dizOi, comprimeImages);

exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = function(){
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
}

exports.javascript = comprimeJavaScript;
exports.images = comprimeImages;
