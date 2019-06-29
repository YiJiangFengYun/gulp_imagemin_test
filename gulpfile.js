const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

function minImages() {
  return gulp.src(['images/**/*.{png,jpg}'], { since: gulp.lastRun(minImages) })
    .pipe((imagemin([
        //png
        imageminPngquant({
            speed: 1,
            quality: [0.95, 1] //lossy settings
        }),
        imageminZopfli({
            more: true,
            // iterations: 50 // very slow but more effective
        }),
        //jpg lossless
        imagemin.jpegtran({
            progressive: true
        }),
        imageminJpegRecompress({
            loops:6,
            min: 40,
            max: 85,
            quality:'low'
          }),
        //jpg very light lossy, use vs jpegtran
        imageminMozjpeg({
            quality: 90
        })
    ])))
    .pipe(gulp.dest('build/img/'));
}

function watchTask() {
    gulp.watch(['images/**/*.{gif,png,jpg}'], minImages);
}

gulp.task("default", watchTask);
gulp.task("min_images", minImages);