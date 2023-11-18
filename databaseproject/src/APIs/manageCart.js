  
import express from 'express';
import createConnection from './connect.js';

const router_addQuantity = express.Router();
const router_minusQuantity = express.Router();
const router_deleteQuantity = express.Router();

// Add button
router_addQuantity.put('/api/addQuantity', async (req, res) => {
    const {ProductID,Username,Password} = req.body;
    const cartid = await getCartID(Username,Password);
    const old_quantity = await getQuantity(Username,Password,ProductID);
    const query = "UPDATE cart_product SET Quantity = ? WHERE CartID = ? AND ProductID = ? ";
    const values = [old_quantity+1,cartid,ProductID];
    const db = await createConnection();
    try {
      const results = await db.query(query, values);
      res.status(200).json({ message: "Add product by one to cart complete" });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with adding process' });
    }
   
});

// Minus button
router_minusQuantity.put('/api/minusQuantity', async (req, res) => {
  const {ProductID,Username,Password} = req.body;
  const cartid = await getCartID(Username,Password);
  const old_quantity = await getQuantity(Username,Password,ProductID);
  const query = "UPDATE cart_product SET Quantity = ? WHERE CartID = ? AND ProductID = ? ";
  const values = [old_quantity-1,cartid,ProductID];
  const db = await createConnection();
  try {
    const results = await db.query(query, values);
    res.status(200).json({ message: "Decreasing product by one to cart complete" });
    
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Occur some conflict with decreasing process' });
  }
 
});

// Delete button
router_deleteQuantity.put('/api/deleteQuantity/:id', async (req, res) => {
  const {Username,Password} = req.body;
  const productid = req.params.id;
  const cartid = await getCartID(Username,Password);
  const query = "DELETE FROM cart_product WHERE CartID = ? AND ProductID = ? ";
  const values = [cartid,productid];
  const db = await createConnection();
  try {
    const results = await db.query(query, values);
    res.status(200).json({ message: "Deleting product in cart complete" });
    
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Occur some conflict with deleting process' });
  }
 
});

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


   //get Quantity from ProductID and CartID
 const getQuantity = async (Username,Password,ProductID) => {
    const db = await createConnection();
  
    try {
        const cartid = await getCartID(Username,Password);
        const query = 'SELECT Quantity FROM cart_product WHERE CartID = ? AND ProductID = ?';
        const value =  [cartid,ProductID];
        const result = await db.query(query,value);
        return result[0][0].Quantity;
    } catch (err) {
      console.error('Error fetching the quantity of product:', err);
      return null;
    }
  };



export  {router_addQuantity,
        router_minusQuantity,
        router_deleteQuantity
        };