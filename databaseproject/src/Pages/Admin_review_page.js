import React from 'react'
import Admin_review_coms from '../Components/Admin_review_coms.js';
import Nav_bar1 from '../Components/Navbar_Admin.js';


const Admin_review_page = () => {
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
        <Nav_bar1 />
      </div>
      <Admin_review_coms/>
    </>
  )
}

export default Admin_review_page