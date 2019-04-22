var gulp 	 	 		=  require("gulp"),
	sass 	 	 			=  require("gulp-sass"),
	browSync 	 		= 	require("browser-sync"),
	concat 	 	 		= 	require("gulp-concat"),
	uglify 	 	 		= 	require("gulp-uglify"),
	del 	 	 			= 	require("del"),
	autoprefixer 			= require("gulp-autoprefixer");

gulp.task("sass", function(){
	return gulp.src("app/sass/**/*.scss")
		.pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
		.pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {cascade: true}))
		.pipe(gulp.dest("app/css"))
		.pipe(browSync.reload({stream: true}))
});

gulp.task("scripts", function(){
	gulp.src([
		"libs/jquery/dist/jquery.min.js",
		"libs/jQuery-Mask-Plugin-master/dist/jquery.mask.min.js"
	])
	.pipe(concat("libs.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("app/js"))
});

gulp.task("browSync", function(){
	browSync({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task("watch", ["browSync", "scripts"], function(){
	gulp.watch("app/sass/**/*.scss", ["sass"]);
	gulp.watch("app/*.html", browSync.reload);
	gulp.watch("app/js/**/*.js", browSync.reload);
});

gulp.task("clear", function(){
	return del.sync("dist");
});

gulp.task("build", ["clear", "sass", "scripts"], function(){
	var buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));
	var buildJs = gulp.src("app/js/**/*.js")
		.pipe(gulp.dest("dist/js"));
	var guildHTml = gulp.src("app/*.html")
		.pipe(gulp.dest("dist"));
});


