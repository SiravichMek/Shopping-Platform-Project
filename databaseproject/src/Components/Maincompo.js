import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/products'; 

const Maincompo = () => {
    const [responseData, setResponseData] = useState();
    const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
    };
    const getProducts = async () => {
        try {
          const response = await axios.post(apiUrl, data_body);
          setResponseData(response.data.data);
        } catch (error) {
          // Handle error
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        getProducts();
      }, []); 
    return (
        <>
        {responseData.map((products) => (
        <div key={products.UserID}>
                <p>{products.UserID}</p>
                <p>{products.Name}</p>
                <p>{products.Username}</p>
                <p>{products.Password}</p>
                <p>{products.Tel}</p>
                <p>{products.Address}</p>
              </div>
            ))}
      </>
    );
  
};
  
  export default Maincompo;
  