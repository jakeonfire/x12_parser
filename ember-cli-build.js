/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    sourcemaps: {
      extensions: ['js', 'css', 'sass', 'coffee']
    }
  });

  app.import('bower_components/babel-polyfill/browser-polyfill.js', { prepend: true });
  app.import('bower_components/pegjs/peg-0.9.0.js');
  app.import('vendor/theme-dashboard/dist/toolkit.js');

  var dashboardTheme = new Funnel('vendor/theme-dashboard', {
    srcDir: '/fonts',
    include: ['*'],
    destDir: '/fonts'
  });

  return app.toTree(dashboardTheme);
};
