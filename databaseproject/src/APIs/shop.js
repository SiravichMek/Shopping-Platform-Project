  
import express from 'express';
import createConnection from './connect.js';

const router_shop = express.Router();

router_shop.post('/api/shop', async (req, res) => {
    const { Username, Password, Shopname, Description } = req.body;
    const shopID = await getShopID(Username,Password);
    const query = "UPDATE shops SET Shopname = ?, Description = ? WHERE ShopID = ? ";
    const values = [Shopname,Description,shopID];
  const db = await createConnection();
  
  console.log(req.body)
    try {
      const results = await db.query(query, values);
      res.status(200).json({ message: "Update data for shop" });
      console.log(results)
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with updating process' });
    }
   
});

    //get ShopID from Username and Password
const getShopID = async (Username,Password) => {
    const db = await createConnection();
  
    try {
      const query = 'SELECT ShopID FROM users WHERE Username = ? AND Password = ?';
      const value =  [Username, Password];
      const shopid = await db.query(query,value);
      return shopid[0][0].ShopID;
    } catch (err) {
      console.error('Error fetching the shopID:', err);
      return null;
    }
  };
  

export default router_shop;