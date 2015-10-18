/*!
 * Node Bintray API
 * Copyright(c) 2015 Aries Beltran (ariesbe@icloud.com)
 * MIT Licensed
 */
var Promise = require('promise');

var Packages = function() {
};

Packages.prototype.get = function(key) {
  return new Promise(function (resolve, reject) {
    apiRequest({method: 'GET', uri: 'repos/{owner}/{repo}/packages'},
      function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
  });  
};

Packages.prototype.files = function(key) {
  return new Promise(function (resolve, reject) {
    apiRequest({method: 'GET', uri: 'packages/{owner}/{repo}/' + key + '/files'},
      function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
  });  
};

Packages.prototype.signedUrl = function(path) {
  return new Promise(function (resolve, reject) {
    apiRequest({method: 'POST', uri: 'signed_url/{owner}/{repo}/' + path},
      function(error, response, body){
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
  });  
};

module.exports = new Packages();