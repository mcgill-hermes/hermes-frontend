import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import profileImage from "../../assets/images/profile.webp";
import "./Profile.css";
import { Button, Typography } from "antd";
import { signingOut } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";

const { Content } = Layout;

const Profile = () => {
  const [redirect, setRedirect] = useState(false);
  const history = useNavigate();
  const signOutHandle = () => {
    setRedirect(true);
  };
  if (redirect) {
    localStorage.clear();
    history("/");
    window.location.reload();
  }
  const user = localStorage.getItem("user");
  const username = user ? JSON.parse(user).userName : null;

  const profileAuthed = (
    <>
      <div className="container">
        <Layout>
          <Content
            type="flex"
            align="middle"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          >
            <img
              className="icon"
              src={profileImage}
              alt=""
              align="center"
              style={{ width: "80px", marginTop: "15%", marginBottom: "3%" }}
            />
            <div>
              <p className="text">Username: {username}</p>
            </div>
            <Space>
              <Button onClick={() => history("/preference")}>
                Edit preference
              </Button>
              <Button type="primary" onClick={signOutHandle}>
                SIGN OUT
              </Button>
            </Space>
          </Content>
        </Layout>
      </div>
    </>
  );
  return (
    <div>
      <div>{profileAuthed}</div>
    </div>
  );
};

export default Profile;
