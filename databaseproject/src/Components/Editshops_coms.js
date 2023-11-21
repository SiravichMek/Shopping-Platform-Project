import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { ArrowLeftIcon, MapPinIcon} from '@heroicons/react/24/solid'

const apiUrl1 = 'http://localhost:3001/api/fetchPreviousShop'; 
const apiUrl2 = 'http://localhost:3001/api/shop'; 

const Createshop = () => {
  const [responseData, setResponseData] = useState([]);
  const [shopname, setShopname] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const data_body1 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };

const data_body2 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
    Shopname: shopname,
    Image: imageBase64,
    Description: description,
}

const UpdateShopData = async () => {
  try {
    const response = await axios.post(apiUrl2, data_body2);
    console.log('API Response:', response.data);
    if (shopname !== '' && description !== '') {
        Swal.fire({
          position: 'mid',
          icon: 'success',
          title: 'Update complete',
          showConfirmButton: false,
          timer: 1000
        })
        setTimeout(() => {window.location.href = '/manageshop';}, 1500);
    }
  } catch (error) {
    console.error('API Error:', error.response.data);
    // handle error here
  }
};

useEffect(() => {
  const FetchShopData = async () => {
    try {
      const response = await axios.post(apiUrl1, data_body1);
      setResponseData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  FetchShopData();
}, []);

const handleSubmit = (event) => {
  event.preventDefault();
  UpdateShopData();
  
};
const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // When the reader is done reading the file, the result attribute contains the Base64 string
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file); // Read the file as a data URL (Base64 format)
  }
};

useEffect(() => {
  if (responseData.length > 0 ) {
    const shops = responseData[0];
    setShopname(shops.Shopname);
    setDescription(shops.Description);
  }
}, [responseData]);

  return (
    <>
    <div className="relative overflow-hidden bg-gray-100 pb-20 pt-24 lg:pb-24 h-screen w-screen">
          <div className="mx-auto max-w-full lg:max-w-none">
          <div className="mx-auto lg:ml-[39.5rem] lg:items-center">
          <div className="relative z-10 -mx-4 shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none">
            
            <div className="relative bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
              
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
            <button className='mb-8 -ml-[2.5rem]'><a href='/manageshop'>
                  <ArrowLeftIcon className="pointer-events: none  h-6 w-6 text-black hover:text-indigo-600"/>
                  </a></button>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Edit shop
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>

                <div>
                      <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                        Image
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="file"
                          name="image"
                          type="file"
                          accept=".jpeg, .png, .jpg"
                          
                          onChange={handleImageChange}
                          className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                       
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Render your IdentificationIcon or any other component here */}
                        </div>
                      </div>
                      {imageBase64 && ( // Display the converted image as Base64
                        <div>
                          <p>Image Base64:</p>
                          <img src={imageBase64} alt="Uploaded" />
                        </div>
                      )}
                    </div>


                  <div>
                    <label htmlFor="shopname" className="block text-sm font-medium leading-6 text-gray-900">
                    Shopname
                    </label>
                    <div className="mt-2">
                      <input
                        id="shopname"
                        name="shopname"
                        type="text"
                        placeholder="enter a shopname"
                        required
                        value={shopname}
                        onChange={(e) => setShopname(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                     Description
                    </label>
                    <div className="mt-2">
                      <input
                        id="description"
                        name="description"
                        type="text"
                        required
                        placeholder="enter a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="duration-300 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

export default Createshop;
