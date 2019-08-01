# Bintray REST API #
> Node module for interfacing with Bintray REST API. Basic functionality is to provides the ability to get packages, and signed URL for downloads.

## Installation

>Use the following command to install as runtime dependencies

```bash
$ npm install bintray-api --save
```

## Basic usage
> Example snippet for getting list of files under a package

```js

var bintray = require('bintray');

var configs = {
  "user": "my-user-name",
  "apiKey": "my-api-hash-key",
  "owner": "my-owner-name",
  "repo": "my-repo-name"
};

var repo = new bintray(configs);
repo.packages.files('my-package-key')
  .then(function(data){
    console.log(data);  
  },
  function(error){
    console.error('Failed to retrieve packages: ' + error);
  });

```
