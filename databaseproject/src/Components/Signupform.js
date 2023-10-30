import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

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
      if (password == confirmPassword) {
          Swal.fire({
            position: 'mid',
            icon: 'success',
            title: 'Signup complete',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {window.location.href = '/main';}, 1500);
      } 
    }
  } catch (error) {
    console.error('API Error:', error.response.data);
    Swal.fire({
      icon: 'error',
      title: 'Signup failed.',
      text: 'Password does not match',
    })
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  createUser();
  
};

  return (
    <>
      <div className="container h-full 2xl:w-1/4 lg:w-2/4 w-3/4 mx-auto mt-16">
          <div className="grid-rows-1">
          <div className="grid-cols-1">
          
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-16 shadow-2xl rounded-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                Name
              </label>
              <div className="mt-2 ">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
 		              value={name}
          	      onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

		          <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900 ">
                  Username
                </label>
                <div className="mt-2 ">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    autoComplete="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                Password
              </label>
              <div className="mt-2 ">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900 ">
                Confirm Password
              </label>
              <div className="mt-2 ">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900 ">
              Address
              </label>
              <div className="mt-2 ">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900 ">
              Telephone
              </label>
              <div className="mt-2 ">
                <input
                  id="Telephone"
                  name="Telephone"
                  type="text"
                  autoComplete="Tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Signup
              </button>
            </div>
          </form>

        </div>
      </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default SignupForm;
