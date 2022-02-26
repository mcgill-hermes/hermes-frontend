import React from "react";
import { Button, Layout, Row, Card, Tag } from "antd";
import "./Preference.css";
const { Content } = Layout;
const { CheckableTag } = Tag;

class Preference extends React.Component {
  state = {
    selectedTags: ["Technology", "Finance & Economics"],
  };

  tagsData = [
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

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  click(e) {
    // TODO: save preference
    localStorage.setItem("preference", true);
    window.location.reload();
  }

  render() {
    const { selectedTags } = this.state;
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
                {this.tagsData.map((tag) => (
                  <CheckableTag
                    key={tag}
                    style={{ margin: "12px" }}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={(checked) => this.handleChange(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
                <p className="button">
                  <Button onClick={this.click}>Confirm</Button>
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
