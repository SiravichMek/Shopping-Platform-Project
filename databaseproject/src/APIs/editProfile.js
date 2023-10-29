  
import express from 'express';
import createConnection from './connect.js';

const router_fetchProfile = express.Router();
const router_updateProfile = express.Router();

router_fetchProfile.post('/api/fetchProfile', async (req, res) => {
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
      console.log(results)}
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

router_updateProfile.post('/api/updateProfile', async (req, res) => {
    const {Name, newUsername, newPassword,  Address, Tel, Username, Password } = req.body;
    const userID = await getUserID(Username,Password);
    const query = 'UPDATE  users set Name = ?, Username = ?, Password = ?, Address = ?, Tel =? WHERE UserID = ?';
    const values = [Name ,newUsername, newPassword, Address, Tel, userID];
    const db = await createConnection();
      
      try {
        const results = await db.query(query, values);
        res.status(200).json({ message: "Update user data complete!"  });
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Occur some conflict with updating process' });
      }
     
  });

  // get userID from username and password
const getUserID = async (Username, Password) => {
  const db = await createConnection();
  const query = 'SELECT UserID FROM users WHERE Username = ? AND Password = ?';
  const values = [Username, Password];

  try {
    const results = await db.query(query, values);
    return results[0][0].UserID;
  } catch (err) {
    console.error('Error:', err);
  }
};

export 
{ router_fetchProfile,
  router_updateProfile
};