import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, LockClosedIcon, IdentificationIcon, HomeIcon, PhoneIcon, ArrowLeftIcon} from '@heroicons/react/24/solid'
const apiUrl = 'http://localhost:3001/api/profile';

const Profileform = () => {
  const [responseData, setResponseData] = useState(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');


  const data_body = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
};
  const getUserData = async () => {
    try {
      const response = await axios.post(apiUrl, data_body);
      setResponseData(response.data.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); 
  useEffect(() => {
    if (responseData) {
      const items = responseData;
      setName(items.Name);
      setUser(items.Username);
      setPassword(items.Password);
      setAddress(items.Address);
      setTelephone(items.Tel);
    
    }
  }, [responseData]);
  return (
    <>
       <div className="relative bg-gray-200 pb-20 pt-24  lg:pb-24 h-screen w-screen">
          <div className="mx-auto max-w-full lg:max-w-none">
            
          <div className="mx-auto lg:ml-[39.5rem] mt-[3rem] lg:items-center">
          <a href="/history" className='duration-300 ml-[34rem] border-2 border-black px-3 py-1 rounded-xl hover:bg-black hover:text-white text-md font-medium'>History</a>
          <div className="relative z-10 -mx-4 shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none mt-3">
            
            <div className="relative bg-white px-4 sm:rounded-3xl sm:px-10">
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
                  <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold leading-7 text-indigo-600">Profile</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
      </div>
      
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">User name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Password</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{password}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{address}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">telephone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{telephone}</dd>
          </div>
          <div className="pl-[13rem] pt-8 ">
          <button className='duration-300 rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline'>
            <a href="/editprofile">edit profile</a>
            </button>
          </div>
          

          
        </dl>
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

export default Profileform;
