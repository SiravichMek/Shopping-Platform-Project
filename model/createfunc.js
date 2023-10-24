import createConnection from './connect.js';

// Insert new user on sign-up page
const createUser = async (Name, Username, Password, Tel, Address, Image) => {
  const db = await createConnection(); 
  const query = 'INSERT INTO users (Name, Username, Password, Tel, Address, Image) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [Name, Username, Password, Tel, Address, Image];

  try {
    const results = await db.query(query, values);
    console.log('Insert New User Complete.');
    const link = await createCart(Username,Password);
    return results;
  } catch (err) {
    console.error('Error:', err);
  }
};

// Insert and link new cart to new user
import getCurrentDate from '../utils/date.js';
import  {getUserID}  from './fetchfunc.js';
import  {updateUserCart}  from './updatefunc.js';
import { getLastRowInCarts } from './fetchfunc.js';

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

createUser("Mek Bruh","Mwwww","121212", "0999999","xxxxxxxx")

export {
  createUser
};
