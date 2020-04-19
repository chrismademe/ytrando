// Config
const config = {
    source: 'src/assets/css',
    dest: 'src/assets/css/dist',
};

// Modules
const gulp = require('gulp');
const minifycss = require('gulp-cssnano');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const tailwind = require('tailwindcss');
const purgecss = require('gulp-purgecss');

/**
 * Default Task that runs when you type gulp in the console
 */
const defaultTask = function (done) {
    gulp.series('compileCSS', 'watch');
    done();
};

/**
 * Compile CSS
 */
const compileCSS = function () {
    // Load Files
    return gulp
        .src(`${config.source}/style.css`)
        .pipe(postcss([tailwind, autoprefixer]))
        .pipe(gulp.dest(config.dest));
    // .pipe(notify({ message: 'Styles task complete' }))
};

const buildCSS = function () {
    // Load Files
    return (
        gulp
            .src(`${config.source}/style.css`)

            // Autoprefix and Minify
            .pipe(postcss([tailwind, autoprefixer]))

            .pipe(
                purgecss({
                    content: ['src/*.html', 'src/assets/js/*.js'],
                    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                })
            )

            .pipe(minifycss())

            // Save it
            .pipe(gulp.dest(config.dest))
    );
};

function watch(done) {
    // Watch .scss files
    gulp.watch(`${config.source}/*.css`, compileCSS);
    done();
}

const watchAndSync = gulp.parallel(watch);

exports.default = defaultTask;
exports.compileCSS = compileCSS;
exports.watch = watchAndSync;
exports.buildCSS = buildCSS;
