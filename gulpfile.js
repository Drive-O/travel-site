const gulp = require("gulp"),
watch = require("gulp-watch");

gulp.task("default", function(){
	console.log("Default Task is running"); //!
})
gulp.task("change", function(){
	console.log("Change commited!");
})

gulp.task("watch", function(){
	watch("./app/index.html", function(){
		gulp.start("change");
	});
})