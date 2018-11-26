const inquirer = require("inquirer");

module.exports = {
    properties: {
        username: {
            description: 'Insert the Sharepoint user (without domain)',
            message: 'Please insert the Sharepoint user (without domain)',
            required: true
        },
        password: {
            description: 'Insert the password',
            message: 'Please insert the password',
            hidden: true,
            required: true,
            replace: "*",
        },
        domain: {
            description: "Insert the domain",
            message: 'Please insert the domain',
            required: false
        }
    }
}