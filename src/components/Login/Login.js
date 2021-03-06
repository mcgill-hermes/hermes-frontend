import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout, Form, Button, Input, Checkbox, Row, Space, Alert } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
  });
  const [password, setPassword] = useState({ password: "" });
  const history = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        userName: values.username,
        password: values.password,
      }),
    };

    fetch("http://localhost:8080/auth/login", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (data) => {
              const user = JSON.parse(data);
              delete user.password;
              localStorage.setItem("user", JSON.stringify(user));
              history("/");
              window.location.reload();
            }
          )
        } else {
          response.text().then(
            (data) => {
              setSuccessful(false)
              setMessage(data);
            }
          )
        }
      }
    )
  };

  //get the username need for profile
  const changeHandle = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePwd = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Login">
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
                value={password}
                onChange={handlePwd}
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

                  <Button type="primary" onClick={() => history("/signup")}>
                    Sign up
                  </Button>
                </Space>
                {message && successful && (
                  <Alert message={message} type="success" showIcon />
                )}
                {message && !successful && (
                  <Alert message={message} type="error" showIcon />
                )}
              </Form.Item>
            </Form>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
