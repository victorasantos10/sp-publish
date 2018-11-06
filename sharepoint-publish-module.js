var spsave = require('spsave').spsave;
var util = require("util");
var environments = require("./environments").environments;
const inquirer = require("./inquirer");

var args = process.argv.slice(2);

const run = async () => {

  //Solicitando credenciais do Sharepoint via linha de comando.
  const credentials = await inquirer.askSharepointCredentials();

  if (args && args.length) {

    var environment = Object.keys(environments).filter(value => value === args[0].replace(/-/g, ""));
    if (environment) {
      environment  = environments[environment];

    spsave(environment.coreOpts, credentials, environment.fileOpts)
      .then(function (data) {
        var dateNow = new Date();
        var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
        console.log(dateString + " O upload dos arquivos foi feito com êxito");
      })
      .catch(function (err) {
        var dateNow = new Date();
        var dateString = util.format('[%s:%s:%s]', ('0' + dateNow.getHours()).slice(-2), ('0' + dateNow.getMinutes()).slice(-2), ('0' + dateNow.getSeconds()).slice(-2));
        console.log(dateString + " Erro ao fazer upload para a biblioteca " + environment.fileOpts.folder);
        console.log(dateString + " Mensagem de erro: " + err.message);
      });
    }
  }
}

run();