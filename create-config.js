const fs = require('fs');
const jsonExample = require("./sp-publish-config-example.json");
const path = require("path");

fs.writeFile(path.resolve(__dirname, "sp-publish-config.json"), JSON.stringify(jsonExample, null, 2), function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("sp-publish-config.json created.");
});