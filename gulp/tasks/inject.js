var plugins = require('gulp-load-plugins')({lazy: true});
var mainBowerFiles = require('main-bower-files');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Inject required files depending on the current environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    switch (global.environment) {
      case 'dev':
        utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        return injectDevScripts(gulp);
        break;
      case 'dist':
        utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        return injectDistScripts(gulp);
        break;
      case 'specs':
        utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        return injectSpecScripts(gulp);
        break;
      default:
        utils.logError('This task should not be called on its own. Call build:dist, build: dev or build:specs instead');
        done();
        break;
    }
  }
};

function injectDevScripts(gulp) {
  return gulp
    .src(config.paths.html.index)
    .pipe(injectBowerDependencies(gulp))
    .pipe(injectModules(gulp))
    .pipe(injectCommonScripts(gulp))
    .pipe(gulp.dest('./'));
}

function injectDistScripts(gulp) {
  return gulp
    .src(config.paths.html.index)
    .pipe(plugins.inject(gulp.src(config.paths.js.dest + '/**/*min.js', {read: false}), {ignorePath: 'dist'}))
    .pipe(plugins.inject(gulp.src(config.paths.css.dest + '*min.css', {read: false}), {
      ignorePath: 'dist',
      relative: true
    }))
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.htmlmin(config.htmlmin.options))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
    .pipe(gulp.dest(config.paths.dist));
}

function injectSpecScripts(gulp) {
  return gulp
    .src(config.specs.specsFilePath)
    .pipe(injectBowerDependencies(gulp, true))
    .pipe(injectModules(gulp))
    .pipe(injectCommonScripts(gulp))
    .pipe(injectSpecs(gulp))
    .pipe(gulp.dest('./'));
}

function injectBowerDependencies(gulp, includeDev) {
  return plugins.inject(gulp.src(mainBowerFiles({includeDev: includeDev}), {read: false}), {name: 'bower'});
}

function injectModules(gulp) {
  return plugins.inject(
    gulp
      .src(config.paths.js.modules)
      .pipe(plugins.angularFilesort()), {name: 'modules'}
  );
}

function injectCommonScripts(gulp) {
  return plugins.inject(
    gulp
      .src([config.paths.js.dev, '!' + config.paths.js.specs, '!' + config.paths.js.modules])
      .pipe(plugins.angularFilesort())
  );
}

function injectSpecs(gulp) {
  return plugins.inject(
    gulp
      .src(config.paths.js.specs)
      .pipe(plugins.angularFilesort()), {name: 'specs'}
  );
}
