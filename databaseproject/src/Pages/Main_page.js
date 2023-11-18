import React from 'react';
import Nav_bar from '../Components/Navigationbar.js';
import Maintest from '../Components/Mainpageproduct_coms.js';
import Foottest from '../Components/Footer.js';

function Main_page() {
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
        <Nav_bar />
      </div>
      <div style={{ marginTop: '50px' }}>
        <Maintest />
      </div>
      <div >
        <Foottest />
      </div>
    </>
  );
}

export default Main_page;
