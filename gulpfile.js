/*
Tutorials
	https://www.smashingmagazine.com/2014/06/building-with-gulp/
	https://github.com/osscafe/gulp-cheatsheet
	https://www.youtube.com/watch?v=dwSLFai8ovQ
	https://css-tricks.com/bem-101/

Useful information
	https://www.npmjs.com/package/glob	// handling files and folders
	https://semver.org/					// versioning spec
	https://caniuse.com/#compare=firefox+60,chrome+66

Things to check out
	scss
	ruby on rails
	babel
	webpack
	https://github.com/postcss/postcss
	https://www.npmjs.com/package/gulp-bump

Post CSS information 
	https://github.com/postcss/gulp-postcss
	https://www.postcss.parts/
	https://github.com/postcss/postcss#plugins
	https://github.com/anandthakker/doiuse
	https://stylelint.io/user-guide/example-config/
	https://github.com/lahmatiy/postcss-csso
*/

const mkDir = require('make-dir');
const del = require('del');
const gulp = require('gulp');
//const include = require('gulp-include');
const gulpif = require('gulp-if');	// https://www.npmjs.com/package/gulp-if
const pump = require('pump');
const changed = require('gulp-changed');
const cache = require('gulp-cache');
const sourcemaps = require('gulp-sourcemaps');
//const concat = require('gulp-concat');
//const csso = require('gulp-csso');	// https://www.npmjs.com/package/csso
const htmlmin = require('gulp-htmlmin');
const uglify = require('uglify-js');
const composer = require('gulp-uglify/composer');
//const babel = require('gulp-babel');
const typescript = require('gulp-typescript');
const tslint = require('gulp-tslint');
const jshint = require('gulp-jshint');	// https://github.com/jshint/jshint
const htmlhint = require('gulp-htmlhint');
const imagemin = require('gulp-imagemin');
const imageminPngout = require('imagemin-pngout');
const inlinesource = require('gulp-inline-source');	// https://www.npmjs.com/package/gulp-inline-source
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');	// https://www.npmjs.com/package/gulp-postcss
const mqpacker = require("css-mqpacker");
const presetEnv = require('postcss-preset-env');	// https://github.com/csstools/postcss-preset-env
const unprefix = require("postcss-unprefix");	// https://github.com/gucong3000/postcss-unprefix
const autoprefixer = require('autoprefixer');	// https://github.com/postcss/autoprefixer
const cssnano = require('cssnano');	// https://www.npmjs.com/package/cssnano
const stylelint = require("stylelint");	// https://stylelint.io/
const postcssReporter = require("postcss-reporter");
// npm install --save-dev stylelint-config-standard	// https://github.com/stylelint/stylelint-config-standard
// npm install --save-dev stylelint-order  		// https://github.com/hudochenkov/stylelint-order
const postCSSinHTML = require('gulp-html-postcss');

const zip = require('gulp-zip');

const composerUglify = composer(uglify, console);

const ProjectName = "gulp-default-project-name";
const currentTime = Date.now;
var includeSourceMap = false;
var staging = true;
const targetBrowsers = 'last 2 versions';
const landingPage = "index.html";
const ZipName = ProjectName + " - " + currentTime;
var pluginsPostCSS = [
		mqpacker(),
		presetEnv({stage: 2, /* stage 0 - 4*/ browsers: targetBrowsers}),
		unprefix(),
		autoprefixer({browsers: targetBrowsers}),
		cssnano(),
	];

var uglifyjsOptions = {};

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
		//.pipe(include()).on('error', console.log)
		//.pipe(concat('sandbox.css'))
		//.pipe(csso())
		.pipe(postcss(pluginsPostCSS))
		.pipe(gulpif(includeSourceMap, sourcemaps.write('../maps')))
		.pipe(gulp.dest(gulpif(staging, paths.stage.css, paths.rel.css)))
		.pipe(browserSync.stream());
}

function compileHTML() {
	return gulp.src(paths.dev.html)
		.pipe(changed(gulpif(staging, paths.stage.html, paths.rel.html)))
		//.pipe(include()).on('error', console.log)
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
/*	supposed to be faster, but it has funky error messages that are hard to read.

function compileTS() {
	return pump(
		gulp.src(paths.dev.ts),
		gulpif(includeSourceMap, sourcemaps.init()),
		typescript(
		{
			//isolatedModules: true,
			//experimentalAsyncFunctions: true,
			//target: 'ES6', //'ES3' (default), 'ES5' or 'ES6'.
		}),
		//.pipe(uglify())
		gulpif(includeSourceMap, sourcemaps.write('../maps')),
		gulp.dest(gulpif(staging, paths.stage.js, paths.rel.js)),
		browserSync.stream(),
		function(err){if(err)console.log(err)})
}
*/

function uglifyjs(cb) {
	return pump(
		[
			gulp.src(paths.dev.js),
			changed(gulpif(staging, paths.stage.js, paths.rel.js)),
			gulpif(includeSourceMap, sourcemaps.init()),
			//include().on('error', console.log),
			//babel({presets: ['env']}),
			composerUglify(uglifyjsOptions),
			gulpif(includeSourceMap, sourcemaps.write('../maps')),
			gulp.dest(gulpif(staging, paths.stage.js, paths.rel.js)),
		], 
		browserSync.stream(),
		function(err){if(err)console.log(err)},
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
		//.pipe(include()).on('error', console.log)
		.pipe(postcss(pluginsPostCSSlint));
}
function lintjs() {
	return gulp.src(paths.dev.js)
		//.pipe(include()).on('error', console.log)
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
exports.clean = clean;
exports.includeSourceMaps = includeSourceMaps;
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

var stage = gulp.series(
	gulp.parallel(
		//clean,
		includeSourceMaps
	),
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

var release = gulp.series(
	gulp.parallel(
		clean,
		releaseMode
	),
	gulp.parallel(
		compileCSS,
		compileHTML,
		uglifyjs,
		compileTS,
		optamizeImages,
		copyAssets,
		//zipDev
	),
	gulp.series(
		linthtml,
		lintcss,
		lintjs,
		lintts
	)
);

var lint = gulp.series(linthtml, lintcss, lintjs, lintts);
var clean = gulp.series(clean);
var test = gulp.series(includeSourceMaps, uglifyjs);

gulp.task('default', stage);
gulp.task('rel', release);
gulp.task('lint', lint);
gulp.task('clean', clean);
gulp.task('test', test);
gulp.task('zip', zipDev);

gulp.task('watch', function() {
	gulp.watch(paths.dev.html, compileHTML);
	gulp.watch(paths.dev.css, compileCSS);
	gulp.watch(paths.dev.js, uglifyjs);
	gulp.watch(paths.dev.ts, compileTS);
	gulp.watch(paths.dev.images, optamizeImages);
	gulp.watch(paths.dev.leftovers, copyAssets);
});

gulp.task('watchlint', function() {
	gulp.watch(paths.dev.html, linthtml);
	gulp.watch(paths.dev.css, lintcss);
	gulp.watch(paths.dev.js, lintjs);
	gulp.watch(paths.dev.ts, lintts);
});

gulp.task('sync', 
	gulp.series(
		stage, 
		function() {
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
	)
);
