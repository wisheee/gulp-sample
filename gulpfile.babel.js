import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
	pug: {
		watch: 'src/**/*.pug',
		src: 'src/*.pug',
		dest: 'build'
	}
};

const pug = () => 
	gulp
		.src(routes.pug.src)
		.pipe(gpug())
		.pipe(gulp.dest(routes.pug.dest));

const clean = () => del([routes.pug.dest]);

const webserver = () => 
	gulp
		.src(routes.pug.dest)
		.pipe(ws({
			livereload: true,
			open: true
		}));

const watch = () =>	gulp.watch(routes.pug.watch, pug);

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);