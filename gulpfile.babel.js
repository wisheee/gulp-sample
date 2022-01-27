import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import gimage from "gulp-image";

const routes = {
	pug: {
		watch: 'src/**/*.pug',
		src: 'src/*.pug',
		dest: 'build'
	},
	img: {
		src: 'src/images/*',
		dest: 'build/images'
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

const img = () => 
	gulp
		.src(routes.img.src)
		.pipe(gimage())
		.pipe(gulp.dest(routes.img.dest));

const watch = () =>	{
	gulp.watch(routes.pug.watch, pug);
	gulp.watch(routes.img.src, img);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);