import React from "react";
import { Layout, Row } from "antd";

const { Content } = Layout;

export default function News() {
  return (
    <div className="News">
      <Layout>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            News
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
