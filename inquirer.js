const inquirer = require("inquirer");

module.exports = {

    askSharepointCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Insira o usuário do Sharepoint (sem o domínio)',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Por favor, insira o usuário do Sharepoint (sem o domínio)';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Insira a senha',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Por favor, insira a senha.';
                    }
                }
            },
            {
                name: 'domain',
                type: 'input',
                message: 'Insira o domínio:'
            }
        ];
        return inquirer.prompt(questions);
    },
}