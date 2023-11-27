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
      on('after:run', () => {
        report.generate({
          jsonDir: 'cypress/reports/cucumber-json',//path of json file
          reportPath: 'cypress/reports'// path of reports
        });
      });
      on('file:preprocessor', cucumber())
      return fetchConfigurationByFile(config.env.configFile || "qa") || config;  //qa will be the default env if not mentioned.
    },
    specPattern: "cypress/e2e/consumer/customSpecOrder.js", //will refer the featurefiles steps
  }
}
);
