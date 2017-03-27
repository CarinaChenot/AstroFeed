const gulp         = require('gulp')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const minify       = require('gulp-minify')
const connect      = require('gulp-connect')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps   = require('gulp-sourcemaps')
const sass         = require('gulp-sass')
const babel        = require('gulp-babel')


let config = {
    'src' : 'src/',
    'dist': 'dist/'
}


// Connect task
gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        livereload: true
    })
})

// CSS task
gulp.task('sass', () => {
    return gulp.src(config.src + 'sass/*.scss')
        .pipe(plumber({errorHandler: notify.onError('SASS Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename(function (path) {
            path.basename += ".min"
        }))
        .pipe(gulp.dest(config.dist + 'assets/css'))
        .pipe(connect.reload())
        .pipe(notify('SASS compiled: <%= file.relative %>'))
})


// JS task
gulp.task('js', () => {
    return gulp.src(config.src + 'js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
          },
          ignoreFiles: ['.min.js'],
          noSource: false
        }))
        .pipe(gulp.dest(config.dist + 'assets/js'))
        .pipe(connect.reload())
        .pipe(notify('JS compiled: <%= file.relative %>'))
})

// Wath task
gulp.task('watch', () => {
    gulp.watch(config.src + 'sass/**/*.scss', ['sass'])
    gulp.watch(config.src + 'js/*.js', ['js'])
})

gulp.task('default', ['connect', 'watch'], () => {

})
