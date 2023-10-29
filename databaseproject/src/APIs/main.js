  
import express from 'express';
import createConnection from './connect.js';

const router_main = express.Router();

router_main.get('/api/main', async (req, res) => {
  const query = 'SELECT * FROM products';
  const db = await createConnection();
    
    try {
      const results = await db.query(query);
      res.status(200).json({ data: results });
      console.log(results)
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

export default router_main;