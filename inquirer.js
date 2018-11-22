const inquirer = require("inquirer");

module.exports = {

    askSharepointCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Insert the Sharepoint user (without domain)',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, insert the Sharepoint user (without domain)';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Insert the password',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please, insert the password.';
                    }
                }
            },
            {
                name: 'domain',
                type: 'input',
                message: 'Insert the domain:'
            }
        ];
        return inquirer.prompt(questions);
    },
}