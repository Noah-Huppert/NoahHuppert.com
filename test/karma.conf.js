// Karma configuration
// Generated on Sat Dec 20 2014 13:25:20 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "../",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],


    // list of files / patterns to load in the browser
    files: [
      "http://underscorejs.org/underscore-min.js",
      "http://code.jquery.com/jquery-1.11.0.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js",
      "libs/marked/lib/marked.js",
      "build/scripts/javascript/main.js",
      "test/javascript/**/*"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "build/scripts/javascript/main.js": ["coverage"]
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "coverage"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["PhantomJS"],//browsers: ["Chrome", "ChromeCanary", "Firefox", "IE", "PhantomJS"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    proxies: {
      "/data/": "build/data/"
    },

    coverageReporter: {
      "dir": "test/coverage/",
      reporters: [
        { type: "lcov", subdir: "lcov" },
        { type: "html", subdir: "html" }
      ]
    }
  });
};
