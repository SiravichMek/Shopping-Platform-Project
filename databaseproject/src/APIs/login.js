import express from 'express';
import createConnection from './connect.js';



const router_login = express.Router();

router_login.post('/api/login', async (req, res) => {
  const { Username, Password } = req.body;
  const query = 'SELECT * FROM users WHERE Username = ? AND Password = AES_ENCRYPT(?, SHA1(?))';
  const values = [Username, Password,'Password'];
  const db = await createConnection();
    
    try {
      const results = await db.query(query, values);
      if(results[0].length==0){
        res.status(500).json({ error: 'Not have related user ID' })
      }
      else{
        const data = {
          'Username' : results[0][0].Username,
          'Password' : results[0][0].Password.toString('hex')
        }
      res.status(200).json({data: data });
      console.log(results)}
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

export default router_login;