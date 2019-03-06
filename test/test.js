const mocha = require('mocha');
const gulpfile = require('../gulpfile.js');

const {describe} = mocha;
const {it} = mocha;

describe('#clean', () => {
	it('should exit without error', () => {
		return gulpfile.clean();
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

describe('#compileHTML', () => {
	it('should exit without error', () => {
		return gulpfile.compileHTML();
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

describe('#zipDev', () => {
	it('should exit without error', () => {
		return gulpfile.zipDev();
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
describe('#sync', () => {
	it('Should start without error', () => {
		return gulpfile.sync();
	});
});
