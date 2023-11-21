  
import express from 'express';
import createConnection from './connect.js';

const router_getProductCart = express.Router();


router_getProductCart.post('/api/getProductCart', async (req, res) => {
    const {Username,Password} = req.body;
    const cartid = await getCartID(Username,Password);
    const query = "SELECT Products.ProductID, Products.Name, Products.Description, Products.Cost, Products.Category, Products.Picture ,Quantity FROM cart_product JOIN Products ON cart_product.ProductID = Products.ProductID WHERE cart_product.CartID = ? ";
    const values = [cartid];
    const db = await createConnection();
    try {
      const results = await db.query(query, values);
      res.status(200).json({ data: results[0] });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

 //get ShopID from Username and Password
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


export default router_getProductCart;