import React, { useState } from 'react';

import { createUser } from '../assets/test';

const createUser = () =>  {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createUser(
      name,user, password,  telephone,address)) 
    {
      window.location.href = '/login';
    }
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
          value={confirmpassword}
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
