'use strict';

module.exports = {
	parserOptions: {
		ecmaVersion: 12
	},
	env: {
		node: true
	},
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
