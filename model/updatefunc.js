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


//Edit shop
import { getShopID } from './fetchfunc.js';
const editShop = async(Shopname,Description,Image) =>{
  const shopid = await getShopID();
  const db = await createConnection(); 
  const query = "UPDATE shops SET Shopname = ?, Description = ?, Image= ? WHERE ShopID = ? ";
  const values = [Shopname,Description,Image,shopid];
  try {
    const results = await db.query(query, values);
    console.log('Update Shop Complete.');
  } catch (err) {
    console.error('Error:', err);
  }

}

export {
    updateUserCart,
    updateUserShop,
    editShop
  };