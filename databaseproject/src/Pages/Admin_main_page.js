import React from 'react'
import Admin_main_coms from '../Components/Admin_main_coms.js';
import Nav_bar1 from '../Components/Navbar_Admin.js';


const Admin_main_page = () => {
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
        <Nav_bar1 />
      </div>
      <Admin_main_coms/>
    </>
  )
}

export default Admin_main_page