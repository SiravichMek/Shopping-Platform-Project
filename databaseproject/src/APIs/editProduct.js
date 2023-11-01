  
import express from 'express';
import createConnection from './connect.js';

const router_editProduct = express.Router();
const router_fetcchProduct = express.Router();

router_fetcchProduct.post('/api/fetchProduct', async (req, res) => {
    const { Username, Password } = req.body;
    const shopid = await getShopID(Username, Password);
    const query = 'SELECT * FROM Products WHERE ShopID = ?';
    const db = await createConnection();
      
      try {
        const results = await db.query(query, shopid);
        if(results[0].length==0){
          res.status(500).json({ error: 'Not have product' })
        }
        else{
        res.status(200).json({ data: results[0] });
        console.log(results)}
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Occur some conflict with retrieving process' });
      }
     
  });

router_editProduct.put('/api/editProduct', async (req, res) => {
    const { ProductID, Name, Description, Cost, Category } = req.body;
    const query = "UPDATE products SET Name =? ,Description =? ,Cost =? ,Category =? WHERE ProductID = ?";
    const values = [Name,Description,Cost,Category,ProductID];
    const db = await createConnection();
    try {
      const results = await db.query(query, values);
      res.status(200).json({ message: "Update product complete" });
      
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
  

export {
    router_editProduct,
    router_fetcchProduct
};