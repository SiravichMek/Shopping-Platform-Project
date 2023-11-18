import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, LockClosedIcon, IdentificationIcon, HomeIcon, PhoneIcon, ArrowLeftIcon} from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
const apiUrl1 = 'http://localhost:3001/api/fetchProfile';
const apiUrl2 = 'http://localhost:3001/api/updateProfile';


const Editproform = () => {
  const [responseData, setResponseData] = useState();
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
      const response1 = await axios.post(apiUrl2, data_body2);
      console.log('API Response:', response1.data.data.Password);
      // console.log('API Response:', response.data);
      if (user !== '' && password !== '') {
          sessionStorage.setItem('Username', data_body2.newUsername);
          sessionStorage.setItem('Password', response1.data.data.Password);
          Swal.fire({
            position: 'mid',
            icon: 'success',
            title: 'Update complete',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {window.location.href = '/profile';}, 1500);
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
    if (responseData) {
      const item = responseData;
      setName(item.Name);
      setUser(item.Username);
      setPassword(item.Password);
      setTelephone(item.Tel);
      setAddress(item.Address);
    }
  }, [responseData]);
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 10); 
    const formattedPhoneNumber = input.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); 
    setTelephone(formattedPhoneNumber);
  };

  return (
    <>
     <div className="relative  bg-gray-100 pb-20 pt-[8rem] lg:pb-24 h-screen w-screen">
       <div className="mx-auto max-w-full lg:max-w-none">
         <div className="mx-auto lg:ml-[39.5rem] lg:items-center">
           <div className="relative z-10 -mx-4 shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none">
             <div className="relative bg-white px-4  sm:rounded-3xl sm:px-10">
              
               <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               <button ><a href='/profile'>
                  <ArrowLeftIcon className="pointer-events: none  h-6 w-6 text-black hover:text-indigo-600"/>
                  </a></button>
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Edit Profile
                    </h2>
                  </div>

                  <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Name
                      </label>
                      <div className="relative mt-2">
                      <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter a name"
                          value={name}
                          onChange={(e) => {
                            const nameInput = e.target.value;
                            const regex = /^[a-zA-Z0-9]*$/;
      
                            if (regex.test(nameInput)) {
                              setName(nameInput);
                            } else {
                              
                              Swal.fire({
                                title: "Warning",
                                text: "Special characters are not allowed.",
                                icon: "warning"
                              });
                            }
                          }}
                          required
                          className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3  
                          flex items-center pointer-events-none 
                          "> 
                          <IdentificationIcon className=" h-5 w-5 text-black"/>
                        </div>
                      </div>
                    </div>

                    <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900 ">
                  Username
                </label>
                <div className="relative mt-2">
                <input
                    id="user"
                    name="user"
                    type="text"
                    placeholder="Enter a username"
                    autoComplete="user"
                    value={user}
                    onChange={(e) => {
                      const userInput = e.target.value;
                      const regex = /^[a-zA-Z0-9]*$/;

                      if (regex.test(userInput)) {
                        setUser(userInput);
                      } else {
                        
                        Swal.fire({
                          title: "Warning",
                          text: "Special characters are not allowed.",
                          icon: "warning"
                        });
                      }
                    }}
                    required
                    className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div class="absolute inset-y-0 left-0 pl-3  
                          flex items-center pointer-events-none 
                          "> 
                          <UserIcon className=" h-5 w-5 text-black"/>
                    </div>
                </div>
              </div>



                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Password
                      </label>
                      <div className="relative mt-2">
                      <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter a password"
                          value={password}
                          onChange={(e) => {
                            const passInput = e.target.value;
                            const regex = /^[a-zA-Z0-9]*$/;
      
                            if (regex.test(passInput)) {
                              setPassword(passInput);
                            } else {
                              
                              Swal.fire({
                                title: "Warning",
                                text: "Special characters are not allowed.",
                                icon: "warning"
                              });
                            }
                          }}
                          required
                          className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div class="absolute inset-y-0 left-0 pl-3  
                          flex items-center pointer-events-none 
                          "> 
                          <LockClosedIcon className=" h-5 w-5 text-black"/>
                        </div>
                      </div>
                    </div>

            <div>
              <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900 ">
              Address
              </label>
              <div className="relative mt-2">
              <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => {
                    const adressInput = e.target.value;
                    const regex = /^[a-zA-Z0-9, /]*$/;

                    if (regex.test(adressInput)) {
                      setAddress(adressInput);
                    } else {
                      
                      Swal.fire({
                        title: "Warning",
                        text: "Special characters are not allowed.",
                        icon: "warning"
                      });
                    }
                  }}
                  required
                  className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 <div class="absolute inset-y-0 left-0 pl-3  
                          flex items-center pointer-events-none 
                          "> 
                  <HomeIcon className=" h-5 w-5 text-black"/>
                  </div>
              </div>
            </div>

            <div>
              <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900 ">
              Telephone
              </label>
              <div className="relative mt-2">
              <input
                   type="tel"
        		id="telephone"
        		name="telephone"
        		maxLength="12"
                  placeholder="Enter your number"
                  value={telephone}
        onChange={handlePhoneNumberChange}
                  required
                  className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div class="absolute inset-y-0 left-0 pl-3  
                          flex items-center pointer-events-none 
                          "> 
                  <PhoneIcon className=" h-5 w-5 text-black"/>
                  </div>
              </div>
            </div>
            
           


            <div>
                    <button
                      type="submit"
                      className="duration-300 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-00 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>

                  </form>
                  </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     
    </>
  );
};

export default Editproform;
