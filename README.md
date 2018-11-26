# sp-publish

File publish to Sharepoint document libraries via command line. Depends on [spsave](https://github.com/s-KaiNet/spsave)

## How to use

You will need to create a sp-publish-config.json file in your project, which needs to contain all options related to publishing. Possible options available at [spsave](https://github.com/s-KaiNet/spsave) documentation.

#### Install

    npm install -g sp-publish

#### Configuration sample

```json
    {
      "environments": {
        "your_environment_name": {
          "coreOpts": {
            "siteUrl": "http://yoursiteurl.com/sites/examplesite",
            "checkin": true,
            "checkinType": 1
          },
          "fileOpts": {
            "folder": "Pages/folder",
            "glob": [
              "dist/**/*.*"
            ],
            "base": "dist"
          }
        }
      }
```}

#### Usage
    sp-publish --<environment_name>

The environment name must match the key under `environments` object on the sp-publish-config.json file.
````
