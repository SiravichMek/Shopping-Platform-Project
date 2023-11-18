 
import express from 'express';
import createConnection from './connect.js';

const router_review = express.Router();

router_review.post('/api/review', async (req, res) => {
  
  const db = await createConnection();
    const {Username,Password,ProductID,Title,Description,Rating} = req.body;
    
    try {
        const userid = await getUserID( Username, Password);
      const query = 'INSERT INTO reviews (Title, Description, Rating, UserID ,ProductID) VALUES (?, ?, ?, ?, ?) ';
      const values = [Title,Description,Rating,userid,ProductID];
      const results = await db.query(query,values);
      res.status(200).json({ data: "Add comment complete" });
      console.log(results[0])
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with adding process' });
    }
   
});


//get UserID from Username and Password
const getUserID = async (Username,Password) => {
  const db = await createConnection();

  try {
    const query = 'SELECT UserID FROM users WHERE Username = ? AND Password = UNHEX(?)';
    const value =  [Username, Password];
    const shopid = await db.query(query,value);
    return shopid[0][0].UserID;
  } catch (err) {
    console.error('Error fetching the user ID:', err);
    return null;
  }
};



export  default router_review;