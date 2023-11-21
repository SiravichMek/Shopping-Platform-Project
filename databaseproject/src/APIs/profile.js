  
import express from 'express';
import createConnection from './connect.js';


const router_profile = express.Router();

router_profile.post('/api/profile', async (req, res) => {
  const { Username, Password } = req.body;
  const query = 'SELECT Name,Username, AES_DECRYPT(Password, SHA1(?)) AS Password,Tel,Address FROM users WHERE Username = ? AND Password = UNHEX(?)';
  const values = ['Password', Username, Password];
  const db = await createConnection();
  
  
    try {
      const results = await db.query(query, values);
      if(results[0].length==0){
        res.status(500).json({ error: 'Not have related user ID' })
      }
      else{
      
        const userData = {
          Name: results[0][0].Name,
          Username: results[0][0].Username,
          Tel: results[0][0].Tel,
          Address: results[0][0].Address,
          Password: results[0][0].Password.toString('utf8'),
          Image:results[0][0].Image
         
        };
        
      res.status(200).json({ data: userData });
      // console.log(results)
    }
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});
export default router_profile;