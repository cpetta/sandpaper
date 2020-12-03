'use strict';
const path = require('path');

const config = {
	extends: path.resolve('./node_modules/stylelint-config-standard/'),
	plugins: [
		path.resolve('/node_modules/stylelint-order/')
	],
	rules: {
		'order/order': [
			'custom-properties',
			'declarations'
		],
		'order/properties-alphabetical-order': true,
		indentation: 'tab'
	}
};

exports.config = config;
