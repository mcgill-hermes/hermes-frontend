import React, { Component } from "react";
import { Layout } from "antd";
import News from "../News/News";
const { Content } = Layout;

class Homepage extends Component {
  render() {
    const renderPage = () => {
      return <News />;
    };

    return (
      <div>
        <Layout>
          <Content style={{ minHeight: "100vh" }}>{renderPage()}</Content>
        </Layout>
      </div>
    );
  }
}
export default Homepage;
