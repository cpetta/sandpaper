# Cpetta's Sandpaper

[![Dependencies][david-svg]][david-url] [![Dependabot Status][Dependabot-svg]][Dependabot-url] [![Build Status][travis-ci-svg]][travis-ci-url] [![Coverage Status][coveralls-svg]][coveralls-url] [![FOSSA Status][FOSSA-svg]][FOSSA-url] [![XO code style][xo-svg]][xo-url]

## Primary Project Goals

* Provide tools to help developers avoid common errors in HTML, CSS, and JavaScript.
* Improve maintainability of code produced by developers.
* Improve performance of webpages.
* Automate the development enviroment setup process.
* Automate common development tasks.

## Secondary Project Purposes

* Enable the use of additional languages such as typescript, scss, sass, etc.

For your safety and security, please **review scripts before running them**.
setup.ps1 starts by installing chocolaty.
After Chocolaty is installed, it is used to install the following software by default:

* Git
* NodeJS
* Yarn

The Chocolaty function in setup.ps1 can be configured to install the following packages if they are uncommented:

* NotepadPlusPlus
* bitnami-xampp
* Firefox
* Google Chrome
* FileZilla

## Installation

Head on over to [releases] and follow the installation instructions there.

## Basic Workflow

1. Develop a website.
2. Copy the website and all files/folders into the dev folder
3. Open command prompt in this location using the steps outlined above.
4. Run one of the tasks outlined below by typing "gulp [taskname]" replacing [taskname] with the task you want to run.

## Workflow for Development

1. Create and edit all your .html, .css, and .js files in the dev folder.
	* Files can be in any number of sub-folders and can be organized in any way.
2. When you begin editing code, run "gulp sync"
3. On each save [gulp] should run and update your page in the browser.

## Workflow for Release

1. Create and edit all your .html, .css, and .js files in the dev folder
	* Files can be in any number of sub-folders and can be organized in any way.
2. When your done editing code, run "gulp rel"
3. Upload the files from the rel folder to your webserver.

## This gulpfile has the following tasks available

1. default
2. rel
3. lint
4. clean
5. watch
6. watchlint
7. sync

### 1. gulp (default)

This task

* Sets the sourcemap flag
* Processes CSS
* Processes HTML
* Processes JavaScript
* Processes Typescript
* Optimizes Images (.svg, .png, .jpg, .gif)
* Copies any remaining files to the "stage" folder
* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript

### 2. gulp rel

This task

* Deletes the rel folder
* Sets the release flag
* Processes CSS
* Processes HTML
* Processes JavaScript
* Processes Typescript
* Optimizes Images (.svg, .png, .jpg, .gif)
* Copies any remaining files to the "rel" folder
* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript

### 3. gulp lint

This task

* Lints HTML
* Lints CSS
* Lints JavaScript
* Lints Typescript

### 4. gulp clean

This task deletes the "stage" folder.

### 5. gulp watch

This task will run indefinitely until the command prompt is ether closed or the user presses ctrl + c.
When a file is changed between the "dev" folder and the "stage" folder, it will process it.
for instance if I make a change to a css file, and hit save, that change will be carried over to the "stage" folder.

### 6. gulp watchlint

This task will watch for files changing similar to "gulp watch", but instead of processing them, it will output a lint report.

### 7. gulp sync

This task is the same as gulp watch, but in addition, it runs a webserver on port 3000.
dev/index.html will open in the browser, and if any file in the "dev" folder changes, it will be processed. After which, the browser will automatically reload to reflect the change.
Additionally, when multiple browsers or devices connect to the web server, then scrolling, clicking, and typing are all duplicated across instances.

## Development Enviroment Setup

Want to help with the development of Sandpaper or, like living on the edge, using the latest dependency versions?

1. Download setup.ps1
2. Review the code in setup.ps1
3. Place setup.ps1 in the directory that you would like to install Sandpaper
4. Launch Powershell as an administrator in the same folder as setup.ps1
5. run the following command `Set-ExecutionPolicy Bypass -Scope Process -Force; .\setup.ps1`

Feedback and suggestions for improvments are welcome.

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
