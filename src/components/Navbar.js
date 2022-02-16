import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.css";
const { Header } = Layout;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  redirectLogin() {
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <Row>
              <Col span={3}></Col>
              <Col span={3}>
                <div className="logo">
                  <Link to="/">Hermes</Link>
                </div>
              </Col>
              <Col span={12}>
                <div className="news">
                  <Link to="/news">News</Link>
                </div>
              </Col>
              <Col span={3}>
                <Link to="/signup" className="signup">Sign up</Link>
                <Link to="/login" className="login">Login</Link>
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
