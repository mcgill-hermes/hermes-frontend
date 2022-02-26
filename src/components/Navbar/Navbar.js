import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.css";
const { Header } = Layout;

class Navbar extends Component {
  render() {
    const username = localStorage.getItem("username");

    return (
      <div>
        <Layout style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Header className="header">
            <Row>
              <Col span={3}></Col>
              <Col span={3}>
                <div className="logo">
                  <Link to="/">Hermes</Link>
                </div>
              </Col>
              <Col span={13}>
                <div className="news">
                  <Link to="/news">News</Link>
                </div>
              </Col>
              <Col span={2}>
                {!username ? (
                  <Link to="/login" className="login">
                    Login
                  </Link>
                ) : (
                  <Link to="/profile" className="profile">
                    {username}
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
