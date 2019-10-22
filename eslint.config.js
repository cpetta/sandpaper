'use strict';

module.exports = {
	plugins: [
		'no-use-extend-native',
		'unicorn',
		'promise',
		'import',
		'node',
		'eslint-comments'
	],
	extends: [
		'xo',
		'plugin:unicorn/recommended',
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings'
	]
};
