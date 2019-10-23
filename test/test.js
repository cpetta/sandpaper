const fs = require('fs');
const rimraf = require('rimraf');
const mocha = require('mocha');
const gulpfile = require('../gulpfile.js');

// The following consts make xo linter happy, comment them out if you want tests to run in VSCode.
// const {before} = mocha;
const {after} = mocha;
const {describe} = mocha;
const {it} = mocha;

describe('#compileHTML - Without Errors', () => {
	it('should exit without error', () => {
		return gulpfile.compileHTML();
	});
});

describe('#linthtml', () => {
	it('should exit without error', () => {
		return gulpfile.lintErrors();
	});
});

describe('#linthtml-strict', () => {
	it('should exit without error', () => {
		return gulpfile.lintStrict();
	});
});

describe('#lintHtmlContent', () => {
	it('Should exit without error', () => {
		return gulpfile.lintHtmlContent();
	});
});

describe('#htmlReporter', () => {
	it('Should exit without error', () => {
		return require('gulp')
			.src('src/test-data/testinvaliddata.html')
			.pipe(require('gulp-htmlhint')())
			.pipe(require('gulp-htmlhint').reporter(gulpfile.htmlReporter));
	});
});

describe('#clean', () => {
	it('should exit without error', () => {
		return gulpfile.clean();
	});
});

describe('#syncBrowsers', () => {
	it('Should start without error', () => {
		return gulpfile.syncBrowsers();
	});
	after(() => {
		gulpfile.syncStop();
	});
});

describe('#logWriter', () => {
	it('Should experience a write error.', () => {
		return gulpfile.logWriter('error message', './nonexistantfolder/');
	});
});

describe('#logWriter', () => {
	it('Should write a log file. - And create the log/ directory', () => {
		if (fs.existsSync('./logs/')) {
			rimraf('./logs/', () => {});
		}

		return gulpfile.logWriter('error message', './logs/');
	});
});

describe('#logWriter', () => {
	it('Should write a log file. - With an existing log/ directory', () => {
		if (fs.existsSync('./logs/')) {
			rimraf('./logs/', () => {});
		}

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

describe('#lintcss - Errors Only', () => {
	it('should exit without error', () => {
		(async () => {
			try {
				const mode = await gulpfile.errorLint();
				return gulpfile.lintcss(mode);
			} catch (error) {
				return error;
			}
		})();
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

describe('#lintjs-strict', () => {
	it('should exit without error', () => {
		(async () => {
			try {
				const mode = await gulpfile.strictLint();
				return gulpfile.lintjs(mode);
			} catch (error) {
				return error;
			}
		})();
	});
});

describe('#lintcss-strict', () => {
	it('should exit without error', () => {
		(async () => {
			try {
				const mode = await gulpfile.strictLint();
				return gulpfile.lintcss(mode);
			} catch (error) {
				return error;
			}
		})();
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
