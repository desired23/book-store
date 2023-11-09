import React from 'react'
import { Form, Button, Input } from 'antd';
import { UserOutlined, MailFilled, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../api/auth';
import { IRegisterRequest } from '../interfaces/auth';

const Register = () => {
  const [signUp] = useRegisterMutation()
  const onFinish = (values: IRegisterRequest) => {
    console.log('Success:', values);
    signUp(values)
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <Form
      {...formItemLayout}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >

      <Form.Item
        name="email"

        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}

      >
        <Input prefix={<MailFilled className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="username"

        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}

      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"

        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"

        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<SafetyOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" ghost htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register