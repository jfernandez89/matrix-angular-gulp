var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Starts a server serving from development environment.
 */
module.exports = {
  dep: ['build:dev'],
  fn: function (gulp, done) {
    global.environment = 'dev';
    if (args.analyze) {
      plugins.sequence('analyze', 'serve:base', done);
    } else {
      plugins.sequence('serve:base', done);
    }
  }
};
