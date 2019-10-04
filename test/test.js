const fs = require('fs');
const mocha = require('mocha');
const gulpfile = require('../gulpfile.js');

// The following consts make xo linter happy, comment them out if you want tests to run in VSCode.
const {before} = mocha;
const {after} = mocha;
const {describe} = mocha;
const {it} = mocha;

describe('Testing with data from test/', () => {
	before(() => {
		fs.copyFile('test/test-data/testvaliddata.md', 'src/testvaliddata.md', err => {
			if (err) {
				throw err;
			}
		});
		fs.copyFile('test/test-data/testinvaliddata.html', 'src/testinvaliddata.html', err => {
			if (err) {
				throw err;
			}
		});
		fs.copyFile('test/test-data/testinvaliddata.md', 'src/testinvaliddata.md', err => {
			if (err) {
				throw err;
			}
		});
	});

	describe('#clean', () => {
		it('should exit without error', () => {
			return gulpfile.clean();
		});
	});

	describe('#syncBrowsers Development', () => {
		it('Should start without error', () => {
			return gulpfile.syncBrowsers();
		});
	});

	describe('#logWriter', () => {
		it('Should experience a write error.', () => {
			return gulpfile.logWriter('error message', './nonexistantfolder/');
		});
	});

	describe('#logWriter', () => {
		it('Should write a log file.', () => {
			return gulpfile.logWriter('error message', './logs/');
		});
	});

	describe('#ReleaseMode', () => {
		it('should exit without error', () => {
			return gulpfile.releaseMode();
		});
	});

	describe('#includeSourceMaps', () => {
		it('should exit without error', () => {
			return gulpfile.includeSourceMaps();
		});
	});

	describe('#copyAssets', () => {
		it('should exit without error', () => {
			return gulpfile.copyAssets();
		});
	});

	describe('#compileCSS', () => {
		it('should exit without error', () => {
			return gulpfile.compileCSS();
		});
	});

	describe('#compileHTML - Without Errors', () => {
		it('should exit without error', () => {
			return gulpfile.compileHTML();
		});
	});

	describe('#compileHTML - With Doctype and DOM Errors', () => {
		it('should exit without error', () => {
			return gulpfile.compileHTML('test/test-data/invaliddata2.html');
		});
	});

	describe('#compileTS', () => {
		it('should exit without error', () => {
			return gulpfile.compileTS();
		});
	});

	describe('#uglifyjs', () => {
		it('should exit without error', () => {
			return gulpfile.uglifyjs();
		});
	});

	describe('#linthtml', () => {
		it('should exit without error', () => {
			return gulpfile.linthtml();
		});
	});

	describe('#lintcss', () => {
		it('should exit without error', () => {
			return gulpfile.lintcss();
		});
	});

	describe('#lintjs', () => {
		it('should exit without error', () => {
			return gulpfile.lintjs();
		});
	});

	describe('#lintts', () => {
		it('should exit without error', () => {
			return gulpfile.lintts();
		});
	});

	describe('#linthtml-strict', () => {
		it('should exit without error', () => {
			return gulpfile.strictLint().then(gulpfile.linthtml());
		});
	});

	describe('#lintjs-strict', () => {
		it('should exit without error', () => {
			return gulpfile.strictLint().then(gulpfile.lintjs());
		});
	});

	describe('#lintcss-strict', () => {
		it('should exit without error', () => {
			return gulpfile.strictLint().then(gulpfile.lintcss());
		});
	});

	describe('#optamizeImages', () => {
		it('should exit without error', () => {
			return gulpfile.optamizeImages();
		});
	});

	describe('#zipSrc', () => {
		it('should exit without error', () => {
			return gulpfile.zipSrc();
		});
	});

	describe('#watch', () => {
		it('Should start without error', () => {
			return gulpfile.watch();
		});
	});

	describe('#watchlint', () => {
		it('Should start without error', () => {
			return gulpfile.watchlint();
		});
	});

	describe('#syncBrowsers Production', () => {
		it('Should start without error', () => {
			return gulpfile.releaseMode().then(gulpfile.syncBrowsers());
		});
	});

	describe('#lintHtmlContent', () => {
		it('Should exit without error', () => {
			return gulpfile.lintHtmlContent();
		});
	});

	describe('#lintmd', () => {
		it('Should exit without error', () => {
			return gulpfile.lintmd();
		});
	});

	describe('#lintmarkdownContent', () => {
		it('Should exit without error', () => {
			return gulpfile.lintmarkdownContent();
		});
	});

	describe('#htmlReporter', () => {
		it('Should exit without error', () => {
			return require('gulp').src('src/testinvaliddata.html')
				.pipe(require('gulp-htmlhint')())
				.pipe(require('gulp-htmlhint').reporter(gulpfile.htmlReporter));
		});
	});

	after(() => {
		fs.unlink('src/testinvaliddata.html', err => {
			if (err) {
				throw err;
			}
		});
		fs.unlink('src/testinvaliddata.md', err => {
			if (err) {
				throw err;
			}
		});
		fs.unlink('src/testvaliddata.md', err => {
			if (err) {
				throw err;
			}
		});
	});
});
