import React from 'react'
import History_coms from '../Components/History_coms.js'
import Nav_bar from '../Components/Navigationbar.js';
import Foottest from '../Components/Footer.js';
const History_page = () => {
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1,}}>
      <Nav_bar />
      </div>
    <History_coms/>
    <div >
        <Foottest />
      </div>
    </>
  )
}

export default History_page