import React, { useState } from "react";
import profileImage from "../../assets/images/profile.webp";
import "./Profile.css";
import { Button, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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

  const [modelVisible, setModelVisible] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [confirmLoading, ] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [warning, setWarning] = React.useState();

  const showModal = () => {
    setModelVisible(true);
  };

  const handleOnDeleteOk = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    };
    fetch(`http://localhost:8080/myaccount/delete?username=${username}&password=${password}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          response.text().then((data) => {
            localStorage.removeItem("user");
            handleOnDeleteCancel();
            history("/");
            window.location.reload();
          });
        } else {
          response.text().then((data) => {
            setWarning(data);
            setShowWarning(true);
          });
        }
      },
      (error) => {
        setWarning(error.message);
        setShowWarning(true);
      }
    );
  };

  const handleOnDeleteCancel = () => {
    setModelVisible(false);
    setPassword(null);
    setShowWarning(false);
    setWarning("");
  };

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
            <Space direction="vertical">
              <Button onClick={() => history("/preference")}>
                Edit preference
              </Button>
              <Space direction="horizontal" style={{ marginTop: "10%" }}>
                <Button type="danger" onClick={showModal}>
                  Delete Account
                </Button>
                <Button block type="primary" onClick={signOutHandle}>
                  Sign Out
                </Button>
              </Space>
            </Space>
          </Content>
        </Layout>
        <Modal
          title="Delete Account"
          visible={modelVisible}
          onOk={handleOnDeleteOk}
          confirmLoading={confirmLoading}
          onCancel={handleOnDeleteCancel}
        >
          <p>Please confirm your password and click "OK" button</p>
          <Input.Password
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          ></Input.Password>
          {showWarning ? <p className="error">{warning}</p> : null}
        </Modal>
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
