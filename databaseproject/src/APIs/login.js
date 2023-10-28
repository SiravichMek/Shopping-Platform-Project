  
import express from 'express';
import createConnection from './connect.js';

const router_login = express.Router();

router_login.post('/api/login', async (req, res) => {
  const { Username, Password } = req.body;
  const query = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
  const values = [Username, Password];
  const db = await createConnection();
    
    try {
      const results = await db.query(query, values);
      if(results[0].length==0){
        res.status(500).json({ error: 'Not have related user ID' })
      }
      else{
      res.status(200).json({ message: 'Login complete' });
      console.log(results)}
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

export default router_login;