module.exports = function () {

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
      dev: assetsFolder + 'sass/**/*.s+(a|c)ss',
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
    less: {
      dest: './assets/styles/',
      dev: './assets/less/**/*.less',
      fileName: 'styles.css'
    },
    js: {
      base: 'scripts',
      dev: scriptsFolder + '**/*.js',
      dest: distFolder + 'scripts'
    }
  };

  config.node = {
    devEnvFolder: scriptsFolder,
    devIndex: './index.html',
    distEnvFolder: distFolder,
    distIndex: './index.html',
    options: {
      script: server + 'app.js',
      delayTime: 1,
      watch: [server]
    }
  };

  config.plato = {
    dest: './reports/plato',
    options: {
      title: 'Plato report'
    }
  };

  config.server = {
    dev: {
      root: './',
      livereload: true,
    },
    dist: {
      root: distFolder,
    }
  }

  //Allows to change between sass or less framework
  config.style = {
    framework: 'sass'
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
