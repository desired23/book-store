import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { LockOutlined, MailFilled } from '@ant-design/icons';
import { useLoginMutation } from '../api/auth';
import { ILoginRequest } from '../interfaces/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginSuccess } from '../store/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.user);
  const [signIn] = useLoginMutation()

  const onFinish = async (values: ILoginRequest) => {
    try {
      signIn(values).unwrap().then((user) => dispatch(loginSuccess(user)))
    } catch (error) {
      console.log(error);
    }
  };
  console.log(authState);
  return (
    <Form

      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>



      <Form.Item>
        <Button type="primary" ghost htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>

      <Form.Item>

      </Form.Item>
      {/* <LoginButton/>
  <LogoutButton/> */}
    </Form>
  )
}

export default Login