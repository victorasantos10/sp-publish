const spsave = require('spsave').spsave;
const util = require("util");
const findUp = require("find-up")
const fs = require("fs");
const inquirer = require("./inquirer");
const path = require("path");

var args = process.argv.slice(2);

const main = (async () => {
    const CONFIG_FILE_NAME = 'sp-publish-config.json';
    const credentials = await inquirer.askSharepointCredentials();

    const pathFound = await findUp(CONFIG_FILE_NAME);

    if(!pathFound){
        errorHandler("File " + CONFIG_FILE_NAME + " not found. \
        It should be in the root of your project.");
    }

    if (!args || !args.length)
    errorHandler("Parameters not found. You need to call 'sp-publish --<environment-name>' \
                 where <environment-name> should be a name which matches " + CONFIG_FILE_NAME + "'s \
                 environment key.");

    var jsonContent = fs.readFileSync(path.resolve(pathFound, CONFIG_FILE_NAME) , "utf8")
    if (!jsonContent)
        errorHandler("Error reading " + CONFIG_FILE_NAME + " sp-publish-config.json file. \
                      It should be in the root of your project.");

    var parsed = JSON.parse(jsonContent);
    var environment = Object.keys(parsed.environments).filter(value => value === args[0].replace(/-/g, ""));

    if (!environment)
        errorHandler("Environment doesn't match " + CONFIG_FILE_NAME + " environments");

    environment = parsed.environments[environment];
    spsave(environment.coreOpts, credentials, environment.fileOpts)
        .then(function(data) {
            var dateNow = new Date();
            var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
            console.log(dateString + " The files were successfully published.");
        })
        .catch(function(err) {
            errorHandler();
        });
})();

function errorHandler(errorMessageParam) {
    var errorMessage = errorMessageParam || "Error on file upload to library";
    var dateNow = new Date();
    var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
    console.log(dateString + errorMessage);
    console.log(dateString + " Library " + environment.fileOpts.folder);
    console.log(dateString + " Error message: " + err.message);
}

exports.main = main;