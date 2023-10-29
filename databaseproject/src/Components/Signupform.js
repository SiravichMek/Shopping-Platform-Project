import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/createUser'; 

const SignupForm = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');

const data_body = {
  Name: name,
  Username: user,
  Password: password,
  confirmpassword: confirmPassword,
  Address: address,
  Tel: telephone,
}
const createUser = async () => {
  try {
    const response = await axios.post(apiUrl, data_body);
    console.log('API Response:', response.data);
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        alert("Password does not match");
      } else {
        alert("Create complete");
        window.location.href = '/login';
      }
    }
    // handle success or redirection here
  } catch (error) {
    console.error('API Error:', error.response.data);
    // handle error here
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  createUser();
  
};

  return (
    <div className="nav">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="user">User</label>
        <br />
        <input
          type="text"
          id="user"
          name="user"
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
        <label htmlFor="confirmpassword">Confirm Password</label>
        <br />
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;
