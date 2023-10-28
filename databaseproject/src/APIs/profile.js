  
import express from 'express';
import createConnection from './connect.js';

const router_profile = express.Router();

router_profile.post('/api/profile', async (req, res) => {
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
        
      res.status(200).json({ data: results[0] });
      // console.log(results)
    }
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});


// const response = {
//   "data": [
//       {
//           "UserID": 32,
//           "Name": "Chawanakon",
//           "Username": "chaonai1",
//           "Password": "promsila",
//           "Tel": "asdasd",
//           "CartID": 1,
//           "ShopID": 1,
//           "Address": "asdasd",
//           "Image": null
//       }
//   ]
// }
// console.log(response.data[0].UserID)
export default router_profile;