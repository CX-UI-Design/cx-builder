const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const javascriptObfuscator = require('gulp-javascript-obfuscator');//js压缩混淆插件
// const rename = require("gulp-rename");
// const replace = require("gulp-replace");
// const gutil = require("gulp-util");

const _base_path = "src/";
const _base_dist_path = "../lib";

process.env.BABEL_MODULE = "commonjs";

let t = 0;       								       //计数开始为0
const showinfo = function() {
  t++;
  const curDate = new Date();
  const Year = curDate.getFullYear().toString().slice(-2);
  const Month = ("0" + (curDate.getMonth() + 1)).slice(-2);
  const Day = ("0" + curDate.getDate()).slice(-2);
  const Hours = ("0" + curDate.getHours()).slice(-2);
  const Minutes = ("0" + curDate.getMinutes()).slice(-2);
  return FullDate = "\n" + "           - Author : 高仓雄（gcx / Spring of broccoli，Contact ：Wechat（lensgcx）" + "\n" + "           - Date:" + Year + "-" + Month + "-" + Day + "-" + Hours + "-" + Minutes + "\n" + "           - Current: " + t + "st refresh loading... " + "\n" + "           - running tasks...";
};

/**
 * compile builder
 */
gulp.task("js-handle", gulp.series(() => {
    return new Promise(function(resolve, reject) {

      gulp.src(_base_path + "**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify({
          mangle: { toplevel: true },// 可以对代码变量名简单混淆压缩
          compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(uglify())
        .pipe(javascriptObfuscator())
        .pipe(sourcemaps.write())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(_base_dist_path))
        // .on("error", function(err) {
        //   gutil.log(gutil.colors.red("[Error]"), err.toString());
        // })
        .pipe(notify({ message: "===== babel and uglify task complete =====" }));

      resolve();

    });
  }
));


/**
 * copy sh
 */
gulp.task("copy_sh", gulp.series(() => {
    return new Promise(function(resolve, reject) {

      gulp.src([_base_path + "entry.sh"])
        .pipe(gulp.dest(_base_dist_path))
        .pipe(notify({ message: "===== menu.sh copy complete =====" }));
      gulp.src(_base_path + "sh/**/*.*")
        .pipe(gulp.dest(_base_dist_path + "/sh"))
        .pipe(notify({ message: "===== command && menu copy complete =====" }));
      gulp.src(_base_path + "tools/release/release.sh")
        .pipe(gulp.dest(_base_dist_path + "/tools/release"))
        .pipe(notify({ message: "===== release.sh copy complete =====" }));
      gulp.src(_base_path + "tools/reinstall/reinstall.sh")
        .pipe(gulp.dest(_base_dist_path + "/tools/reinstall"))
        .pipe(notify({ message: "===== reinstall.sh copy complete =====" }));

      resolve();

    });
  }
));

/**
 * copy img
 */
gulp.task("copy_img", gulp.series(() => {
    return new Promise(function(resolve, reject) {

      gulp.src(_base_path + "logo.png")
        .pipe(gulp.dest(_base_dist_path))
        .pipe(notify({ message: "===== logo copy complete =====" }));

      resolve();

    });
  }
));


gulp.task("watch", gulp.series(() => {
  return new Promise(function(resolve, reject) {

    gulp.watch(_base_path + "**/*.js", ["js-handle"]).on("change", function(event) {
      console.log("File " + event.path + " was " + event.type + showinfo() + "");
    });
    gulp.watch(_base_path + "menu.sh", ["copy_sh"]).on("change", function(event) {
      console.log("File " + event.path + " was " + event.type + showinfo() + "");
    });

    resolve();

  });
}));

// gulp.task('default', ['js-handle', 'copy_sh', 'copy_img', 'watch']);
gulp.task("default", gulp.series(["js-handle", "copy_sh", "copy_img"]));

