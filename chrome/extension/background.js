const bluebird = require('bluebird');
const axios = require('axios');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
// require('./background/badge');

/**
 * 转发异步请求
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.purpose === 'axios') {
    axios(request.config).then((res) => {
      sendResponse(res);
    }).catch((err) => {
      sendResponse(err);
    });
  }
  return true;
});
