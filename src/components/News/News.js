import React from "react";
import { Layout, Row } from "antd";
import { Tabs, Card, Spin } from "antd";
import { useState, useEffect } from "react";

const { TabPane } = Tabs;

const { Content, Header, Footer } = Layout;

export default function News() {
  const dummy =  [{},{},{},{},{},{}];

  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState(dummy);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:8080/category/types", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (data) => {
              const tags = JSON.parse(data)
              const tagsAndAll = ["All"].concat(tags);
              setCategories(tagsAndAll);
            }
          )
        } else {
          console.log(response)
        }
      }
    )
    // const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : "testuser"
    fetch(`http://localhost:8080/news/get-all`, requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (data) => {
              // const tags = JSON.parse(data).map(o => o["type"])
              setNews(JSON.parse(data));
              setLoading(false);
              // console.log(JSON.parse(data))
            }
          )
        } else {
          console.log(response)
        }
      }
    )
  }, [])

  const callback = (e) => {
    setLoading(true);
    setNews(dummy)
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:8080/news/Category/?type=" +categories[e], requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (data) => {
              setNews(JSON.parse(data));
              setLoading(false);
            }
          )
        } else {
          console.log(response)
        }
      }
    )
  }

  return (
    <div className="News">
      <Layout>
        <Header></Header>
        <Content>
          <Row
            type="flex"
            justify="center"
            style={{ minHeight: "100vh", marginTop: "5%", marginBottom: "5%" }}
          >
            <Tabs type="card" onChange={callback}>
              {categories.map((category, index) => {
                return (
                  <TabPane tab={category} key={index}>
                    {news.map((element, index) => {
                      return (
                        <Card
                          loading={loading}
                          key={index}
                          size="small"
                          title={element.title}
                          extra={<a href={element.url}>Read more</a>}
                          style={{ width: 700, marginTop: "10px" }}
                        >
                          <p>{element.content}</p>
                        </Card>
                      );
                    })}
                  </TabPane>
                )
              })}
            </Tabs>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}
