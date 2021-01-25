const gulp = require("gulp");
const fs = require("fs-extra");
const path = require("path");
const notify = require("gulp-notify");
const clean = require("gulp-clean");


const targetPath = path.join(__dirname, "../lib");
const toPath = "../docs/";
const fileName = "cx-builder";

gulp.task("clean-lib", gulp.series(() => {
    return new Promise(function(resolve, reject) {

      gulp.src(toPath + fileName, { read: false })
        .pipe(clean({ force: true }))
        .pipe(notify({ message: "===== clean lib complete =====" }));

      resolve();

    });
  }
));

// copy
gulp.task("copy-lib", gulp.series(() => {
    return new Promise(function(resolve, reject) {
      // copy
      fs.copySync(targetPath, toPath + fileName);

      // gulp.src(targetPath + '/**/*')
      //   .pipe(gulp.dest(toPath + fileName))
      //   .pipe(notify({message: '===== lib copy complete ====='}));

      resolve();
    });
  }
));


gulp.task("default", gulp.series(["clean-lib", "copy-lib"]));
