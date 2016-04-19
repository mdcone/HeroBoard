module.exports = function (config) {
    config.set({

// base path, that will be used to resolve files and exclude
        basePath: '',

// list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/services/*.js',
            'app/components/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

// list of files to exclude
        exclude: [],

        frameworks: ['jasmine'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
        ],

// test results reporter to use
// possible values: dots || progress || growl
        reporters: ['progress'],

// web server port
        port: 8080,

// cli runner port
        runnerPort: 9100,

// enable / disable colors in the output (reporters and logs)
        colors: true,

        autoWatch: false,

        browsers: ['Chrome'],

// If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
