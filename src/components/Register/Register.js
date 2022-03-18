import React, { useState } from "react";
import { Form, Input, Alert, Button, Layout, Row } from "antd";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 30,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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
      offset: 10,
    },
  },
};

const Register = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [successful, setSuccessful] = useState(false);

  const [message, setMessage] = useState();
  // const dispatch = useDispatch();

  const onFinish = (values) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName: values.username,
        password: values.password,
        firstName: values.firstname,
        lastName: values.lastname,
      }),
    };
    fetch("http://localhost:8080/auth/signup", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (data) => {
              const user = JSON.parse(data);
              delete user.password;
              localStorage.setItem("user", JSON.stringify(user));
              history("/preference");
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
      },
      (error) => {
        setSuccessful(false);
        setMessage(error.message);
      }
    )
  };

  return (
    <div>
      <Layout>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="firstname"
              label="First name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  max: 20,
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              {message && successful && (
                <Alert message={message} type="success" showIcon />
              )}
              {message && !successful && (
                <Alert message={message} type="error" showIcon />
              )}
            </Form.Item>
          </Form>
        </Row>
      </Layout>
    </div>
  );
};

export default Register;
