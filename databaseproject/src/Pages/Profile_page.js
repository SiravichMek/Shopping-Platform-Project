import React from 'react';
import Profileinform from '../Components/Profileinform.js'

function Profile_page(){
    return(
        <>
        <Profileinform/>
        <a href="/editprofile">edit profile</a>
        <br/>
        <a href="/cs">Create shop</a>
        </>
    )
};
export default Profile_page;