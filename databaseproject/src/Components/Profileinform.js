import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/profile';

const Profileform = () => {
  const [responseData, setResponseData] = useState([]);
  const data = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
};
  const getUserData = async () => {
    try {
      const response = await axios.post(apiUrl, data);
      setResponseData(response.data.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // empty dependency array ensures the effect runs only once

  return (
    <>
      <h1>Profile Page</h1>
      <div className="container">
        <div className="row-md-4">
          <div className="col-md-12">Profile Information</div>
          
          <div>
            <h2>Data from Backend:</h2>
            {responseData.map((item) => (<div key={item.UserID}>
                <p>{item.UserID}</p>
                <p>{item.Name}</p>
                <p>{item.Username}</p>
                <p>{item.Password}</p>
                <p>{item.Tel}</p>
                <p>{item.Address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileform;
