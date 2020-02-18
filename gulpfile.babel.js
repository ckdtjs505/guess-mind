import gulp from "gulp";
import sass from "gulp-sass";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  scripts: {
    src: "assets/js/index.js",
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
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
}

const clean = () => del(["src/static"]);

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.styles.watch, scripts);
}

const dev = gulp.series(clean, [styles, scripts, watchFiles]);

export default dev;
