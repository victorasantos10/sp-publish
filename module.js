const spsave = require('spsave').spsave;
const util = require("util");
const findUp = require("find-up")
const fs = require("fs");
const os = require("os");
const prompt = require("prompt");
const schema = require("./schema");
const path = require("path");
const chalk = require('chalk');

var args = process.argv.slice(2);
const CONFIG_FILE_NAME = 'sp-publish-config.json';

module.exports = (async () => {
    prompt.start();
    prompt.get(schema, promptFinished);
})();

/**
 * After user has inserted the credentials.
 *
 * @param {any} err - Error object.
 * @param {any} result - Object containing the credentials.
 */
function promptFinished(err, result) {

    if (err) {
        errorHandler("Error while prompting credentials.");
    }

    if (!args || !args.length)
        errorHandler("Parameter not found. You need to call 'sp-publish --<environment-name>' where <environment-name> should be a name which matches " + CONFIG_FILE_NAME + "'s " + chalk.blue("environment") + " key.");

    const credentials = {
        username: result.username,
        password: result.password
    }

    const pathFound = findUp.sync(CONFIG_FILE_NAME);

    if (!pathFound) {
        errorHandler("File " + CONFIG_FILE_NAME + " not found. It should be in the root of your project. Refer to https://github.com/victorasantos10/sp-publish to info about correct JSON file format.");
    }

    const jsonContent = fs.readFileSync(pathFound, "utf8");
    if (!jsonContent)
        errorHandler("Error reading " + CONFIG_FILE_NAME + " file. Check if the file exists and if it's in the correct format.");

    const parsed = JSON.parse(jsonContent);
    var environment = Object.keys(parsed.environments).filter(value => value === args[0].replace(/-/g, ""));

    environment = parsed.environments[environment];

    if (!environment)
        errorHandler("Environment doesn't match " + CONFIG_FILE_NAME + " environments");

    spsave(environment.coreOpts, credentials, environment.fileOpts)
        .then(successSpSave)
        .catch(errorSpSave);
}

/**
 * Error handler.
 *
 * @param {any} errorMessageParam - Error message.
 */
function errorHandler(errorMessageParam) {
    var errorMessage = errorMessageParam || "Error on file upload to library";
    var dateNow = new Date();
    var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
    throw new Error(chalk.blue(dateString) + " " + chalk.red(errorMessage));
}

/**
 * Success handler to spsave.
 *
 * @param {any} data - Data returned from spsave.
 */
function successSpSave() {
    var dateNow = new Date();
    var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
    console.log(dateString + " The files were successfully published.");
}

/**
 * Error handler to spsave.
 *
 * @param {any} err - Error object.
 */
function errorSpSave(err) {
    errorHandler(err.message);
}