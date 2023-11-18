  
import express from 'express';
import createConnection from './connect.js';

const router_addProduct_cart = express.Router();


router_addProduct_cart.post('/api/addProduct_cart', async (req, res) => {
  
  const {ProductID,Username,Password} = req.body;
    const existProduct = await existed_product(ProductID,Username,Password);
    if(existProduct>=1){
      try {
        const cartid = await getCartID(Username,Password);
        const query = "UPDATE cart_product SET Quantity = ? WHERE CartID = ? AND ProductID = ?";
        const values = [existProduct+1,cartid,ProductID];
        const db = await createConnection();
        const results = await db.query(query, values);
        res.status(200).json({ message: "Update quantity of product in cart complete" });
        
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Occur some conflict with updating process' });
      }
    }
    else{
      try {
        const cartid = await getCartID(Username,Password);
        const query = "INSERT INTO cart_product (CartID, ProductID,Quantity) VALUES (?, ?, ?)";
        const values = [cartid,ProductID,1];
        const db = await createConnection();
        const results = await db.query(query, values);
        res.status(200).json({ message: "Insert product to cart complete" });
        
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Occur some conflict with adding process' });
      }
    
    }
  }
);


 //get CartID from Username and Password
 const getCartID = async (Username,Password) => {
    const db = await createConnection();
  
    try {
      const query = 'SELECT CartID FROM users WHERE Username = ? AND Password = UNHEX(?)';
      const value =  [Username, Password];
      const cartid = await db.query(query,value);
      return cartid[0][0].CartID;
    } catch (err) {
      console.error('Error fetching the cart ID:', err);
      return null;
    }
  };

  // Check existed product in cart
  const existed_product = async(ProductID,Username,Password) => {
    const db = await createConnection();
    try {
      const cartid = await getCartID(Username,Password);
      const query = 'SELECT Quantity FROM cart_product WHERE CartID = ? AND ProductID = ?';
      const value =  [cartid, ProductID];
      const result = await db.query(query,value);
      return result[0][0].Quantity;
    } catch (err) {
      console.error('Error fetching the quantity of product:', err);
      return null;
    }
  }

   
  

export default router_addProduct_cart;