import createConnection from './connect.js';

// get all data from username and password
const getInfoLogin = async (Username, Password) => {
  const db = await createConnection();
  const query = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
  const values = [Username, Password];

  try {
    const results = await db.query(query, values);
    console.log('Retrieve Complete.', results);
    return results[0];
  } catch (err) {
    console.error('Error:', err);
  }
};

// get all data from userID
const getInfoID = async (UserID) => {
  const db = await createConnection();
  const query = 'SELECT * FROM users WHERE UserID = ?';
  const values = [UserID];

  try {
    const results = await db.query(query, values);
    console.log('Retrieve Complete.', results);
    return results[0];
  } catch (err) {
    console.error('Error:', err);
  }
};

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
getLastRowInCarts();

export {
  getInfoLogin,
  getInfoID,
  getUserID,
  getLastRowInCarts
};
