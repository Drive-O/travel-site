const gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
prefix = require("autoprefixer"),
imports = require("postcss-import"),
nesting = require("postcss-nesting"),
vars = require("postcss-simple-vars"),
browserSync = require("browser-sync").create(); //just import the method create

gulp.task("default", function(){
	console.log("Default Task is running"); //!
})

gulp.task("css", function(){
	return gulp.src("./app/assets/styles/styles.css")
	.pipe(postcss([imports, prefix, nesting, vars]))
	.on("error", function(errorInfo){
		console.log(errorInfo.toString());
		this.emit("end"); //Error Handling
	})
	.pipe(gulp.dest("./app/temp/styles/"));
})

gulp.task("watch", function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	watch('./app/index.html', function(){
		browserSync.reload();
	});

	watch("./app/assets/styles/**/*.css", function(){
		gulp.start("cssInject");
	});
})

gulp.task("cssInject", ["css"], function(){ //[dependencies] -> cssInject wont start before the dependencies are running
	return gulp.src("./app/temp/styles/styles.css")
	.pipe(browserSync.stream());
});