import React, { useState } from 'react';

import { handleLogin } from '../APIs/auth.js';

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleLogin(user, password)) {
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
