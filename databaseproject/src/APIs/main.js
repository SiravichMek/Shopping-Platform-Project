  
import express from 'express';
import createConnection from './connect.js';

const router_main = express.Router();
const router_main_cart = express.Router();
const router_main_image = express.Router();

router_main.get('/api/main', async (req, res) => {
  
  const db = await createConnection();
    
    try {
      const query = `SELECT 
                  products.ProductID,
                  Name,
                  products.Description,
                  Cost,
                  Picture,
                  Category,
                  AVG(reviews.Rating) AS Rating,
                  (
                      SELECT Title 
                      FROM reviews 
                      WHERE ProductID = Products.ProductID 
                      ORDER BY ReviewID DESC 
                      LIMIT 1
                  ) AS Review_title,
                  (
                      SELECT Description 
                      FROM reviews 
                      WHERE ProductID = Products.ProductID 
                      ORDER BY ReviewID DESC 
                      LIMIT 1
                  ) AS Review_description,
                  (
                      SELECT users.Username 
                      FROM reviews 
                      JOIN users ON reviews.UserID = users.UserID 
                      WHERE ProductID = Products.ProductID 
                      ORDER BY ReviewID DESC 
                      LIMIT 1
                  ) AS Review_Username
              FROM 
                  products
              JOIN 
                  reviews ON products.ProductID = reviews.ProductID
              GROUP BY 
                  products.ProductID;`;
      const results = await db.query(query);
      res.status(200).json({ data: results[0] });
      console.log(results[0])
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

router_main_cart.post('/api/main_cart', async (req, res) => {
  
  const db = await createConnection();
  const { Username, Password } = req.body;
    try {
      const cartid = await getCartID( Username, Password);
      const query = 'SELECT COUNT(cart_productID) as Quantity FROM cart_product WHERE CartID = ?';
      const values = [cartid];
      const results = await db.query(query,values);
      res.status(200).json({ data: results[0][0].Quantity });
      console.log(results[0][0].Quantity)
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

router_main_image.get('/api/main_image/:Username/:Password', async (req, res) => {
  
  const db = await createConnection();
  const { Username, Password } = req.params;
    try {
      const query = 'SELECT Image FROM users WHERE Username = ? AND Password = UNHEX(?)';
      const values = [Username, Password];
      const results = await db.query(query,values);
      res.status(200).json({ data: results[0] });
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



export  {router_main,
  router_main_cart,
  router_main_image};