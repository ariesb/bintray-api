/*!
 * Node Bintray API
 * Copyright(c) 2015 Aries Beltran (ariesbe@icloud.com)
 * MIT Licensed
 */
var request = require('request');
var clone = require('clone');
var chalk = require('chalk');
var dateformat = require('dateformat');

var logger = function(){
  if( this.settings.hasOwnProperty('verbose') && this.settings.verbose ){
    var time = '['+chalk.grey(dateformat(new Date(), 'HH:MM:ss'))+']';
    process.stdout.write(time + ' ');
    console.log.apply(console, arguments);
  }
};

function Bintray(options) {
  settings = options = options || {};

  for (var i in options) {
    if(options.hasOwnProperty(i)) {
      settings[i] = options[i];
    }
  }

  settings.apiUrl = "https://api.bintray.com";
  settings.downloadsHost = "http://dl.bintray.com";
  settings.defaultServiceOptions = {};

  options.sendImmediately = options.sendImmediately ? options.sendImmediately : true;

  if(options.hasOwnProperty('user')) {
    settings.defaultServiceOptions['auth'] = {
      'user': options.user,
      'pass': options.apiKey,
      'sendImmediately': options.sendImmediately
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
  logger('> Service URL: ', apiService);
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
