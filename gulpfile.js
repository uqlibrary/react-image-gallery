const babel = require('gulp-babel');
const browserify = require('browserify');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');

const babelOptions = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-react-jsx'],
  ],
  presets: ['@babel/preset-env'],
};

gulp.task('server', () => {
  connect.server({
    host: '0.0.0.0',
    root: ['example', 'build', 'styles'],
    port: 8001,
    livereload: true,
  });
});

gulp.task('sass', async () => {
  gulp.src('./styles/scss/image-gallery.scss')
    .pipe(sass())
    .pipe(rename('image-gallery.css'))
    .pipe(gulp.dest('./styles/css/'))
    .pipe(livereload());
});

gulp.task('scripts', async () => {
  watchify(browserify({
    entries: './example/app.js',
    extensions: ['.jsx'],
    debug: true,
  }).transform('babelify', babelOptions))
    .bundle()
    .on('error', (err) => console.error('error is', err))
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./example/'))
    .pipe(livereload());
});

gulp.task('demo-src', async () => {
  process.env.NODE_ENV = 'production';
  browserify({
    entries: './example/app.js',
    extensions: ['.jsx'],
    debug: true,
  }).transform('babelify', babelOptions)
    .bundle()
    .pipe(source('demo.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./demo/'));

  gulp.src(['./styles/css/image-gallery.css', './example/app.css'])
    .pipe(concat('demo.css'))
    .pipe(cleanCSS({ keepSpecialComments: false }))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('source-js', () => (
  gulp.src('./src/ImageGallery.jsx')
    .pipe(concat('image-gallery.js'))
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('./build'))
));

gulp.task('svg-js', () => (
  gulp.src('./src/SVG.jsx')
    .pipe(concat('SVG.js'))
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('./build'))
));

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(['styles/**/*.scss'], gulp.series('sass'));
  gulp.watch(['src/*.jsx', 'src/icons/*.jsx', 'example/app.js'], gulp.series('scripts'));
});

gulp.task('dev', gulp.parallel(['watch', 'scripts', 'sass', 'server']));
gulp.task('build', gulp.series(['source-js', 'svg-js', 'sass']));
gulp.task('demo', gulp.series(['demo-src']));
