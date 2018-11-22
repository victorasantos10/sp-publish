const spsave = require('spsave').spsave;
const util = require("util");
const findUp = require("find-up")
const fs = require("fs");
const inquirer = require("./inquirer");
const path = require("path");

var args = process.argv.slice(2);

(async () => {

    const credentials = await inquirer.askSharepointCredentials();

    if (!args || !args.length)
    errorHandler("Parameters not found. You need to call 'sp-publish --<environment-name>' \
                 where <environment-name> should be a name which matches sp-publish-config.json's \
                 environment key.");

    var jsonContent = fs.readFileSync(path.resolve(__dirname, "sp-publish-config.json") , "utf8")
    if (!jsonContent)
        errorHandler("Error reading sp-publish-config.json file. \
                      It should be in the root of your project.");

    var parsed = JSON.parse(jsonContent);
    var environment = Object.keys(parsed.environments).filter(value => value === args[0].replace(/-/g, ""));

    if (!environment)
        errorHandler("Environment doesn't match sp-publish-config.json environments");

    environment = parsed.environments[environment];
    spsave(environment.coreOpts, credentials, environment.fileOpts)
        .then(function(data) {
            var dateNow = new Date();
            var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
            console.log(dateString + " The files were successfully uploaded.");
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