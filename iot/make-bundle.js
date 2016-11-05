const fs = require('fs');
const browserify = require('browserify');

browserify('./index.js')
  .transform('babelify', { presets: ['es2015'] })
  .transform({ global: true }, 'uglifyify')
  .bundle()
  .pipe(fs.createWriteStream('bundle.js'));