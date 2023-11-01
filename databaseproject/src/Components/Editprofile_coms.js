import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl1 = 'http://localhost:3001/api/fetchProfile';
const apiUrl2 = 'http://localhost:3001/api/updateProfile';

const Editproform = () => {
  const [responseData, setResponseData] = useState([]);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');

  const data_body1 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };
  
  const data_body2 = {
    Name: name,
    newUsername: user,
    newPassword: password,
    Address: address,
    Tel: telephone,
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };

  const getUserData = async () => {
    try {
      const response = await axios.post(apiUrl1, data_body1);
      setResponseData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const UpdateUser = async () => {
    try {
      const response = await axios.post(apiUrl2, data_body2);
      console.log('API Response:', response.data);
      if (user !== '' && password !== '') {
          sessionStorage.setItem('Username', data_body2.newUsername);
          sessionStorage.setItem('Password', data_body2.newPassword);
          alert("update successed");
          window.location.href = '/profile';
      } else {
          alert("Error");
      }
    } catch (error) {
      console.error('API Error:', error.response.data);
      alert("Error updating profile");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl1, data_body1);
        setResponseData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    UpdateUser();
  };

  useEffect(() => {
    if (responseData.length > 0 ) {
      const item = responseData[0];
      setName(item.Name);
      setUser(item.Username);
      setPassword(item.Password);
      setTelephone(item.Tel);
      setAddress(item.Address);
    }
  }, [responseData]);

  return (
    <>
      <h1>Profile Page</h1>
      <div className="container ">
        <div className="row-md-4">
          <div className="col-md-12">Profile Information</div>

          <div>
            <h2>Data from Backend:</h2>

            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />

                  <label htmlFor="username">Username</label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <label htmlFor="telephone">Telephone</label>
                  <br />
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <br />
                  <label htmlFor="address">Address</label>
                  <br />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <br />
                  <br />
                </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editproform;
