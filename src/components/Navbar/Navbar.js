import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
const { Header } = Layout;

class Navbar extends Component {
  render() {
    const user = localStorage.getItem("user");
    let userName = user ? JSON.parse(user).userName : null;
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
              <Col span={13}>
                <div className="news">
                  <Link to="/news" className="news-text">
                    ● News
                  </Link>
                </div>
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
              <Col span={3}></Col>
            </Row>
          </Header>
        </Layout>
      </div>
    );
  }
}
export default Navbar;
