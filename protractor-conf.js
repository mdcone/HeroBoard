exports.config = {
    baseUrl: 'http://localhost:9001',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'cucumber',
    specs: [
        'features/*.feature'
    ],
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',
        'phantomjs.cli.args': '--debug=true --webdriver --webdriver-logfile=webdriver.log --webdriver-loglevel=DEBUG',
        version: '',
        platform: 'ANY'
    },
    cucumberOpts: {
        require: 'features/steps/*_steps.js',
        format: 'pretty'
    }
}
