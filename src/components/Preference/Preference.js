import React from "react";
import { Button, Layout, Row, Card, Tag } from "antd";
import { Link } from "react-router-dom";
import "./Preference.css";
const { Content } = Layout;
const { CheckableTag } = Tag;

class Preference extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTags: [], tagsData: [] };
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
    };
    fetch("http://localhost:8080/category/types", requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then((data) => {
            const tags = JSON.parse(data);
            this.setState({
              tagsData: tags,
            });
          });
        } else {
          console.log(response);
        }
      }
    );

    const userPreference = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).preference
      : [];
    const userPrefernceExtracted = userPreference.map((e) => e["type"]);
    this.state.selectedTags = userPrefernceExtracted;
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  click(e) {
    const tags = this.state.selectedTags.map((e) => {
      return { type: e };
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userName: JSON.parse(localStorage.getItem("user")).userName,
        preference: tags,
      }),
    };
    fetch(
      "http://localhost:8080/myaccount/editinformation",
      requestOptions
    ).then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          const user = JSON.parse(data);
          delete user.password;
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload();
        });
      } else {
        response.text().then((data) => {
          console.log(data);
        });
      }
    });
  }

  render() {
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
                title="Please select 2 or more news topics"
                bordered={false}
                style={{
                  width: 600,
                  height: 300,
                  backgroundColor: "rgba(255, 255, 255, 0.0)",
                }}
              >
                {this.state.tagsData.map((tag) => (
                  <CheckableTag
                    key={tag}
                    style={{ margin: "12px" }}
                    checked={this.state.selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => this.handleChange(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
                <p className="button">
                  <Link to="/news">
                    <Button onClick={this.click}>Confirm</Button>
                  </Link>
                </p>
              </Card>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Preference;
