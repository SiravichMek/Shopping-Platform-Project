  
import express from 'express';
import createConnection from './connect.js';


const router_admin_main = express.Router();
const router_admin_review = express.Router();
const router_admin_review_delete = express.Router();

router_admin_main.get('/api/mainAdmin', async (req, res) => {
   
    try {
      const db = await createConnection();
      const query = "SELECT UserID,Name,Username,Tel,Address FROM users";
      
      const results = await db.query(query);
    
      res.status(200).json({ data: results[0] });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retriving process' });
    }
   
});

router_admin_review.get('/api/reviewAdmin', async (req, res) => {
   
    try {
      const db = await createConnection();
      const query = `SELECT 
      reviews.ReviewID,
      reviews.Title ,
      reviews.Description,
      reviews.Rating,
      users.Username AS ReviewerName,
      products.Name AS ProductName
  FROM 
      reviews
  JOIN 
      users ON reviews.UserID = users.UserID
  JOIN 
      products ON reviews.ProductID = products.ProductID;
  `;
      
      const results = await db.query(query);
    
      res.status(200).json({ data: results[0] });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retriving process' });
    }
   
});

router_admin_review_delete.delete('/api/reviewDeleteAdmin/:ReviewID', async (req, res) => {
   
    const {ReviewID} = req.params;
    try {
      const db = await createConnection();
      const query = "DELETE FROM reviews WHERE ReviewID=?";
      const values =[ReviewID]
      const results = await db.query(query,values);
    
      res.status(200).json({ message: "Delete Complete" });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with deleting process' });
    }
   
});
  

export { router_admin_main,
    router_admin_review,
    router_admin_review_delete};