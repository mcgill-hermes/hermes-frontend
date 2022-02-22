import React from "react";
import { Button, Layout, Row, Card, Tag } from "antd";
import "./Preference.css";
const { Content } = Layout;
const { CheckableTag } = Tag;

const Preference = () => {
  const tagsData = [
    "Technology",
    "Finance & Economics",
    "Entertainment",
    "Science",
    "Politics",
    "Health",
    "Covid",
    "US",
    "Canada",
    "China",
    "Sports",
  ];

  function click(e) {
    localStorage.setItem("preference", true);
    window.location.reload();
  }

  return (
    <div>
      <Layout>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            <Card
              title="Welcome, select 2 or more news topics to get started"
              bordered={false}
              style={{
                width: 600,
                height: 300,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
              }}
            >
              {tagsData.map((tag) => (
                <CheckableTag
                  key={tag}
                  style={{ background: "#F96", margin: "12px" }}
                >
                  {tag}
                </CheckableTag>
              ))}
              <p className="button">
                <Button onClick={click}>Continue</Button>
              </p>
            </Card>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default Preference;
