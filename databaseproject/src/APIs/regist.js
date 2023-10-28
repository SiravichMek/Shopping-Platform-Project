import express from 'express';
import createConnection from './connect.js';

const router_regist = express.Router();

router_regist.post('/api/createUser', async (req, res) => {
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
      const link_cart = await createCart(Username,Password);
      const link_shop = await createShop(Username,Password);
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

// Create new ID for Cart and Shop //
// Insert and link new cart to new user
import getCurrentDate from './date.js';
const createCart = async(Username,Password) =>{
  const UserID = await getUserID(Username,Password);
  const Cur_Date = await getCurrentDate();
  const db = await createConnection(); 
  const query = 'INSERT INTO carts (Date) VALUES (?)';
  try {
    const results = await db.query(query, Cur_Date);
    console.log('Create New Cart Complete.');
    const CartID = await getLastRowInCarts();
    const linkData = await updateUserCart(UserID,CartID);
  } catch (err) {
    console.error('Error:', err);
  }
}

//createUser("SP2","SSSSPPPP2","8888882", "099888","xxxxxxxx")

//Insert and link new shop to new user

const createShop = async(Username,Password) =>{
  const UserID = await getUserID(Username,Password);
  const db = await createConnection(); 
  const query = 'INSERT INTO shops (Shopname,Description,Image) VALUES (?,?,?)';
  const values = [null,null,null];
  try {
    const results = await db.query(query, values);
    console.log('Create New Shop Complete.');
    const ShopID = await getLastRowInShops();
    const linkData = await updateUserShop(UserID,ShopID);
  } catch (err) {
    console.error('Error:', err);
  }
}


// Link foreign key function //
// Link user and cart
const updateUserCart = async(UserID,CartID) =>{
  const db = await createConnection(); 
  const query = "UPDATE users SET cartID = ? WHERE userID = ? ";
  const values = [CartID,UserID];
  try {
    const results = await db.query(query, values);
    console.log('Link User with Cart Complete.');
  } catch (err) {
    console.error('Error:', err);
  }

}

//Link user and shop
const updateUserShop = async(UserID,ShopID) =>{
  const db = await createConnection(); 
  const query = "UPDATE users SET ShopID = ? WHERE userID = ? ";
  const values = [ShopID,UserID];
  try {
    const results = await db.query(query, values);
    console.log('Link User with Shop Complete.');
  } catch (err) {
    console.error('Error:', err);
  }

}


// Fetch Function //
// get userID from username and password
const getUserID = async (Username, Password) => {
  const db = await createConnection();
  const query = 'SELECT UserID FROM users WHERE Username = ? AND Password = ?';
  const values = [Username, Password];

  try {
    const results = await db.query(query, values);
    //console.log('Retrieve ID Complete.', results);
    return results[0][0].UserID;
  } catch (err) {
    console.error('Error:', err);
  }
};

//get ID of the last row of cart
const getLastRowInCarts = async () => {
  const db = await createConnection();

  try {
    // Get the values of the last row in the 'carts' table
    const query = 'SELECT CartID FROM carts ORDER BY CartID DESC LIMIT 1';
    const lastRowID = await db.query(query);

    if (lastRowID) {
      return lastRowID[0][0].CartID;
    } else {
      console.error('No rows found in the carts table.');
      return null;
    }
  } catch (err) {
    console.error('Error fetching the last row from the carts table:', err);
    return null;
  }
};

//get ID of the last row of shop
const getLastRowInShops = async () => {
  const db = await createConnection();

  try {
    // Get the values of the last row in the 'carts' table
    const query = 'SELECT ShopID FROM shops ORDER BY ShopID DESC LIMIT 1';
    const lastRowID = await db.query(query);

    if (lastRowID) {
      return lastRowID[0][0].ShopID;
    } else {
      console.error('No rows found in the shops table.');
      return null;
    }
  } catch (err) {
    console.error('Error fetching the last row from the shops table:', err);
    return null;
  }
};

export default router_regist;
