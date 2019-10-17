#!/usr/bin/env node
'use strict';
const meow = require('meow');
const updateNotifier = require('update-notifier');
const gulpfile = require('./gulpfile.js');
const pkg = require('./package.json');

const cli = meow(`
	Usage
	  $ sandpaper

	Options
		--lint		Check code for errors.
		--build		Optimize code and save to /dev or /dist (if --production is specified.)
		--sync		Start browser syncronized server, compiles code on change.
		--strict	Lint codding style in addition to errors.
		--fixStyle	fixes coding style issues, such as tabs/spaces, indentation, and css property order.
		--watch		Remain running, re-lint or re-build whenever a file is changed.
		--prod		Build for production, Don't include sourcemaps, and minified code.

	Examples
	  $ sandpaper --lint
	  $ sandpaper --build
	  $ sandpaper --sync
	  $ sandpaper --lint --strict --watch
	  $ sandpaper --lint --strict --fixstyle
	  $ sandpaper --build --watch
	  $ sandpaper --build --watch --production
	  $ sandpaper --lint --build --watch --production
	  $ sandpaper --lint --build --sync

`, {
	flags: {
		lint: {
			type: 'boolean',
			default: false
		},
		build: {
			type: 'boolean',
			default: false
		},
		sync: {
			type: 'boolean',
			default: false
		},
		strict: {
			type: 'boolean',
			default: false
		},
		fixStyle: {
			type: 'boolean',
			default: false
		},
		watch: {
			type: 'boolean',
			default: false
		},
		production: {
			type: 'boolean',
			default: false
		}
	}
});

updateNotifier({
	pkg: {
		name: 'sandpaper',
		version: pkg.version
	}
}).notify();

// CLI logic (input handler)

(async () => {
	await Promise.all([
		lint(),
		build(),
		sync(),
		(async () => {
			if (cli.input.length > 0) {
				console.log('Unrecognized input: ' + cli.input + ' use Sandpaper --help for a list of valid inputs.');
			}
		})()
	]);
})();

// Functions for interfacing between CLI logic and program logic.

async function lint() {
	if (cli.flags.lint === true) {
		if (cli.flags.strict === true) {
			if (cli.flags.watch === true) {
				// Lint Strict True, Watch True
				gulpfile.watchLintStrict();
			} else {
				// Lint Strict True, Watch False
				gulpfile.lintStrict();
			}
		} else if (cli.flags.watch === true) {
			// Lint Strict False, Watch True
			gulpfile.watchLint();
		} else {
			// Lint Strict False, Watch False
			gulpfile.lint();
		}

		if (cli.flags.fixStyle === true) {
			// Not implemented yet.
		}
	}
}

async function build() {
	if (cli.flags.build === true && cli.flags.sync === false) {
		if (cli.flags.prod === true) {
			if (cli.flags.watch === true) {
				// Build Production True, Watch True
				gulpfile.watchProd();
			} else {
				// Build Production True, Watch False
				gulpfile.buildProd();
			}
		} else if (cli.flags.watch === true) {
			// Build Production False, Watch True
			gulpfile.watchDev();
		} else {
			// Build Production False, Watch False
			gulpfile.buildDev();
		}
	}
}

async function sync() {
	if (cli.flags.sync === true) {
		if (cli.flags.prod === true) {
			gulpfile.syncProd();
		} else {
			gulpfile.syncDev();
		}
	}
}
