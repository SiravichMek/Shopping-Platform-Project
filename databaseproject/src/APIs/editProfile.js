  
import express from 'express';
import createConnection from './connect.js';

const router_fetchProfile = express.Router();
const router_updateProfile = express.Router();

router_fetchProfile.post('/api/fetchProfile', async (req, res) => {
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
          Password: results[0][0].Password.toString('utf8')
        };
        
      res.status(200).json({ data: userData });
      // console.log(results)
    }
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Occur some conflict with retrieving process' });
    }
   
});

router_updateProfile.post('/api/updateProfile', async (req, res) => {
    const {Name, newUsername, newPassword,  Address, Tel, Username, Password, Image} = req.body;
    const userID = await getUserID(Username,Password);
    const query = 'UPDATE  users set Name = ?, Username = ?, Password = AES_ENCRYPT(?, SHA1(?)), Address = ?, Tel =?, Image = ? WHERE UserID = ?';
    const values = [Name ,newUsername, newPassword, 'Password',Address, Tel, Image, userID];
    const query1 = 'select Username ,Password from users where Username = ?';
    const values1 = [newUsername];
    const db = await createConnection();
    
      try {
        const results = await db.query(query, values);
        const results1 = await db.query(query1, values1);
        const newdata = {
          'Username' : results1[0][0].Username,
          'Password' : results1[0][0].Password.toString('hex'),
        }
        res.status(200).json({ data: newdata});
      } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Occur some conflict with updating process' });
      }
     
  });

  // get userID from username and password
const getUserID = async (Username, Password) => {
  const db = await createConnection();
  const query = 'SELECT UserID FROM users WHERE Username = ? AND Password = UNHEX(?)';
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
  router_updateProfile,
};