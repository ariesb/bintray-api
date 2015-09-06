/*!
 * Node Bintray API
 * Copyright(c) 2015 Aries Beltran (ariesbe@icloud.com)
 * MIT Licensed
 */
var request = require('request');
var clone = require('clone');

function Bintray(options) {
  settings = options || {};

  for (var i in options) {
    if(options.hasOwnProperty(i)) {
      settings[i] = options[i];
    }
  }

  settings.apiUrl = "https://api.bintray.com";
  settings.downloadsHost = "http://dl.bintray.com";
  settings.defaultServiceOptions = {};

  if(options.hasOwnProperty('user')) {
    settings.defaultServiceOptions['auth'] = {
      'user': options.user,
      'pass': options.apiKey,
      'sendImmediately': false
    };
  }
}

makeServiceEndpoint = function(service) {
  var newServiceUrl = {
    settings: this.settings,
    value: service
  };

  var keys = ['owner', 'repo'];
  keys.forEach(function(val){
    this.value = this.value.replace('{' + val + '}', this.settings[val]);
  }, newServiceUrl);

  return newServiceUrl.value;
};

apiRequest = function(service, _callback){
  var apiService = this.settings.apiUrl + '/' + makeServiceEndpoint(service.uri);
  var apiServiceOptions = clone(this.settings.defaultServiceOptions);
  var requestOption = clone(service);
  requestOption.uri = apiService;
  if( apiServiceOptions.auth ) {
    requestOption.auth = apiServiceOptions.auth;
  }

  request(requestOption, _callback);
};

// bintray api sets
Bintray.prototype.packages = require('./packages');
module.exports = Bintray;