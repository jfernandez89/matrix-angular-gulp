module.exports = getConfig();

function getConfig() {

  var distFolder = './dist/';
  var assetsFolder = './assets/';
  var scriptsFolder = './scripts/';
  var server = './server/';

  var config = {};

  config.defaultPort = 7654;

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  }

  config.paths = {
    css: {
      dest: assetsFolder + 'styles/',
      fileName: 'styles.css'
    },
    dist: distFolder,
    devCommons: [],
    fonts: assetsFolder + 'fonts/',
    html: {
      all: ['./**/*.html', '!./node_modules'],
      templates: scriptsFolder + '**/*.html',
      index: './index.html'
    },
    images: assetsFolder + 'img/',
    js: {
      base: 'scripts',
      dev: scriptsFolder + '**/*.js',
      dest: distFolder + 'scripts',
      specs: scriptsFolder + '**/*.spec.js'
    },
    less: {
      dest: './assets/styles/',
      dev: './assets/less/**/*.less',
      fileName: 'styles.css'
    },
    sass: {
      dev: './assets/sass/**/*.s+(a|c)ss',
    },
  };

  config.plato = {
    dest: './reports/plato',
    options: {
      title: 'Plato report'
    }
  };

  config.server = {
    options: {
      dev: {
        root: './',
        livereload: true,
      },
      dist: {
        root: distFolder,
      }
    }
  };

  config.specs = {
    coverage: {
      dir: 'coverage/',
      reporters: [ // possible values: html, lcov, lcovonly, text, text-summary, cobertura, teamcity, json, in-memory
        {type: 'text-summary'},
        {type: 'html'}
      ]
    }
  };

  //Allows to change between sass or less framework
  config.style = {
    framework: 'sass',
    autoprefixerOptions: {browsers: ['last 2 version', '> 5%']}
  };

  config.templateCache = {
    dest: scriptsFolder + 'app/templates/',
    fileName: 'templates.js',
    options: {
      module: 'app.core.templates',
      moduleSystem: 'IIFE',
      root: 'scripts/',
      standalone: true
    }
  }

  return config;
};