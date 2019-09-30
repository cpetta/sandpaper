#!/usr/bin/env node
'use strict';
const meow = require('meow');
const gulpfile = require('./gulpfile.js');

const cli = meow(`
	Usage
	  $ sandpaper <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ sandpaper unicorns --rainbow
	  🌈 unicorns 🌈
`, {
	flags: {
		rainbow: {
			type: 'boolean',
			alias: 'r'
		}
	}
});
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

gulpfile.buildDev(); // (cli.input[0], cli.flags);

function lintstrict() {
	return new Promise((resolve => {
	/*
	If(args[0] != null)
	{
		workingDirectory = args[0]
	}
	*/
		resolve();
	}));
}
