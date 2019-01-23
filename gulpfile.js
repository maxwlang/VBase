'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const named = require('vinyl-named');
const gls = require('gulp-live-server');
const es = require('event-stream');
const prompt = require('gulp-prompt');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');
sass.compiler = require('node-sass');

const server = gls.new('./index.js');

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('javascript', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(named())
        .pipe(webpack({
            config: require('./webpack.config.js'),
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'));
});

gulp.task('publicfs', function () {
    const logFile = function (es) {
        return es.map(function (file, cb) {
            console.log(`[PublicFS] src/.../${path.basename(file.path)} -> public/.../${path.basename(file.path)}`);
            return cb(null, file);
        });
    };

    return gulp.src([
        './src/**/*.*',
        './src/*.*',
        '!./src/js/**/*.*',
        '!./src/scss/**/*.*',
        '!./src/img/**/*.*',
    ]).pipe(changed('./public'))
        .pipe(logFile(es))
        .pipe(gulp.dest('./public'));
});

gulp.task('reload', function (callback) {
    server.start.bind(server)();
    return callback();
});

gulp.task('server', function () {
    return server.start();
});

gulp.task('watch', function (callback) {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js', gulp.series('javascript'));
    gulp.watch('./src/img/**/*.*', gulp.series('images'));
    gulp.watch([
        './src/**/*.*',
        './src/*.*',
        '!./src/js/**/*.*',
        '!./src/scss/**/*.*',
        '!./src/img/**/*.*',
    ], gulp.series('publicfs'));
    gulp.watch([
        '!./src/**/**',
        './*.js',
        './**/*.js',
    ], gulp.series('reload'));
    callback();
});

gulp.task('sql', function () {
    let configFile = fs.readFileSync('./sql/initDB.sql', 'utf8');
    const gulpVariables = (configFile.match(/%%\[(.+?)\]%%/g)[0]).slice(3, -3).toUpperCase().split(', ');
    const prompts = [];
    gulpVariables.forEach(variable => {
        prompts.push({
            type: 'input',
            name: variable,
            message: `Replace %%${variable}%% with: `,
        });
    });

    return gulp.src('./sql/initDB.sql').pipe(prompt.confirm({
        message: 'You are about to initialize ./sql/initDB.sql. Continue?',
        default: false,
    })).pipe(prompt.prompt(prompts, function (res) {

        console.log('Variables to be overwritten: ');
        Object.keys(res).forEach(key => {
            console.log(`%%${key}%% => ${res[key]}`);
            configFile = configFile.replace(new RegExp(`%%${key}%%`, 'g'), res[key]);
        });

        console.log('Updating initDB.sql..');
        try {
            fs.writeFileSync('./sql/initDB.sql', configFile);
            console.log('OK');
        } catch (e) {
            console.error(`Failed. ${e}`);
        }
    }));
});

gulp.task('prepare', gulp.parallel('sass', 'javascript', 'images', 'publicfs')); // Prepare content

gulp.task('default', function () {
    new Promise(gulp.parallel('sass', 'javascript', 'images', 'publicfs')) // Prepare content first
        .then(gulp.series('watch', 'server')); // Then watch and start server
});
