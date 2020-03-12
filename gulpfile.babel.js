import gulp from "gulp";
import sass from "gulp-sass";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import browserify from "gulp-browserify";
import sourcemaps from "gulp-sourcemaps";
import babelify from "babelify";

import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  scripts: {
    src: "assets/js/*.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js"
  }
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      browserify({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"]
          })
        ]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
}

const clean = () => del(["src/static"]);

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.scripts.watch, scripts);
}

const dev = gulp.series(clean, styles, scripts);

export default dev;
