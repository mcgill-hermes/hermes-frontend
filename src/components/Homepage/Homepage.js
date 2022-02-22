import React, { Component } from "react";
import { Layout } from "antd";
const { Content } = Layout;

class Homepage extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Content style={{ minHeight: "100vh" }}></Content>
        </Layout>
      </div>
    );
  }
}
export default Homepage;
