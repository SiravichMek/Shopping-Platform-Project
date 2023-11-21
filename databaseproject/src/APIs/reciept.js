  
import express from 'express';
import createConnection from './connect.js';
import getCurrentDate from './date.js';

const router_submitOrder = express.Router();
const router_getReceipt = express.Router();

router_submitOrder.post('/api/submitOrder', async (req, res) => {
   
    try {
      const { Username, Password } = req.body;
      const cartID = await getCartID(Username,Password);
      const Cur_Date = await getCurrentDate();
      
      if(cartID==undefined){
        res.status(500).json({ error: 'Not have related cart ID' });
        return
      }
      
      const db = await createConnection();
      const query0 = "SELECT Products.ProductID, Products.Name, Products.Description, Products.Cost, Products.Category, Products.Picture ,Quantity FROM cart_product JOIN Products ON cart_product.ProductID = Products.ProductID WHERE cart_product.CartID = ? ";
    const values0 = [cartID];  
    const results0 = await db.query(query0, values0);
    const results0JSON = JSON.stringify(results0[0]);  
    if(results0[0].length==0){
        res.status(500).json({ error: 'Not have product in cart' })
        return
      }

      const query3 = "SELECT Cost FROM carts WHERE CartID = ?";
      const values3 = [cartID];
      const results3 = await db.query(query3,values3);

      const query = "INSERT INTO `order` (CartID,Date,Detail,Total_cost) VALUES (?, ?, ?,?) ";
      const values = [cartID,Cur_Date,results0JSON,results3[0][0].Cost];
      const results = await db.query(query, values);

     
      const query2 = "DELETE FROM cart_product WHERE CartID = ?";
      const values2 = [cartID];
      const results2 = await db.query(query2,values2);

      const query5 = "UPDATE carts SET Cost=0 WHERE CartID = ?";
      const values5 = [cartID];
      const results5 = await db.query(query2,values2);


      res.status(200).json({ message: "Complete place order" });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with adding process' });
    }
   
});

router_getReceipt.get('/api/receipt/:Username/:Password', async (req, res) => {
  
  const db = await createConnection();
    const {Username,Password} = req.params;
    
    try {
        const cartid = await getCartID( Username, Password);
      const query = 'SELECT * FROM `order` WHERE CartID = ? ORDER BY OrderID DESC LIMIT 1';
      const values = [cartid];
      const results = await db.query(query,values);

      const query2 = 'SELECT Address FROM `users` WHERE Username = ? AND Password = UNHEX(?)';
      const values2 = [Username,Password];
      const results2 = await db.query(query2,values2);

      const resultAll = {
        'order': results[0],
        'address': results2[0]
      }
      res.status(200).json({ data: resultAll });
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
      const cartid = await db.query(query,value);
      return cartid[0][0].CartID;
    } catch (err) {
      console.error('Error fetching the cartID:', err);
      return null;
    }
  };
  

export { router_submitOrder,
  router_getReceipt};