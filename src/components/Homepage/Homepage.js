import React, { Component } from "react";
import { Layout } from "antd";
import Preference from "../Preference/Preference";
import News from "../News/News";
const { Content } = Layout;

class Homepage extends Component {
  render() {
    const preference = localStorage.getItem("preference");

    const renderPage = () => {
      if (preference === false || preference === null) {
        return <Preference />;
      } else {
        return <News />;
      }
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
