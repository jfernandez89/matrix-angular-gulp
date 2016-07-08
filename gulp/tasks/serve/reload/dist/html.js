var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Reloads the dev server with the new files.
 */
module.exports = {
  dep: ['build:minify:html', 'build:minify:js', 'injectJs'],
  fn: function (gulp, done) {
    return gulp
      .src(config.paths.html.dest)
      .pipe(plugins.connect.reload());
  }
};
