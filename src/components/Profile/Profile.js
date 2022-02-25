import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import profileImage from "../../assets/images/profile.webp";
import "./Profile.css";
import { Button, Typography } from "antd";
import { signingOut } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";

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

  const profileAuthed = (
    <>
      <div className="container">
        <img className="icon" src={profileImage} alt="" align="center" />
        <Typography className="text">Username:.username</Typography>
        <Typography className="text">Email:</Typography>
        <Typography className="text">Joined:</Typography>
        <Typography className="text"> Preferrence:</Typography>
        <Button type="primary" htmlType="sign out" onClick={signOutHandle}>
          SIGN OUT
        </Button>
      </div>
    </>
  );
  return (
    <div>
      <div className="layout">{profileAuthed}</div>
    </div>
  );
};

export default Profile;
