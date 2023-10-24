import createConnection from './connect.js';

// Link user and cart
const updateUserCart = async(UserID,CartID) =>{
    const db = await createConnection(); 
    const query = "UPDATE users SET cartID = ? WHERE userID = ? ";
    const values = [CartID,UserID];
    try {
      const results = await db.query(query, values);
      console.log('Link User with Cart Complete.');
    } catch (err) {
      console.error('Error:', err);
    }
  
}

//Link user and shop
const updateUserShop = async(UserID,ShopID) =>{
    const db = await createConnection(); 
    const query = "UPDATE users SET ShopID = ? WHERE userID = ? ";
    const values = [ShopID,UserID];
    try {
      const results = await db.query(query, values);
      console.log('Link User with Shop Complete.');
    } catch (err) {
      console.error('Error:', err);
    }
  
}

export {
    updateUserCart,
    updateUserShop
  };