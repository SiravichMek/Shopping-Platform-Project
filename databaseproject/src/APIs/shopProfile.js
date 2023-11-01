import express from 'express';
import createConnection from './connect.js';

const router_fetchShop = express.Router();

router_fetchShop.post('/api/fetchShop', async (req, res) => {
  const { Username, Password } = req.body;
  const shopID = await getShopID(Username, Password);
  const query = 'SELECT * FROM shops WHERE ShopID = ?';
  const values = [shopID];
  const db = await createConnection();

  try {
    const shopResults = await db.query(query, values);
    //console.log(shopResults[0])
    // Call the function to fetch shop products 
    const productResult = await fetchShopProduct(Username, Password);
    const data ={
        shopdata: shopResults[0],
        productdata: productResult
    }
    res.status(200).json({ data: data });
    console.log(data)
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Occurred some conflict with the retrieving process' });
  }
});

const fetchShopProduct = async (Username, Password) => {
  const shopID = await getShopID(Username, Password);
  const query = 'SELECT * FROM products WHERE ShopID = ?';
  const values = [shopID];
  const db = await createConnection();

  try {
    const productResults = await db.query(query, values);
   //console.log('Product Data:', productResults[0]);

    // Send the second response from the function
    return  productResults[0];
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Occurred some conflict with the retrieving process' });
  }
};

//get ShopID from Username and Password
const getShopID = async (Username, Password) => {
  const db = await createConnection();

  try {
    const query = 'SELECT ShopID FROM users WHERE Username = ? AND Password = ?';
    const value = [Username, Password];
    const shopid = await db.query(query, value);
    return shopid[0][0].ShopID;
  } catch (err) {
    console.error('Error fetching the shopID:', err);
    return null;
  }
};

export default router_fetchShop;
