import React from 'react'
import ShopBanner from '../Components/ShopBanner_coms.js'
import Nav_bar from '../Components/Navigationbar.js';
import Foottest from '../Components/Footer.js';
const Manageshop_page = () => {
  return (
  <>
     <div className="bg-gray-400">
     <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 11 }}>
        <Nav_bar />
      </div>
    <div>
        <ShopBanner/>
    </div>
    <div >
        <Foottest />
      </div>
     </div>
  </>
  )
}

export default Manageshop_page