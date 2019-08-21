/**
 * content.js通过background.js发送异步请求，解决content.js发送请求跨域的问题
 * @param {*} config
 */
export default function fetch(config) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        config,
        purpose: 'axios',
      },
      (response) => {
        if (response.data) {
          resolve(response);
        } else {
          reject(response);
        }
      },
    );
  });
}

function get(url, config = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        config: {
          url,
          method: 'get',
          ...config,
        },
        purpose: 'axios',
      },
      (response) => {
        if (response.data) {
          resolve(response);
        } else {
          reject(response);
        }
      },
    );
  });
}

function post(url, config = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        config: {
          url,
          method: 'get',
          ...config,
        },
        purpose: 'axios',
      },
      (response) => {
        if (response.data) {
          resolve(response);
        } else {
          reject(response);
        }
      },
    );
  });
}

fetch.get = get;
fetch.post = post;
