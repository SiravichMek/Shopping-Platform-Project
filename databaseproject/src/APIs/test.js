import express from 'express';
import bodyParser from 'body-parser';
import createConnection from './connect.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/createUser', async (req, res) => {
  const { Name, Username, Password, confirmpassword, Address, Tel } = req.body;

  if (Password !== confirmpassword) {
    console.log('Password does not match');
    res.status(400).json({ error: 'Password does not match' });
  } else if (Password !== '' && confirmpassword !== '') {
    const db = await createConnection();
    const query = 'INSERT INTO users (Name, Username, Password, Tel, Address) VALUES (?, ?, ?, ?, ?)';
    const values = [Name, Username, Password, Tel, Address];
    
    try {
      const results = await db.query(query, values);
      console.log('Registration complete');
      res.status(200).json({ message: 'Registration complete' });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
