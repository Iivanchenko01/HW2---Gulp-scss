const gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass')(require('sass')),
browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jsMinify = require("gulp-js-minify");


const paths = {
    src: {
        img: './src/img/*.png',
        fix: './dist/css/styles.css',
        styles: './src/scss/**/*.scss',
        js: './src/script/*.js',
        minCss: './dist/css/*.css'
    },
    dist: {
        self: './dist',
        styles: './dist/css',
        jsBuild: './dist/js/',
        minImg: './dist/img/'
    }
}
const cleanDist = () => (
    gulp.src(paths.dist.self, {allowEmpty: true})
        .pipe(clean())
);
const scssBuild = () => (
    gulp.src(paths.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist.styles))
);
const buildJs = () => (
    gulp.src(paths.src.js)
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.dist.jsBuild))
        .pipe(browserSync.stream())

)
const autofix = () => (
    gulp.src(paths.src.fix)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist.styles))
)
const minImg = () => (
    gulp.src(paths.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist.minImg))
)
const minifyCss = function () {
    return gulp.src(paths.src.minCss)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.dist.styles)
        )
}
const minifyJs = () => (
    gulp.src(paths.src.js)
        .pipe(jsMinify())
        .pipe(gulp.dest(paths.dist.jsBuild))
)
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch(paths.src.styles, scssBuild).on('change', browserSync.reload)
    gulp.watch(paths.src.js, buildJs).on('change', browserSync.reload)
}
gulp.task('build', gulp.series(
    cleanDist,
    scssBuild,
    buildJs,
    minifyCss,
    minifyJs,
    minImg,
))
gulp.task('dev', watcher);
