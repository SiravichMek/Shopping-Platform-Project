import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/createUser'; 

const Profileform =() =>{
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');

    const createUser = async () => {
        try {
          const response = await axios.post(apiUrl, {
            Username: sessionStorage.getItem('Username'),
            password: sessionStorage.getItem('Password'),
          });
          console.log('API Response:', response.data);
          // handle success or redirection here
        } catch (error) {
          console.error('API Error:', error.response.data);
          // handle error here
        }
      };
    return( 
    <>
        <h1>Profile Page</h1>
            <div className="container">
                <h1>Username: {sessionStorage.getItem('Username')}</h1>
                <div className="row-md-4">
                    <div className="col-md-12">
                        Profile Information
                    </div>
                </div>
            </div>
    </>
    );
};
export default Profileform;