  
import express from 'express';
import createConnection from './connect.js';

const router_addProduct = express.Router();

router_addProduct.post('/api/addProduct', async (req, res) => {
   
    try {
      const { Username, Password, Name, Description, Cost, Category } = req.body;
      const shopID = await getShopID(Username,Password);
      
      if(shopID==undefined){
        res.status(500).json({ error: 'Not have related shop ID' });
        return
      }
      const query = "INSERT INTO products (Name, Description, Cost, ShopID ,Category) VALUES (?, ?, ?, ?, ?) ";
      const values = [Name,Description,Cost,shopID,Category];
      const db = await createConnection();
      const results = await db.query(query, values);
      res.status(200).json({ message: "Add new product complete" });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with adding process' });
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
  

export default router_addProduct;