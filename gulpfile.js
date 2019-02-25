/*
Tutorials
	https://www.smashingmagazine.com/2014/06/building-with-gulp/
	https://github.com/osscafe/gulp-cheatsheet
	https://www.youtube.com/watch?v=dwSLFai8ovQ
	https://css-tricks.com/bem-101/

Useful information
	https://www.npmjs.com/package/glob	// handling files and folders
	https://semver.org/					// versioning spec
	https://caniuse.com/#compare
	https://www.npmjs.com/package/gulp-if
	https://github.com/jshint/jshint
	https://www.npmjs.com/package/cssnano
	https://stylelint.io/
	https://github.com/stylelint/stylelint-config-standard
	https://github.com/hudochenkov/stylelint-order
	
Things to check out
	scss
	ruby on rails
	babel
	gulp-concat
	webpack
	imagemin-pngout
	https://github.com/postcss/postcss
	https://www.npmjs.com/package/gulp-bump
	https://www.npmjs.com/package/csso

Post CSS information 
	https://github.com/postcss/gulp-postcss
	https://www.postcss.parts/
	https://github.com/postcss/postcss#plugins
	https://github.com/anandthakker/doiuse
	https://stylelint.io/user-guide/example-config/
	https://github.com/lahmatiy/postcss-csso
	https://www.npmjs.com/package/gulp-postcss
	https://github.com/csstools/postcss-preset-env
	https://github.com/gucong3000/postcss-unprefix
	https://github.com/postcss/autoprefixer
*/

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const changed = require('gulp-changed');
const composer = require('gulp-uglify/composer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlhint = require('gulp-htmlhint');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const mqpacker = require("css-mqpacker");
const postcss = require('gulp-postcss');
const postCSSinHTML = require('gulp-html-postcss');
const postcssReporter = require("postcss-reporter");
const presetEnv = require('postcss-preset-env');
const pump = require('pump');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require("stylelint");
const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const uglify = require('uglify-js');
const unprefix = require("postcss-unprefix");
const zip = require('gulp-zip');

const composerUglify = composer(uglify, console);
const ProjectName = "gulp-default-project-name";
const currentTime = Date.now;
var includeSourceMap = false;
var staging = true;
const targetBrowsers = 'last 2 versions';
const landingPage = "index.html";
const ZipName = ProjectName + " - " + currentTime;
const pluginsPostCSS = [
		mqpacker(),
		presetEnv({stage: 2, /* stage 0 - 4*/ browsers: targetBrowsers}),
		unprefix(),
		autoprefixer({browsers: targetBrowsers}),
		cssnano(),
	];

const uglifyjsOptions = {};

const paths = {		// this will likely need to be updated for your project.
	dev: {
		all: 'dev/**/*',
		html: 'dev/**/*.htm*',
		css: 'dev/**/*.css',
		js: 'dev/**/*.js',
		ts: 'dev/**/*.ts',
		php: 'dev/**/*.php',
		images: 'dev/**/*.+(png|jpg|gif|svg)',
		leftovers: '!dev/**/*.+(htm*|css|js|ts|png|jpg|gif|svg)', // All files that aren't of the mime type listed above.
	},
	stage: {
		all: 'stage',
		html: 'stage',
		css: 'stage',
		js: 'stage',
		ts: 'stage',
		php: 'stage',
		images: 'stage',
	},
	rel: {
		all: 'rel',
		html: 'rel',
		css: 'rel',
		js: 'rel',
		ts: 'rel',
		php: 'rel',
		images: 'rel',
	},
	report: {
		css: 'report/css',
	},
	index: landingPage, // the .html file to open when running gulp sync.
	basedir: './stage',	//the folder that gulp sync loads from.
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function releaseMode(){
	staging = false;
	return Promise.resolve("staging");
}

function includeSourceMaps(){
	includeSourceMap = true;
	return Promise.resolve("SourceMaps");
}

async function clean() {
	cache.clearAll();
	await del(gulpif(staging, paths.stage.all, paths.rel.all));
	await sleep(1000); // wait 1 second to give the disk enough time to delete the old version.
	return Promise.resolve("Cleaned");
}

function copyAssets() {
	return gulp.src([paths.dev.all, paths.dev.leftovers]) // All files that aren't of the mime type listed in paths.rel.leftovers
	.pipe(gulp.dest(gulpif(staging, paths.stage.all, paths.rel.all)));
}

function compileCSS() {
		return gulp.src(paths.dev.css)
		.pipe(changed(gulpif(staging, paths.stage.css, paths.rel.css)))
		.pipe(gulpif(includeSourceMap, sourcemaps.init()))
		.pipe(postcss(pluginsPostCSS))
		.pipe(gulpif(includeSourceMap, sourcemaps.write('../maps')))
		.pipe(gulp.dest(gulpif(staging, paths.stage.css, paths.rel.css)))
		.pipe(browserSync.stream());
}

function compileHTML() {
	return gulp.src(paths.dev.html)
		.pipe(changed(gulpif(staging, paths.stage.html, paths.rel.html)))
		.pipe(postCSSinHTML(pluginsPostCSS))
		.pipe(htmlmin({
			collapseInlineTagWhitespace: true,
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
			removeComments: true,
			html5: true,
			useShortDoctype: true,
		}))
		.pipe(gulp.dest(gulpif(staging, paths.stage.html, paths.rel.html)))
		.pipe(browserSync.stream());
}

function compileTS() {
	return gulp.src(paths.dev.ts)
		.pipe(gulpif(includeSourceMap, sourcemaps.init()))
		.pipe(typescript(
		{
			//experimentalAsyncFunctions: true,
			//target: 'ES6' //'ES3' (default), 'ES5' or 'ES6'.
		}))
		//.pipe(uglify())
		.pipe(gulpif(includeSourceMap, sourcemaps.write('../maps')))
		.pipe(gulp.dest(gulpif(staging, paths.stage.js, paths.rel.js)))
		.pipe(browserSync.stream());
}

function uglifyjs(cb) {
	return pump(
		[
			gulp.src(paths.dev.js),
			changed(gulpif(staging, paths.stage.js, paths.rel.js)),
			gulpif(includeSourceMap, sourcemaps.init()),
			composerUglify(uglifyjsOptions),
			gulpif(includeSourceMap, sourcemaps.write('../maps')),
			gulp.dest(gulpif(staging, paths.stage.js, paths.rel.js)),
		], 
		browserSync.stream(),
		//function(err){if(err)console.log(err)}, // potentially unneeded, don't want to delete yet.
		cb
	);
	
}

function optamizeImages(verboseOutput = true) {
	return gulp.src(paths.dev.images)
		.pipe(changed(gulpif(staging, paths.stage.html, paths.rel.html)))
		.pipe(cache(imagemin([
			imagemin.gifsicle({interlaced: false}, {optimizationLevel: gulpif(staging, 1, 3)}), // optimizationLevel: 1 - 3
			imagemin.jpegtran({progressive: false}),
			imagemin.optipng({optimizationLevel: gulpif(staging, 1, 5)}), // optimizationLevel: 0 - 7 (5 for production is best)
			imagemin.svgo({
				plugins: [
					{cleanupAttrs: true},
					{removeDoctype: true},
					{removeXMLProcInst: true},
					{removeComments: true},
					{removeMetadata: true},
					{removeTitle: true},
					{removeDesc: true},
					{removeUselessDefs: true},
					//{removeXMLNS: true}, //breaks the image
					{removeEditorsNSData: true},
					{removeEmptyAttrs: true},
					{removeHiddenElems: true},
					{removeEmptyText: true},
					{removeEmptyContainers: true},
					{removeViewBox: true},
					{cleanupEnableBackground: true},
					{minifyStyles: true},
					{convertStyleToAttrs: true},
					{convertColors: true},
					{convertPathData: true},
					{convertTransform: true},
					{removeUnknownsAndDefaults: true},
					{removeNonInheritableGroupAttrs: true},
					{removeUselessStrokeAndFill: true},
					{removeUnusedNS: true},
					{cleanupIDs: true},
					{cleanupNumericValues: true},
					{cleanupListOfValues: true},
					{moveElemsAttrsToGroup: true},
					{moveGroupAttrsToElems: true},
					{collapseGroups: true},
					{removeRasterImages: true},
					{mergePaths: true},
					{convertShapeToPath: true},
				]
			}),
			//imageminPngout()
		], {verbose: verboseOutput})))
		.pipe(gulp.dest(gulpif(staging, paths.stage.images, paths.rel.images)));
}

function linthtml() {
	return gulp.src(paths.dev.html)
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
}

function lintcss() {
	var pluginsPostCSSlint = [
		stylelint({ /* your options */ }),
		postcssReporter({ clearReportedMessages: true }),
	];

	return gulp.src(paths.dev.css)
		.pipe(postcss(pluginsPostCSSlint));
}

function lintjs() {
	return gulp.src(paths.dev.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}

function lintts() {
	return gulp.src(paths.dev.ts)
		.pipe(tslint({formatter: "stylish"}))
		.pipe(tslint.report({emitError: false}));
}

function zipDev() {
	return gulp.src(paths.dev.all)
	.pipe(zip(ZipName))
	.pipe(gulp.dest(paths.rel.all));
}

function watch() {
	gulp.watch(paths.dev.html, compileHTML);
	gulp.watch(paths.dev.css, compileCSS);
	gulp.watch(paths.dev.js, uglifyjs);
	gulp.watch(paths.dev.ts, compileTS);
	gulp.watch(paths.dev.images, optamizeImages);
	gulp.watch(paths.dev.leftovers, copyAssets);
}

function watchlint() {
	gulp.watch(paths.dev.html, linthtml);
	gulp.watch(paths.dev.css, lintcss);
	gulp.watch(paths.dev.js, lintjs);
	gulp.watch(paths.dev.ts, lintts);
}

function sync() {
	stage,
	browserSync.init({
		server: {
			baseDir: paths.basedir,
			index: paths.index,
		}
	});	
	gulp.watch(paths.dev.html, compileHTML).on('change', browserSync.reload);
	gulp.watch(paths.dev.css, compileCSS).on('change', browserSync.reload);
	gulp.watch(paths.dev.js, uglifyjs).on('change', browserSync.reload);
	gulp.watch(paths.dev.ts, compileTS).on('change', browserSync.reload);
	gulp.watch(paths.dev.images, optamizeImages).on('change', browserSync.reload);
	gulp.watch(paths.dev.leftovers, copyAssets).on('change', browserSync.reload);
}

exports.clean = clean;
exports.includeSourceMaps = includeSourceMaps;
exports.releaseMode = releaseMode;
exports.copyAssets = copyAssets;
exports.compileCSS = compileCSS;
exports.compileHTML = compileHTML;
exports.compileTS = compileTS;
exports.uglifyjs = uglifyjs;
exports.linthtml = linthtml;
exports.lintcss = lintcss;
exports.lintjs = lintjs;
exports.lintts = lintts;
exports.optamizeImages = optamizeImages;
exports.zipDev = zipDev;
exports.watch = watch;
exports.watchlint = watchlint;
exports.sync = sync;

const stage = gulp.series(
	includeSourceMaps,
	gulp.parallel(
		compileCSS,
		compileHTML,
		uglifyjs,
		compileTS,
		optamizeImages,
		copyAssets
	),
	gulp.series(
		linthtml,
		lintcss,
		lintjs,
		lintts
	)
);

const release = gulp.series(
	releaseMode,
	gulp.parallel(
		compileCSS,
		compileHTML,
		uglifyjs,
		compileTS,
		optamizeImages,
		copyAssets,
	),
	gulp.series(
		linthtml,
		lintcss,
		lintjs,
		lintts
	)
);

const lint = gulp.series(
	linthtml,
	lintcss,
	lintjs,
	lintts
);

gulp.task('default', stage);
gulp.task('rel', release);
gulp.task('lint', lint);
gulp.task('zip', zipDev);