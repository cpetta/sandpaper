# Sandpaper

[![Dependencies][david-svg]][david-url] [![Dependabot Status][Dependabot-svg]][Dependabot-url] [![Build Status][travis-ci-svg]][travis-ci-url] [![Coverage Status][coveralls-svg]][coveralls-url] [![FOSSA Status][FOSSA-svg]][FOSSA-url] [![XO code style][xo-svg]][xo-url] [![semantic-release][semantic-release-svg]][semantic-release-url] [![Total alerts][LGTM-svg]][LGTM-url]

## What is Sandpaper

* Sandpaper is a command line tool that's used to smooth out the rough edges when coding websites using HTML, CSS, and JavaScript.
* Heavily inspired by XO, Sandpaper is a build system wrapper. It originally started as a gulpfile and has since been updated to use the commandline.

## Primary Project Goals

* Provide tools to help developers avoid common errors in HTML, CSS, and JavaScript.
* Improve maintainability of code produced by developers.
* Improve performance of webpages.
* Automate common development tasks.

### How Sandpaper helps achieve these goals

* `sandpaper --lint` can be used to check for syntax errors, style errors, and other common problems in HTML, CSS, and JavaScript. Add the `--watch` flag to perform linting on every file save.
* `sandpaper --lint --strict` is used to check for code style problems, keeping code consistently readable across different developers.
* `sandpaper --build` uses minification to reduce the size of HTML, CSS, JavaScript. Additionally, images will be optimized.
* `sandpaper --sync` watches files for changes, and automatically builds and reloads a webserver with your site.

## Installation

`npm install sandpaper -g`

from your project folder which contains an /src folder run:

`npm init sandpaper`

## Workflow

1. Create and edit all your .html, .css, and .js files inside a folder named `src`.
2. Open command prompt above the `src` folder, for instance, if you have `/SomeProject/src` open command prompt in the `/SomeProject` folder.
3. Run the `sandpaper` command with your desired flags. all available flags are listed under [flags]

* Note: Running sandpaper with no flags is equivlent to running sandpaper --

## Flags

`--lint`
Check code for errors.

`--build`
Optimize code and save to /dev or /dist (if --production is specified.)

`--sync`
Start browser synchronized server, compiles code on change.

`--strict`
Lint codding style in addition to errors.

`--fix`
fixes coding style issues, such as tabs/spaces, indentation, and css property order.

`--watch`
Remain running, re-lint or re-build whenever a file is changed.

`--prod`
Build for production, do not include source maps and minify code.

## Sandpaper would not be possible without these great open-source libraries

* [gulp][gulp-url]
* [meow][meow-url]
* [browserSync][browserSync-url]

### Libraries used for linting

* [htmlhint][htmlhint-url]
* [htmlhint-stylish][htmlhint-stylish-url]
* [stylelint][stylelint-url]
* [postcss][postcss-url]
* [postcss-reporter][postcss-reporter-url]
* [markdownlint][markdownlint-url]

if `--strict` flag is **not** specified

* [jshint][jshint-url]
* [jshint-more-stylish][jshint-more-stylish-url]

if `--strict` flag is specified

* [eslint][eslint-url]
* [XO][xo-url]
* [unified][unified-url]
* [rehype-parse][rehype-parse-url]
* [rehype-stringify][rehype-stringify-url]
* [rehype-retext][rehype-retext-url]
* [remark-retext][rehype-retext-url]
* [unified-engine-gulp][unified-engine-gulp-url]
* [retext-english][retext-english-url]
* [retext-contractions][retext-contractions-url]
* [retext-indefinite-article][retext-indefinite-article-url]
* [retext-passive][retext-passive-url]
* [retext-quotes][retext-quotes-url]
* [retext-repeated-words][retext-repeated-words-url]
* [retext-sentence-spacing][retext-sentence-spacing-url]
* [retext-redundant-acronyms][retext-redundant-acronyms-url]

### Libraries used for building

* [autoprefixer][autoprefixer-url]
* [cssnano][cssnano-url]
* [gulp-cache][gulp-cache-url]
* [gulp-changed][gulp-changed-url]
* [gulp-htmlmin][gulp-htmlmin-url]
* [gulp-html-postcss][gulp-html-postcss-url]
* [gulp-if][gulp-if-url]
* [gulp-imagemin][gulp-imagemin-url]
* [gulp-uglify][gulp-uglify-url]
* [gulp-zip][gulp-zip-url]
* [node-css-mqpacker][node-css-mqpacker-url]
* [postcss][postcss-url]
* [postcss-unprefix][postcss-unprefix-url]
* [postcss-reporter][postcss-reporter-url]
* [postcss-preset-env][postcss-preset-env-url]
* [pump][pump-url]
* [through2][through2-url]

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcpetta%2Fsandpaper.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcpetta%2Fsandpaper?ref=badge_large)

[releases]: https://github.com/cpetta/sandpaper/releases
[david-svg]: https://david-dm.org/cpetta/sandpaper.svg
[david-url]: https://david-dm.org/cpetta/sandpaper
[travis-ci-svg]: https://travis-ci.org/cpetta/sandpaper.svg?branch=master
[travis-ci-url]: https://travis-ci.org/cpetta/sandpaper
[coveralls-svg]: https://coveralls.io/repos/github/cpetta/sandpaper/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/cpetta/sandpaper?branch=master
[Dependabot-svg]: https://api.dependabot.com/badges/status?host=github&repo=cpetta/sandpaper
[Dependabot-url]: https://dependabot.com
[FOSSA-svg]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcpetta%2Fsandpaper.svg?type=shield
[FOSSA-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fcpetta%2Fsandpaper?ref=badge_shield
[xo-svg]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/xojs/xo
[semantic-release-svg]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[LGTM-svg]: https://img.shields.io/lgtm/alerts/g/cpetta/sandpaper.svg?logo=lgtm&logoWidth=18
[LGTM-url]: https://lgtm.com/projects/g/cpetta/sandpaper/alerts/
[gulp-url]: https://gulpjs.com/
[meow-url]: https://github.com/sindresorhus/meow

[eslint-url]: https://github.com/eslint/eslint
[htmlhint-url]: https://github.com/htmlhint/HTMLHint
[htmlhint-stylish-url]: https://github.com/doshprompt/htmlhint-stylish
[stylelint-url]: https://github.com/stylelint/stylelint
[postcss-url]: https://github.com/postcss/postcss
[postcss-reporter-url]: https://github.com/postcss/postcss-reporter
[jshint-url]: https://github.com/jshint/jshint
[jshint-more-stylish-url]: https://github.com/catdad/jshint-more-stylish
[markdownlint-url]: https://github.com/DavidAnson/markdownlint
[unified-url]: https://github.com/unifiedjs/unified
[remark-retext-url]: https://github.com/remarkjs/remark-retext
[unified-url]: https://github.com/unifiedjs/unified
[rehype-parse-url]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse
[rehype-stringify-url]: https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify
[rehype-retext-url]: https://github.com/rehypejs/rehype-retext
[remark-retext-url]: https://github.com/remarkjs/remark-retext
[unified-engine-gulp-url]: https://github.com/unifiedjs/unified-engine-gulp
[retext-english-url]: https://github.com/retextjs/retext/tree/master/packages/retext-english
[retext-contractions-url]: https://github.com/retextjs/retext-contractions
[retext-indefinite-article-url]: https://github.com/retextjs/retext-indefinite-article
[retext-passive-url]: https://github.com/retextjs/retext-passive
[retext-quotes-url]: https://github.com/retextjs/retext-quotes
[retext-repeated-words-url]: https://github.com/retextjs/retext-repeated-words
[retext-sentence-spacing-url]: https://github.com/retextjs/retext-sentence-spacing
[retext-redundant-acronyms-url]: https://github.com/retextjs/retext-redundant-acronyms

[autoprefixer-url]: https://github.com/postcss/autoprefixer
[browserSync-url]: https://github.com/Browsersync/browser-sync
[cssnano-url]: https://github.com/cssnano/cssnano
[gulp-cache-url]: https://www.npmjs.com/package/gulp-cache
[gulp-changed-url]: https://github.com/sindresorhus/gulp-changed
[gulp-htmlmin-url]: https://github.com/jonschlinkert/gulp-htmlmin
[gulp-html-postcss-url]: https://github.com/StartPolymer/gulp-html-postcss
[gulp-if-url]: https://github.com/robrich/gulp-if
[gulp-imagemin-url]: https://github.com/sindresorhus/gulp-imagemin
[gulp-uglify-url]: https://github.com/terinjokes/gulp-uglify
[gulp-zip-url]: https://github.com/sindresorhus/gulp-zip
[node-css-mqpacker-url]: https://github.com/hail2u/node-css-mqpacker
[postcss-unprefix-url]: https://www.npmjs.com/package/postcss-unprefix
[postcss-reporter-url]: https://github.com/postcss/postcss-reporter
[postcss-preset-env-url]: https://github.com/csstools/postcss-preset-env
[pump-url]: https://github.com/mafintosh/pump
[through2-url]: https://github.com/rvagg/through2
