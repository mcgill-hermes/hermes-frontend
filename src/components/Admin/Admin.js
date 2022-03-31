import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Tag, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Admin.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Space } from "antd";

const { Content } = Layout;

function Admin() {
  const history = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("user");
  const username = user ? JSON.parse(user).userName : null;

  const [password, setPassword] = React.useState();
  const [tagData, setTagData] = React.useState(Array);
  const [category, setCategory] = React.useState();
  const [summary, setSummary] = React.useState();
  const [articleID, setArticleID] = React.useState();
  const [successful, setSuccessful] = useState(false);
  const [categorySuccessful, setCategorySuccessful] = useState(false);
  const [message, setMessage] = useState();

  const handleOnGetCategory = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:8080/category/types", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then((data) => {
            localStorage.tags = JSON.parse(data);
            setTagData(JSON.parse(data));
          });
        }
      }
    );
  };

  useEffect(() => {
    handleOnGetCategory();
  }, [location]);

  const handleTag = (e) => {
    setCategory(e.target.value);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleArticleID = (e) => {
    setArticleID(e.target.value);
  };

  const onFinish = (values) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(
      `http://localhost:8080/category/create?category=${category}`,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        setMessage("Success!");
        setCategorySuccessful(true);
        handleOnGetCategory();
      } else {
        setMessage("Failed");
        setCategorySuccessful(false);
      }
    });
  };

  const onSummaryFinish = (values) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        newID: articleID,
        newSummary: summary,
      }),
    };
    fetch(
      `http://localhost:8080/updateSummaryForNews?newsID=${articleID}&newSummary=${summary}`,
      requestOptions
    ).then((response) => {
      if (response.ok) {
        setMessage("Success!");
        setSuccessful(true);
      } else {
        setMessage("Failed");
        setSuccessful(false);
      }
    });
  };

  const Admin = (
    <>
      <div className="container">
        <Layout>
          <Content
            type="flex"
            align="middle"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          >
            <div style={{ marginTop: "10%", marginBottom: "3%" }}>
              <p className="text">Current Categories:</p>
              {tagData.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <Space direction="vertical">
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
                autoComplete="off"
              >
                <Form.Item
                  label="Add Category"
                  name="category"
                  value={category}
                  onChange={handleTag}
                  rules={[
                    {
                      message: "Please enter the name of the category",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                    {message && categorySuccessful && (
                      <Alert message={message} type="success" showIcon />
                    )}
                    {message && !categorySuccessful && (
                      <Alert message={message} type="error" showIcon />
                    )}
                  </Space>
                </Form.Item>
              </Form>
              <Form onFinish={onSummaryFinish}>
                <Form.Item
                  label="Article ID"
                  name="articleID"
                  value={articleID}
                  onChange={handleArticleID}
                  rules={[
                    {
                      message: "Please enter article id",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Enter summary: "
                  name="summary"
                  value={summary}
                  onChange={handleSummary}
                  rules={[
                    {
                      message: "Please enter the updated summary",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                    {message && successful && (
                      <Alert message={message} type="success" showIcon />
                    )}
                    {message && !successful && (
                      <Alert message={message} type="error" showIcon />
                    )}
                  </Space>
                </Form.Item>
              </Form>
            </Space>
          </Content>
        </Layout>
      </div>
    </>
  );
  return (
    <div>
      <div>{Admin}</div>
    </div>
  );
}

export default Admin;
