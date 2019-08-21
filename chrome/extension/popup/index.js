/**
 * author: wuwei
 * 点击图标的弹窗，普通插件页面, 不可访问页面dom元素
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, ConfigProvider, Alert } from 'antd';
import './popup.less';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      loading: false
    };
    this.timer = null;
  }
  componentDidMount() {
    this.restoreSetting();
    chrome.alarms.onAlarm.addListener(() => {
      this.setState(
        {
          saved: false
        },
        () => {
          this.forceUpdate();
        }
      );
    });
  }
  restoreSetting() {
    // 获取本地保存的值
    chrome.storage.local.get('settings', (obj) => {
      const { settings } = obj;
      // eslint-disable-next-line
      this.props.form.setFieldsValue(JSON.parse(settings || '{}'));
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.setState({
        loading: true
      });
      chrome.storage.local.set({ settings: JSON.stringify(values) }, () => {
        this.setState({
          saved: true,
          loading: false
        });
        chrome.alarms.create('Start', { delayInMinutes: 1 / 30 });
      });
    });
  };
  render() {
    // eslint-disable-next-line
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="popup-container">
        <h3>联系信息设置</h3>
        <Form
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="hr电话">
            {getFieldDecorator('hr_phone', {
              rules: [{ required: true, message: 'Please input some!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="hr邮箱">
            {getFieldDecorator('hr_email', {
              rules: [{ required: true, message: 'Please input some!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button loading={this.state.loading} type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
        {this.state.saved && <Alert message="保存成功" type="success" />}
      </div>
    );
  }
}

const PopupWrapper = Form.create({ name: 'register' })(Popup);

ReactDOM.render(
  <ConfigProvider prefixCls="people">
    <PopupWrapper />
  </ConfigProvider>,
  document.querySelector('#root')
);
