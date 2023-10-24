import createConnection from './connect.js';

const createUser = async (Name, Username, Password, Tel, Address, Image) => {
  const db = await createConnection(); 
  const query = 'INSERT INTO users (Name, Username, Password, Tel, Address, Image) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [Name, Username, Password, Tel, Address, Image];

  try {
    const results = await db.query(query, values);
    console.log('Insert Complete.');
    return results;
  } catch (err) {
    console.error('Error:', err);
  }
};


export {
  createUser
};
