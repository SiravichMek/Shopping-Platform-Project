import createConnection from './connect.js';

const readName = async (Username, Password) => {
  const db = await createConnection();
  const query = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
  const values = [Username, Password];

  try {
    const results = await db.query(query, values);
    console.log('Retrieve Complete.', results);
    return results;
  } catch (err) {
    console.error('Error:', err);
  }
};

export {
  readName
};
