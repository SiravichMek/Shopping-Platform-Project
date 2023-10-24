import createConnection from './connect.js';

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

export {
    updateUserCart
  };