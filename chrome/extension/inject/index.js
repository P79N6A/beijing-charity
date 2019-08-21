import React, { Component } from 'react';
import { render } from 'react-dom';
import { Modal, ConfigProvider, message, Button } from 'antd';
import classnames from 'classnames';
import fetch from '../lib/fetch';
import EventEmitter from '../lib/emitter';
import './inject.less';

const emitter = new EventEmitter();

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSend: false,
      id: window.id,
      phone: '',
      position: '',
      name: '',
      email: '',
      hr_phone: '13412341234',
      hr_email: 'wangshuang@bytedance.net',
      count: 0,
      loading: false
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  setTimeout(() => {
    setImmediate(() => {
      const dock = document.querySelector('.info-tabs-container .ant-tabs-extra-content .g-flexbox');
      if (dock) {
        dock.insertBefore(injectDOM, dock.firstChild);
        render(<InjectApp />, injectDOM);
      }
    });
  }, 1000);

  // 注入页面脚本获取网页内容
  const s = document.createElement('script');
  if (process.env.NODE_ENV === 'production') {
    s.src = chrome.extension.getURL('/js/spy.bundle.js');
  } else {
    s.src = chrome.extension.getURL('https://localhost:3000/js/spy.bundle.js');
  }
  document.body.appendChild(s);
});

window.addEventListener('message', (e) => {
  if (e.source !== window) {
    return;
  }
  console.log('get', event.data);
  const { id, type } = event.data;
  if (type === 'spy') {
    window.id = id;
    emitter.emit('getid');
  }
});
