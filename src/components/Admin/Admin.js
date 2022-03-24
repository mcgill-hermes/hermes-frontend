import React, { useState } from "react";
import { Button, Input, Modal, Form, Tag } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";

const { Content } = Layout;

const Admin = () => {
  const history = useNavigate();
  const user = localStorage.getItem("user");
  const username = user ? JSON.parse(user).userName : null;

  const [password, setPassword] = React.useState();
  const [tagData, setTagData] = React.useState(Array);
  const [category, setCategory] = React.useState();
  const [summary, setSummary] = React.useState();
  const [articleID, setArticleID] = React.useState();

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

  handleOnGetCategory();

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
      console.log(response);
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
                  </Space>
                </Form.Item>

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
};

export default Admin;
