  
import express from 'express';
import createConnection from './connect.js';

const router_deleteProduct = express.Router();


router_deleteProduct.delete('/api/deleteProduct/:id', async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM products WHERE productID = ?";
    const values = [id];
    const db = await createConnection();
    try {
      const results = await db.query(query, values);
      res.status(200).json({ message: "Delete product complete" });
      
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with deleting process' });
    }
   
});

   
  

export default router_deleteProduct;