  
import express from 'express';
import createConnection from './connect.js';

const router_main = express.Router();

router_main.get('/api/main', async (req, res) => {
  
  const db = await createConnection();
    
    try {
      const query = 'SELECT * FROM products';
      const results = await db.query(query);
      res.status(200).json({ data: results[0] });
      console.log(results[0])
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

export default router_main;