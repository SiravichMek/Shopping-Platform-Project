import React from 'react';
import Order_coms from '../Components/Order_coms.js';
import Nav_bar from '../Components/Navigationbar.js';
import Foottest from '../Components/Footer.js';

const Order_page = () => {
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
        <Nav_bar />
      </div>
        <div className="">
        <Order_coms />
        </div>
        
        <div >
        <Foottest />
      </div>
    </>
    
    
  )
}

export default Order_page