import React from 'react'
import Cart_product from '../Components/Cart_coms.js'
import Nav_bar from '../Components/Navigationbar.js';


const Cart_page = () => {
  return (
    <>
    <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
        <Nav_bar />
      </div>
    <Cart_product/>
    
    </>
  )
}

export default Cart_page