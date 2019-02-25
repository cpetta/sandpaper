var assert = require('assert');
var gulpfile = require('../gulpfile.js');

describe('#clean', function() {
  it('should exit without error', function() {
    return gulpfile.clean();
  })
});

describe('#ReleaseMode', function() {
  it('should exit without error', function() {
    return gulpfile.releaseMode();
  })
});

describe('#includeSourceMaps', function() {
  it('should exit without error', function() {
    return gulpfile.includeSourceMaps();
  })
});

describe('#copyAssets', function() {
  it('should exit without error', function() {
    return gulpfile.copyAssets();
  })
});

describe('#compileCSS', function() {
  it('should exit without error', function() {
    return gulpfile.compileCSS();
  })
});

describe('#compileHTML', function() {
  it('should exit without error', function() {
    return gulpfile.compileHTML();
  })
});

describe('#compileTS', function() {
  it('should exit without error', function() {
    return gulpfile.compileTS();
  })
});

describe('#uglifyjs', function() {
  it('should exit without error', function() {
    return gulpfile.uglifyjs();
  })
});

describe('#linthtml', function() {
  it('should exit without error', function() {
    return gulpfile.linthtml();
  })
});

describe('#lintcss', function() {
  it('should exit without error', function() {
    return gulpfile.lintcss();
  })
});

describe('#lintjs', function() {
  it('should exit without error', function() {
    return gulpfile.lintjs();
  })
});

describe('#lintts', function() {
  it('should exit without error', function() {
    return gulpfile.lintts();
  })
});

describe('#optamizeImages', function() {
  it('should exit without error', function() {
    return gulpfile.optamizeImages(false);
  })
});

describe('#zipDev', function() {
  it('should exit without error', function() {
    return gulpfile.zipDev();
  })
});

describe('#watch', function() {
  it('Should start without error', function() {
    return gulpfile.watch();
  })
});
describe('#watchlint', function() {
  it('Should start without error', function() {
    return gulpfile.watchlint();
  })
});
describe('#sync', function() {
  it('Should start without error', function() {
    return gulpfile.sync();
  })
});