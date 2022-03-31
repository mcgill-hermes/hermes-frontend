import React from "react";
import { Layout, Row, Col, Input } from "antd";
import { UserOutlined, StarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";
const { Header } = Layout;
const { Search } = Input;

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  let userName = user ? JSON.parse(user).userName : null;
  
  const onSearch = (e) => {
    navigate(`/news?searchKey=${e}`);
    window.location.reload();
  }

  return (
      <div>
        <Layout style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Header className="header">
            <Row>
              <Col span={3}></Col>
              <Col span={3}>
                <div className="logo">
                  <Link to="/" className="logo-text">
                    Hermes
                  </Link>
                </div>
              </Col>
              <Col span={2}>
                <div className="news">
                  <a onClick={() => {window.location.href="/news"} } className="news-text">● News</a>
                </div>
              </Col>
              <Col span={11}>
                  <Search placeholder="Search for topic" onSearch={onSearch} style={{ width: "70%", verticalAlign: "middle" }} />
              </Col>
              <Col span={2}>
                {!userName ? (
                  <Link to="/login" className="login">
                    Login
                  </Link>
                ) : (
                  <Link to="/profile" className="profile">
                    <UserOutlined />
                  </Link>
                )}
              </Col>
              <Col span={3}>
                <Link to="/admin" className="admin">
                  <StarOutlined />
                </Link>
              </Col>
            </Row>
          </Header>
        </Layout>
      </div>
  );
}
