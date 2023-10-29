import React, { useState } from 'react';
import axios from 'axios';

const apiUrl1 = 'http://localhost:3001/api/profile'; 

const Editproform = () => {
    const [responseData, setResponseData] = useState([]);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');

const data_body = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
}

const editData = {
    Name: name,
    Username: user,
    Password: password,
    confirmpassword: confirmPassword,
    Address: address,
    Tel: telephone,
  }
  const getUserData = async () => {
    try {
      const response = await axios.post(apiUrl1, data_body);
      setResponseData(response.data.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };
// const createUser = async () => {
//   try {
//     const response = await axios.post(apiUrl, data_body);
//     console.log('API Response:', response.data);
//     if (password !== '' && confirmPassword !== '') {
//       if (password !== confirmPassword) {
//         alert("Password does not match");
//       } else {
//         alert("Create complete");
//         window.location.href = '/login';
//       }
//     }
//     // handle success or redirection here
//   } catch (error) {
//     console.error('API Error:', error.response.data);
//     // handle error here
//   }
// };

const handleSubmit = (event) => {
  event.preventDefault();
  getUserData();
//   createUser();
  
};

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

export default Editproform;
