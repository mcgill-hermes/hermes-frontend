import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import Navbar from '../Navbar/Navbar';
import {
  Form,
  Input,
  Alert,
  Button,
  Layout,
  Row
} from 'antd';

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
  const [form] = Form.useForm();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();



  const onFinish = (values) => {
    setSuccessful(false);

    dispatch(register(values.username, values.password))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };


  return (
    <div>
      <Navbar />
      <Layout>
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
                    message: 'Please input your password!',
                  },
                  {
                    max: 20,
                    min: 4
                  }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
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

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
                {message && successful &&
                  (<Alert message={message} type="success" showIcon />)
                }
                {message && !successful &&
                  (<Alert message={message} type="error" showIcon />)
                }
              </Form.Item>
            </Form>
          </Row>
        </Layout>
      </Layout>
    </div>
  );
};

export default Register;