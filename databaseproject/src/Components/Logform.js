import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/login'; 

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const data_body = {
        Username: user,
        Password: password,
  }
  const login = async () => {
    try {
      const response = await axios.post(apiUrl, data_body);
      console.log('API Response:', response.data);
      // handle success or redirection here
    } catch (error) {
      console.error('API Error:', error.response.data);
      // handle error here
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (user !== '' && password !== '') {
      login();
      sessionStorage.setItem('Username', user);
      sessionStorage.setItem('Password', password);
      alert("Login Suscess");
      window.location.href = '/main';
    }
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
