import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout, Form, Button, Input, Checkbox, Row, Space } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const { Content } = Layout;

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
  });
  const history = useNavigate();
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    var data = JSON.stringify(userInfo);
    return (
      <Navigate
        push
        to={{
          pathname: "/profile",
          state: { username: userInfo },
        }}
      />
    );
  }

  const onFinish = (values) => {
    console.log("Success:", values);
    setRedirect(true);
  };
  //get the username need for profile
  const changeHandle = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    console.log(userInfo);
  };

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
                <Space>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => history("/signup")}
                  >
                    Sign up
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
