import React from 'react';
import Profileinform from '../Components/Profileinform_coms.js';
import Nav_bar from '../Components/Navigationbar.js';



function Profile_page() {
    
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 15 }}>
        <Nav_bar />
      </div>
      
      <Profileinform />
        
     
        

    </>
  );
}

export default Profile_page;
