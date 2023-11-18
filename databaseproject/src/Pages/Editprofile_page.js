import React from 'react';
import Nav_bar from '../Components/Navigationbar.js';
import Editpro from'../Components/Editprofile_coms.js';
function Login_page(){
  return (
    <>
     <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1,}}>
      <Nav_bar />
      </div>
      <Editpro/>
    
      
    </>
  )
};

export default Login_page;
