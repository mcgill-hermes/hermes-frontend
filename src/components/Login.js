import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { Layout, Form, Button, Input, Checkbox, Row } from "antd";
import "./Login.css";
import Navbar from "./Navbar";

const { Content } = Layout;

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: ''
  })
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    var data = JSON.stringify(userInfo)
    return <Navigate push to={{
      pathname: "/profile",
      state: { username: userInfo }

    }} />

  }
  const onFinish = (values) => {
    console.log("Success:", values);
    setRedirect(true)
  };
  //get the username need for profile
  const changeHandle = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
    console.log(userInfo)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Login">
      <Navbar />
      <Layout>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            <Form
              className="form"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                value={userInfo.username}
                onChange={changeHandle}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div >
  );
}
