  
import express from 'express';
import createConnection from './connect.js';

const router_history = express.Router();

router_history.get('/api/history/:Username/:Password', async (req, res) => {
  
  const db = await createConnection();
    const {Username,Password} = req.params;
    
    try {
        const cartid = await getCartID( Username, Password);
      const query = 'SELECT * FROM `order` WHERE CartID = ?';
      const values = [cartid];
      const results = await db.query(query,values);
      res.status(200).json({ data: results[0] });
      console.log(results[0])
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});


//get CartID from Username and Password
const getCartID = async (Username,Password) => {
  const db = await createConnection();

  try {
    const query = 'SELECT CartID FROM users WHERE Username = ? AND Password = UNHEX(?)';
    const value =  [Username, Password];
    const shopid = await db.query(query,value);
    return shopid[0][0].CartID;
  } catch (err) {
    console.error('Error fetching the cart ID:', err);
    return null;
  }
};



export  default router_history;