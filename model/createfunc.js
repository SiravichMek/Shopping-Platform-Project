import db from './connect.js';

const createUser = (Data) => {
    const query = 'INSERT INTO users (UserID, Name, Username, Password, Tel, Address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [Data.UserID, Data.Name, Data.Username, Data.Password, Data.Tel, Data.Address];
  
    db.query(query, values, (err, results) => {
      if (err) {
        return console.error(err);
      }
      console.log('Insert Complete.');
    });
  };

  export {
    createUser
  };