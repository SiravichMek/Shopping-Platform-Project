import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/shop'; 

const SignupForm = () => {
  const [shopname, setShopname] = useState('');
  const [description, setDescription] = useState('');

const data_body = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  Shopname: shopname,
  Description: description,
}
const createShop = async () => {
  try {
    const response = await axios.post(apiUrl, data_body);
    console.log('API Response:', response.data);
    if (shopname !== '' && description !== '') {
        alert("UPdate complete");
        window.location.href = '/profile';
    }
  } catch (error) {
    console.error('API Error:', error.response.data);
    // handle error here
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  createShop();
  
};

  return (
    <div className="nav">
      <form onSubmit={handleSubmit}>
        <label htmlFor="shopname">Shopname</label>
        <br />
        <input
          type="text"
          id="shopname"
          name="shopname"
          value={shopname}
          onChange={(e) => setShopname(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input
          type="tel"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;
