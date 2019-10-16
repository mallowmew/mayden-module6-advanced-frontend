const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')

sass.compiler = require('node-sass')

gulp.task('heyyy babe', function(done) {
  console.log('how you doin\'?')
  done()
})

gulp.task('sass:compile', function(done) {
  return gulp.src('sass/main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('styles/'))
  done() //returning should tell gulp that this task is done, but it doesn't hurt to put done here just to make sure
})

gulp.task('sass:compile-mapped', function(done) {
  return gulp.src('sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('styles/'))
  done()
})

gulp.task('sass:compile-clock', function(done) {
  return gulp.src('clock/sass/clock.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('clock/styles/'))
  done()
})

gulp.task('sass:watch', function(done) {
  gulp.watch(['sass/*.scss', '*.html'], gulp.series('sass:compile-mapped'))
  done()
})

gulp.task('sass:compile-pilot-shop-mapped', function(done) {
  return gulp.src('pilot-shop/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('pilot-shop/'))
  done()
})

gulp.task('sass:watch-pilot-shop', function(done) {
  gulp.watch(['pilot-shop/sass/*.scss', 'pilot-shop/sass/*/*.scss'], {delay: 3000}, gulp.series('sass:compile-pilot-shop-mapped'))
  done()
})

gulp.task('babel:compile', (done) => {
  gulp.src('src/script.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        minified: true
      })
      .on('error', err => {
        console.log('Oops! ' + err)
        done(err)
    }))
    .pipe(gulp.dest('.'))
  done()
})