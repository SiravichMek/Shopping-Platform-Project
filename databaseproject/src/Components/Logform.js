import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
//make website can scroll


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
        Swal.fire({
          position: 'mid',
          icon: 'success',
          title: 'Login succeeded',
          showConfirmButton: false,
          timer: 1000
        })
        setTimeout(() => {window.location.href = '/main';}, 1500);
         
       }
      
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
      // alert("Login failed. Please check your credentials and try again.");
      Swal.fire({
        icon: 'error',
        title: 'Login failed.',
        text: 'Please check your credentials and try again.',
      })
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
    
    
  };

  return (
    <>
        <div className="container h-full w-max mx-auto mt-24">
            <div className="grid-rows-1">
            <div className="grid-cols-1">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl rounded-3xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                  User name
                </label>
                <div className="mt-2 ">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-red-600 hover:text-red-700">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-red-600 hover:text-red-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
            </div>
            
            </div>
        </div>
      </>
  );
};

export default LoginForm;
