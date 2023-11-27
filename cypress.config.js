//set up project configuration in this file
const cucumber = require('cypress-cucumber-preprocessor').default
const report = require('multiple-cucumber-html-reporter');
const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require("path");
const fetchConfigurationByFile = (file) => {
  const pathOfConfigurationFile = path.join(process.cwd(), `cypress/env`, `${file}.env`) //path of the env file
  return (
    file && fs.readJson(pathOfConfigurationFile));
};
module.exports = defineConfig({
    video: true,
  e2e: {
    setupNodeEvents (on, config) {
      on('after:run', (results) => {
          // Get the browser parameter from the environment
    const browser = process.env.BROWSER || 'Unknown';

    // Generate the HTML report after the test run
        report.generate({
           metadata: {
        browser: {
          name: 'Browser',
          value: browser,
        },
        // Add more metadata as needed
      },
          jsonDir: 'cypress/reports/cucumber-json',//path of json file
          reportPath: 'cypress/reports'// path of reports
        });
      });
      on('file:preprocessor', cucumber())
      return fetchConfigurationByFile(config.env.configFile || "qa") || config;  //qa will be the default env if not mentioned.
    },
    specPattern: "cypress/e2e/consumer/**/*.feature", //will refer the featurefiles steps
  }
}
);
