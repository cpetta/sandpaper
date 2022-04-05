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

import * as fs from "node:fs";
import path from "node:path";
import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import cache from "gulp-cache";
import changed from "gulp-changed";
import changedInPlace from "gulp-changed-in-place";
import composer from "gulp-uglify/composer.js";
import doiuse from "doiuse";
import eslint from "gulp-eslint7";
import gulp from "gulp";
import gulpif from "gulp-if";
import cleanCss from "gulp-clean-css";
import htmlhint from "gulp-htmlhint";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import jshint from "gulp-jshint";
import postcss from "gulp-postcss";
import postcsssafeparser from "postcss-safe-parser";
import postcssColorGuard from "colorguard";
import postCSSinHTML from "gulp-html-postcss";
import postcssReporter from "postcss-reporter";
/* Removed until updated to support PostCss^8.0.0
import postcssNormalize from 'postcss-normalize'; */
import presetEnv from "postcss-preset-env";
import pump from "pump";
import purgecss from "gulp-purgecss";
import stylelint from "stylelint";
import gulpStylelint from "gulp-stylelint";
import stylish from "jshint-more-stylish";
import through2 from "through2";
import tslint from "gulp-tslint";
import typescript from "gulp-typescript";
import uglify from "uglify-js";
import unprefix from "postcss-unprefix";
import zip from "gulp-zip";
import markdownlint from "markdownlint";

// Unified Engine
import * as unified from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import rehype2retext from "rehype-retext";
import remark2retext from "remark-retext";
import * as engine from "unified-engine-gulp";

// Retext Modules
import english from "retext-english";
import contractions from "retext-contractions";
import indefinite from "retext-indefinite-article";
import passive from "retext-passive";
import quotes from "retext-quotes";
import repeated from "retext-repeated-words";
import spacing from "retext-sentence-spacing";
import redundantAcronyms from "retext-redundant-acronyms";

import * as errorsOnlyStylelint from "./errors-only.stylelintrc.js"; //.config;
import * as codingstyleStylelint from "./codingstyle.stylelintrc.js"; //.config;

let SourceMaps = false;
let onlyLintErrors = true;
let staging = true;

const composerUglify = composer(uglify, console);
const currentTime = Date.now;
const landingPage = "index.html";
const ProjectName = "Sandpaper-Project";
const ZipName = ProjectName + " - " + currentTime;

const pluginsPostCSS = [
  presetEnv({ stage: 2 /* Stage 0 - 4 */ }),
  unprefix(),
  autoprefixer(),
  /* Removed until updated to support PostCss^8.0.0
	postcssNormalize({forceImport: 'normalize.css'}) // Breaks CompileHTML
	*/
];

const unifiedPlugins = [
  english,
  contractions,
  indefinite,
  passive,
  redundantAcronyms,
  repeated,
  spacing,
];

const uglifyjsOptions = {};

const workingDirectory = "src";
const paths = {
  // This will likely need to be updated for your project.
  src: {
    all: workingDirectory + "/**/*",
    html: workingDirectory + "/**/*.htm*",
    css: workingDirectory + "/**/*.css",
    js: workingDirectory + "/**/*.js",
    ts: workingDirectory + "/**/*.ts",
    php: workingDirectory + "/**/*.php",
    md: workingDirectory + "/**/*.md",
    images: workingDirectory + "/**/*.+(png|jpg|gif|svg)",
    leftovers:
      "!" + workingDirectory + "/**/*.+(htm*|css|js|ts|png|jpg|gif|svg)", // All files that aren't of the mime type listed above.
  },
  dev: {
    all: "dev",
    html: "dev",
    css: "dev",
    js: "dev",
    ts: "dev",
    php: "dev",
    md: "dev",
    images: "dev",
  },
  prod: {
    all: "dist",
    html: "dist",
    css: "dist",
    js: "dist",
    ts: "dist",
    php: "dist",
    md: "dist",
    images: "dist",
  },
  report: {
    css: "report/css",
  },
  index: landingPage, // The .html file to open when running gulp sync.
  sourcemaps: "./sourcemaps",
};

function getEslintConfigPath() {
  const fileLoc1 = path.resolve(
    "./",
    "node_modules",
    "sandpaper",
    "eslint.config.cjs"
  );
  const fileLoc2 = path.resolve("eslint.config.cjs");
  /* No need to test both paths */
  /* istanbul ignore next */
  return fs.existsSync(fileLoc2) ? fileLoc2.toString() : fileLoc1.toString();
}

function releaseMode() {
  staging = false;
  SourceMaps = false;
  return Promise.resolve("staging");
}

export function errorLint() {
  onlyLintErrors = true;
  return Promise.resolve("errorlint");
}

export async function strictLint() {
  onlyLintErrors = false;
  return Promise.resolve("fullLint");
}

export function includeSourceMaps() {
  staging = true;
  SourceMaps = true;
  return Promise.resolve("SourceMaps");
}

function getPath(condition) {
  /* No need to test both paths */
  /* istanbul ignore next */
  return condition ? paths.dev.all : paths.prod.all;
}

export async function clean(cb) {
  const path = getPath(staging);
  cache.clearAll();
  fs.rmdir(path, { recursive: true }, (cb) => {
    /* istanbul ignore next */
    return cb;
  });
  return cb;
}

export function logWriter(error) {
  if (error === "" || error === undefined || error === null) {
    error = "Empty Error Message";
  }

  if (!fs.existsSync("./logs/")) {
    fs.mkdirSync("./logs/");
  }

  const logfilelocation = `./logs/errorlog_${Date.now()}.txt`;
  console.log(logfilelocation);
  fs.writeFile(logfilelocation, error.toString(), (err) => {
    /* istanbul ignore next */
    if (err) {
      throw err;
    }

    return console.log(
      "Details written to logfile: " + path.resolve(logfilelocation)
    );
  });
  return Promise.resolve();
}

export function copyAssets() {
  return gulp
    .src([paths.src.all, paths.src.leftovers]) // All files that aren't of the mime type listed in paths.rel.leftovers
    .pipe(gulp.dest(gulpif(staging, paths.dev.all, paths.prod.all)));
}

// From https://github.com/doshprompt/htmlhint-stylish/issues/1#issuecomment-251012229
export function htmlReporter(file) {
  return stylish.reporter(
    file.htmlhint.messages.map((errMessage) => ({
      file: path.relative(file.cwd, errMessage.file),
      error: {
        character: errMessage.error.col,
        code: errMessage.error.rule.id,
        line: errMessage.error.line,
        reason: errMessage.error.message,
      },
    }))
  );
}

export function compileCSS() {
  return gulp
    .src(paths.src.css, { sourcemaps: SourceMaps })
    .pipe(changed(gulpif(staging, paths.dev.css, paths.prod.css)))
    .pipe(postcss(pluginsPostCSS))
    .pipe(purgecss({ content: [paths.src.html] }))
    .pipe(cleanCss({ level: 2 }))
    .pipe(
      gulp.dest(gulpif(staging, paths.dev.css, paths.prod.css), {
        sourcemaps: paths.sourcemaps,
      })
    )
    .pipe(browserSync.stream());
}

export function compileHTML() {
  return (async () => {
    pump(
      [
        gulp.src(paths.src.html, { sourcemaps: SourceMaps }),
        changed(gulpif(staging, paths.dev.html, paths.prod.html)),
        postCSSinHTML(pluginsPostCSS),
        htmlmin({
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          html5: true,
          useShortDoctype: true,
        }),
        gulp.dest(gulpif(staging, paths.dev.html, paths.prod.html), {
          sourcemaps: paths.sourcemaps,
        }),
      ],
      (onError) => {
        /* There is no else statement, therefor it will be ignored. */
        /* istanbul ignore else */
        if (onError !== undefined) {
          logWriter(onError.message);
          console.log(
            "CompileHTML experienced an error. \n",
            "The most common cause is a Parse error, fixing linting errors usually fixes parse errors."
          );
          linthtml();
        }
      }
    );
    browserSync.stream();
  })();
}

export function compileTS() {
  return gulp
    .src(paths.src.ts, { sourcemaps: SourceMaps })
    .pipe(
      typescript({
        /* Options that are currently unused
				experimentalAsyncFunctions: true,
				target: 'ES6' // 'ES3' (default), 'ES5' or 'ES6'.
				*/
      })
    )
    .pipe(
      gulp.dest(gulpif(staging, paths.dev.js, paths.prod.js), {
        sourcemaps: paths.sourcemaps,
      })
    )
    .pipe(browserSync.stream());
}

function uglifyjs(cb) {
  return pump(
    [
      gulp.src(paths.src.js, { sourcemaps: SourceMaps }),
      changed(gulpif(staging, paths.dev.js, paths.prod.js)),
      composerUglify(uglifyjsOptions),
      gulp.dest(gulpif(staging, paths.dev.js, paths.prod.js), {
        sourcemaps: paths.sourcemaps,
      }),
    ],
    browserSync.stream(),
    cb
  );
}

function optamizeImages() {
  return gulp
    .src(paths.src.images)
    .pipe(changed(gulpif(staging, paths.dev.html, paths.prod.html)))
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle(
              { interlaced: false },
              { optimizationLevel: gulpif(staging, 1, 3) }
            ), // Optimization level can be 1 - 3
            imagemin.mozjpeg({ progressive: false }),
            imagemin.optipng({ optimizationLevel: gulpif(staging, 1, 7) }), // OptimizationLevel: 0 - 7 (5 is a good tradeoff if 7 takes too long.)
            imagemin.svgo({
              plugins: [
                { cleanupAttrs: true },
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeTitle: true },
                { removeDesc: true },
                { removeUselessDefs: true },
                { removeXMLNS: false }, // Setting this to true will break the image
                { removeEditorsNSData: true },
                { removeEmptyAttrs: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { removeEmptyContainers: true },
                { removeViewBox: true },
                { cleanupEnableBackground: true },
                { minifyStyles: true },
                { convertStyleToAttrs: true },
                { convertColors: true },
                { convertPathData: true },
                { convertTransform: true },
                { removeUnknownsAndDefaults: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeUnusedNS: true },
                { cleanupIDs: true },
                { cleanupNumericValues: true },
                { cleanupListOfValues: true },
                { moveElemsAttrsToGroup: true },
                { moveGroupAttrsToElems: true },
                { collapseGroups: true },
                { removeRasterImages: true },
                { mergePaths: true },
                { convertShapeToPath: true },
              ],
            }),
            /* Should look into using pngout again at some point. */ // imageminPngout()
          ],
          { verbose: true }
        )
      )
    )
    .pipe(gulp.dest(gulpif(staging, paths.dev.images, paths.prod.images)));
}

export function linthtml() {
  if (onlyLintErrors) {
    return gulp
      .src(paths.src.html)
      .pipe(htmlhint())
      .pipe(htmlhint.reporter(htmlReporter));
  }

  // Else
  return gulp
    .src(paths.src.html)
    .pipe(
      htmlhint({
        "alt-require": true,
        "attr-lowercase": true,
        "attr-no-duplication": true,
        "attr-unsafe-chars": true,
        "attr-value-double-quotes": true,
        "attr-value-not-empty": true,
        "doctype-first": true,
        "doctype-html5": true,
        "head-script-disabled": true,
        "href-abs-or-rel": false,
        "id-class-ad-disabled": true,
        "id-unique": true,
        "inline-script-disabled": false,
        "inline-style-disabled": false,
        "space-tab-mixed-disabled": "tab",
        "spec-char-escape": true,
        "src-not-empty": true,
        "style-disabled": false,
        "tag-pair": true,
        "tag-self-close": true,
        "tagname-lowercase": true,
        "title-require": true,
      })
    )
    .pipe(htmlhint.reporter(htmlReporter));
}

export function lintcss() {
  const pluginsPostCSSlint = () => {
    return onlyLintErrors
      ? [
          stylelint({ config: errorsOnlyStylelint }),
          postcssReporter({ clearReportedMessages: true }),
        ]
      : [
          stylelint({ config: codingstyleStylelint }),
          doiuse({
            /* Options */
          }),
          postcssColorGuard({ threshold: 3 }),
          postcssReporter({ clearReportedMessages: true }),
        ];
  };

  return gulp
    .src(paths.src.css)
    .pipe(postcss(pluginsPostCSSlint, { parser: postcsssafeparser }));
}

export function lintjs() {
  if (onlyLintErrors) {
    return gulp.src(paths.src.js).pipe(jshint()).pipe(jshint.reporter(stylish));
  }

  try {
    return gulp
      .src(paths.src.js)
      .pipe(eslint({ configFile: getEslintConfigPath() }))
      .pipe(eslint.format("stylish"));
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
}

export function lintts() {
  return gulp
    .src(paths.src.ts)
    .pipe(tslint({ formatter: "stylish" }))
    .pipe(tslint.report({ emitError: false }));
}

export function lintmd() {
  return gulp.src(paths.src.md, { read: false }).pipe(
    through2.obj((file, enc, next) => {
      markdownlint(
        { files: [workingDirectory + "/" + file.relative] },
        (err, result) => {
          console.dir(result, { colors: true, depth: null });
          next(err, file);
        }
      );
    })
  );
}

export function lintmarkdownContent() {
  return gulp.src(paths.src.md).pipe(
    engine({ name: "gulp-unified", processor: require("unified") })()
      .use(parse)
      .use(
        remark2retext,
        unified().use([unifiedPlugins]).use(quotes, { preferred: "straight" })
      )
      .use(stringify)
  );
}

export function lintHtmlContent() {
  return gulp.src(paths.src.html).pipe(
    engine({ name: "gulp-unified", processor: require("unified") })()
      .use(parse)
      .use(
        rehype2retext,
        unified().use([unifiedPlugins]).use(quotes, { preferred: "straight" })
      )
      .use(stringify)
  );
}

export function zipSrc() {
  return gulp
    .src(paths.src.all)
    .pipe(zip(ZipName))
    .pipe(gulp.dest(paths.prod.all));
}

export function fixjs() {
  try {
    return gulp
      .src(paths.src.js)
      .pipe(eslint({ configFile: getEslintConfigPath(), fix: true }))
      .pipe(gulpif(isFixed, gulp.dest(workingDirectory)));
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }

  function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
  }
}

export function fixcss() {
  return gulp
    .src(paths.src.css)
    .pipe(changedInPlace())
    .pipe(
      gulpStylelint({
        reporters: [{ formatter: "verbose", console: false }],
        failAfterError: false,
        config: codingstyleStylelint,
        fix: true,
      })
    )
    .pipe(gulp.dest(workingDirectory));
}

export function watchfix() {
  gulp.watch(paths.src.css, fixcss);
  gulp.watch(paths.src.js, fixjs);
}

export function watch() {
  gulp.watch(paths.src.html, compileHTML);
  gulp.watch(paths.src.css, compileCSS);
  gulp.watch(paths.src.js, uglifyjs);
  gulp.watch(paths.src.ts, compileTS);
  gulp.watch(paths.src.images, optamizeImages);
  gulp.watch(paths.src.leftovers, copyAssets);
  console.log("Build Watch running, Waiting for file changes.");
  console.log("Press Ctrl + C to end a file watch.");
}

export function watchlint() {
  gulp.watch(paths.src.html, { delay: 500 }, linthtml);
  gulp.watch(paths.src.css, { delay: 500 }, lintcss);
  gulp.watch(paths.src.js, { delay: 500 }, lintjs);
  gulp.watch(paths.src.ts, { delay: 500 }, lintts);
  console.log("Lint Watch running, Waiting for file changes.");
  console.log("Press Ctrl + C to end a file watch.");
}

export function syncBrowsers() {
  const baseDir = getPath(staging);

  browserSync.init({
    server: {
      baseDir,
      index: paths.index,
    },
  });
  gulp.watch(paths.src.html, compileHTML).on("change", browserSync.reload);
  gulp.watch(paths.src.css, compileCSS).on("change", browserSync.reload);
  gulp.watch(paths.src.js, uglifyjs).on("change", browserSync.reload);
  gulp.watch(paths.src.ts, compileTS).on("change", browserSync.reload);
  gulp.watch(paths.src.images, optamizeImages).on("change", browserSync.reload);
  gulp.watch(paths.src.leftovers, copyAssets).on("change", browserSync.reload);
}

function syncStop() {
  browserSync.exit();
}

// Combined functions / jobs

const lint = gulp.series(
  linthtml,
  lintcss,
  lintjs,
  lintts,
  lintmd,
  lintmarkdownContent
);

const batchEverthing = gulp.parallel(
  compileCSS,
  compileHTML,
  uglifyjs,
  compileTS,
  optamizeImages,
  copyAssets
);

export const buildDev = gulp.series(includeSourceMaps, batchEverthing);

export const buildProd = gulp.series(releaseMode, batchEverthing);

export const watchDev = gulp.series(includeSourceMaps, batchEverthing, watch);

export const watchProd = gulp.series(releaseMode, batchEverthing, watch);

export const lintStrict = gulp.series(strictLint, lint, lintHtmlContent);

export const lintErrors = gulp.series(errorLint, lint, lintHtmlContent);

export const syncDev = gulp.series(
  includeSourceMaps,
  batchEverthing,
  syncBrowsers
);

export const syncProd = gulp.series(releaseMode, batchEverthing, syncBrowsers);

export const watchLint = gulp.series(errorLint, lint, watchlint);

export const watchLintStrict = gulp.series(strictLint, lint, watchlint);

export const fixSrc = gulp.series(strictLint, fixjs, fixcss);

export const autoFixSrc = gulp.series(strictLint, fixjs, fixcss, watchfix);

gulp.task("default", buildDev);
gulp.task("prod", buildProd);
gulp.task("lint", lintErrors);
gulp.task("lintstrict", lintStrict);
gulp.task("zip", zipSrc);
gulp.task("syncDev", syncDev);
gulp.task("syncProd", syncProd);
gulp.task("watchlint", watchLint);
gulp.task("watchlintstrict", watchLintStrict);
