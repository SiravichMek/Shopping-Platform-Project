import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl1 = 'http://localhost:3001/api/fetchPreviousShop'; 
const apiUrl2 = 'http://localhost:3001/api/shop'; 

const Createshop = () => {
  const [responseData, setResponseData] = useState([]);
  const [shopname, setShopname] = useState('');
  const [description, setDescription] = useState('');

  const data_body1 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };

const data_body2 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
    Shopname: shopname,
    Description: description,
}

const UpdateShopData = async () => {
  try {
    const response = await axios.post(apiUrl2, data_body2);
    console.log('API Response:', response.data);
    if (shopname !== '' && description !== '') {
        alert("UPdate complete");
        window.location.href = '/manageshop';
    }
  } catch (error) {
    console.error('API Error:', error.response.data);
    // handle error here
  }
};

useEffect(() => {
  const FetchShopData = async () => {
    try {
      const response = await axios.post(apiUrl1, data_body1);
      setResponseData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  FetchShopData();
}, []);

const handleSubmit = (event) => {
  event.preventDefault();
  UpdateShopData();
  
};

useEffect(() => {
  if (responseData.length > 0 ) {
    const shops = responseData[0];
    setShopname(shops.Shopname);
    setDescription(shops.Description);
  }
}, [responseData]);

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

export default Createshop;
