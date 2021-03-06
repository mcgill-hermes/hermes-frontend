import React from "react";
import { Layout, Row } from "antd";
import { Tabs, Card } from "antd";
import { useState, useEffect,  } from "react";
import { LikeButton } from "../Like/like";
import { useLocation } from "react-router-dom"
const { TabPane } = Tabs;

const { Content, Header, Footer } = Layout;

export default function News() {
  const search = window.location.search;
  const location = useLocation();
  const params = new URLSearchParams(search);
  let searchKey = params.get('searchKey');
  const dummy = [{}, {}, {}, {}, {}, {}, {}, {}];
  const isExtractive = localStorage.getItem("switchState") === "false";
  const seperator="<-seperator->";

  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState(dummy);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    searchKey = params.get('searchKey');
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:8080/category/types", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then((data) => {
            const tags = JSON.parse(data);
            const tagsAndAll = ["All"].concat(tags);
            setCategories(tagsAndAll);
          });
        } else {
          console.log(response);
        }
      }
    );
    if (searchKey) {
      fetch(`http://localhost:8080/summary/category?type=${searchKey}`, requestOptions).then(
        (response) => {
          if (response.ok) {
            response.text().then((data) => {
              setNews(JSON.parse(data).map(e => e.article));
              setLoading(false);
            });
          } else {
            setNews([])
            setLoading(false);
            console.log(response);
          }
        },
        (error) => {
          console.log("error")
          setNews([])
          setLoading(false);
        }
      );
    } else {
      fetch(`http://localhost:8080/news/get-all`, requestOptions).then(
        (response) => {
          if (response.ok) {
            response.text().then((data) => {
              setNews(JSON.parse(data));
              setLoading(false);
            });
          } else {
            console.log(response);
          }
        }
      );
    }

  }, [location]);

  const callback = (e) => {
    setLoading(true);
    setNews(dummy);
    const requestOptions = {
      method: "GET",
    };
    fetch(
      "http://localhost:8080/news/Category/?type=" + categories[e],
      requestOptions
    ).then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          setNews(JSON.parse(data));
          setLoading(false);
        });
      } else {
        console.log(response);
      }
    });
  };

  const getContent = (element)=> {
    if(!element.content || !element.summaryDto) return element.content;
    const summaryText = element.summaryDto.nlprResult
    const strArr = summaryText.split(seperator);
    console.log(strArr);
    if(strArr.length > 1){
      console.log(strArr.length);
      if(isExtractive) return strArr[1];
      else return strArr[0];
    }
    return strArr;
  }

  return (
    <div className="News">
      <Layout>
        <Header></Header>
        <Content>
          {
            searchKey && news.length === 0 ?
              (
                <p style={{marginTop: "5%", minHeight: "100vh", textAlign: "center"}}>no result</p>
              )
              :
              (
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{
                    minHeight: "100vh",
                    marginTop: "2%",
                    marginBottom: "5%",
                    flexWrap: "wrap",
                  }}
                >

                  <Tabs type="card" onChange={callback} style={{ width: 800 }}>
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
                                style={{ width: 800, marginTop: "10px" }}
                              >
                                <p>{getContent(element)}</p>
                                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                  <LikeButton key={Math.random().toString(36)} /> 
                                </div>
                              </Card>
                            );
                          })}
                        </TabPane>
                      );
                    })}
                  </Tabs>

                </Row>
              )
          }
        </Content>
        <Footer></Footer>
      </Layout>
    </div >
  );
}
