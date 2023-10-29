import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/login'; 

const LoginForm = () => {
  const [responseData, setResponseData] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const data_body = {
        Username: user,
        Password: password,
  }
  const login = async () => {
    try {
      const response = await axios.post(apiUrl, data_body);
      setResponseData(response.data.data);
      if (user !== '' && password !== '') {
        sessionStorage.setItem('Username', user);
        sessionStorage.setItem('Password', password);
        alert("Login Suscess"); 
        window.location.href = '/main';
       }
      
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
      alert("Fail");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
    
    
  };

  return (
    <div className="nav">
      <form onSubmit={handleSubmit}>
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
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <a href="/signup">Signup</a>
    </div>
  );
};

export default LoginForm;
