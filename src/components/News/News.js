import React from "react";
import { Layout, Row } from "antd";
import { Tabs, Card } from "antd";

const { TabPane } = Tabs;

const { Content, Header, Footer } = Layout;

export default function News() {
  function callback(key) {
    // TODO: filter methods to be implemented
  }

  const categories = ["Sports", "Technology", "Covid"];

  // to be get from backend
  const news = [
    {
      title: "title 1",
      abstract: "abstract 1",
      url: "url 1",
    },
    {
      title: "title 2",
      abstract: "abstract 2",
      url: "url 2",
    },
    {
      title: "title 3",
      abstract: "abstract 3",
      url: "url 3",
    },
    {
      title: "title 4",
      abstract: "abstract 4",
      url: "url 4",
    },
    {
      title: "title 5",
      abstract: "abstract 5",
      url: "url 5",
    },
    {
      title: "title 6",
      abstract: "abstract 6",
      url: "url 6",
    },
  ];

  return (
    <div className="News">
      <Layout>
        <Header></Header>
        <Content>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh", marginTop: "5%", marginBottom: "5%"}}
          >
            <Tabs onChange={callback} type="card">
              {categories.map((category, index) => {
                return <TabPane tab={category} key={index}>
                  {news.map((element, index) => {
                  return (
                    <Card
                      key={index}
                      size="small"
                      title={element.title}
                      extra={<a href={element.url}>Read more</a>}
                      style={{ width: 700, marginTop: "10px" }}
                    >
                      <p>{element.abstract}</p>
                    </Card>
                  );
                })}
                </TabPane>
              })}
            </Tabs>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}
