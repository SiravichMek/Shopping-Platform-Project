import createConnection from './connect.js';

// Insert new user on sign-up page
const createUser = async (Name, Username, Password, Tel, Address, Image) => {
  const db = await createConnection(); 
  const query = 'INSERT INTO users (Name, Username, Password, Tel, Address, Image) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [Name, Username, Password, Tel, Address, Image];

  try {
    const results = await db.query(query, values);
    console.log('Insert New User Complete.');
    const link_cart = await createCart(Username,Password);
    const link_shop = await createShop(Username,Password);
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

//createUser("SP2","SSSSPPPP2","8888882", "099888","xxxxxxxx")

//Insert and link new shop to new user
import { getLastRowInShops } from './fetchfunc.js';
import { updateUserShop } from './updatefunc.js';
const createShop = async(Username,Password) =>{
  const UserID = await getUserID(Username,Password);
  const Cur_Date = await getCurrentDate();
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

export {
  createUser
};
