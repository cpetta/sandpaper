'use strict';

const config = {
	extends: __dirname + '/node_modules/stylelint-config-standard/',
	plugins: [
		__dirname + '/node_modules/stylelint-order/'
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
