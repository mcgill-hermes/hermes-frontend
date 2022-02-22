import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import profileImage from '../../assets/images/profile.webp'
import './Profile.css'
import Footer from "../Footer/Footer"
import '../Navbar/Navbar'
import Navbar from '../Navbar/Navbar'
import { Button, Typography } from "antd";
import { signingOut } from "../../api/UserApi";
const Profile = () => {
    const [redirect, setRedirect] = useState(false)
    const signOutHandle = () => {

        setRedirect(true)

    }
    if (redirect) {
        return <Navigate push to={{
            pathname: "/",
            state: { redirect: '' }
        }} />
    }

    const profileAuthed = <>
        <div className='container'>
            <img className="icon" src={profileImage} alt="" align="center" />
            <Typography className='text'>Username:.username

            </Typography>
            <Typography className='text'>Email:

            </Typography>
            <Typography className='text'>Joined:

            </Typography>
            <Typography className='text'> Preferrence:

            </Typography>
            <Button type="primary" htmlType="sign out" onClick={signOutHandle}>
                SIGN OUT
            </Button>

        </div>


    </>
    return (
        <div>
            <Navbar />
            <div className='layout'>
                {profileAuthed}
            </div>
            <Footer />

        </div>
    )
}

export default Profile;