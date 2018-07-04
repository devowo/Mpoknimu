let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyes);

gulp.task('default', () =>
console.log('See you in another video')
);

gulp.task('minify-css', () => {
  return gulp.src('public/css/*.css')
  .pipe(cleanCSS(
    {level: {1: {specialComments: 0}}}))
  .pipe(concat('cssbundle.css'))
  .pipe(gulp.dest('public/dist/css'));
});

gulp.task('compress', () => {
  pump([
        gulp.src(['./*.js','controllers/*.js','models/*.js','routes/*.js','helpers/*.js']),
        minify(),
        concat('jsbundle.js'),
        gulp.dest('public/dist/js')
    ],
  );
});

gulp.task('minify-html', () => {
  return gulp.src(['views/*.ejs','views/layouts/*.ejs'])
    .pipe(htmlmin({collapseWhitespace: true,
      collapseInlineTagWhitespace:true,
      removeComments: true,
      removeRedundantAttributes:true,
      useShortDoctype:true,
      html5: true }))
    .pipe(concat('htmlbundle.ejs'))
    .pipe(gulp.dest('public/dist/html'));
});
