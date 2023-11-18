import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, LockClosedIcon, IdentificationIcon, HomeIcon, PhoneIcon, ArrowLeftIcon} from '@heroicons/react/24/solid'
import Swal from 'sweetalert2';

const Editproduct_page = () => {
    
    
    const apiUrl1 = `http://localhost:3001/api/fetchSpecificProduct/${sessionStorage.getItem('ProductID')}`;
    
    
      const [responseData, setResponseData] = useState([]);
      const [productID, setProductID] = useState('');
      const [productname, setProductname] = useState('');
      const [description, setDescription] = useState('');
      const [cost, setCost] = useState('');
      const [category, setCategory] = useState('');
    
      // const data_body1 = {
      //   Username: sessionStorage.getItem('Username'),
      //   Password: sessionStorage.getItem('Password'),
      // };
      
      const data_body2 = {
        Name: productname,
        Description: description,
        Cost: cost,
        Category: category,
      };
    
      
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(apiUrl1);
            setResponseData(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        if (responseData.length > 0 ) {
          const products = responseData[0];
          setProductID(products.ProductID);
        }
      }, [responseData]);

      const apiUrl2 = `http://localhost:3001/api/editProduct/${sessionStorage.getItem('ProductID')}`;
      const UpdateProduct = async () => {
        try {
          const response = await axios.put(apiUrl2, data_body2);
          console.log('API Response:', response.data);
          if (productname !== '' && description !== '' && cost !== '' && category !== '') {
              Swal.fire({
                position: 'mid',
                icon: 'success',
                title: 'Update complete',
                showConfirmButton: false,
                timer: 1000
              })
              setTimeout(() => {window.location.href = '/manageshop';}, 1500);
          } else {
              alert("Error");
          }
        } catch (error) {
          console.error('API Error:', error.response.data);
          alert("Error updating product");
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        UpdateProduct();
      };
    
      useEffect(() => {
        if (responseData.length > 0 ) {
          const Products = responseData[0];
          setProductname(Products.Name);
          setDescription(Products.Description);
          setCost(Products.Cost);
          setCategory(Products.Category);
          console.log(productname)
        }
      }, [responseData]);
    
      return (
        <>
          <div className="relative  bg-gray-100 pb-20 pt-[8rem] lg:pb-24 h-screen w-screen">
       <div className="mx-auto max-w-full lg:max-w-none">
         <div className="mx-auto lg:ml-[39.5rem] lg:items-center">
           <div className="relative z-10 -mx-4 shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none">
             <div className="relative bg-white px-4  sm:rounded-3xl sm:px-10">
              
               <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               <button ><a href='/manageshop'>
                  <ArrowLeftIcon className="pointer-events: none  h-6 w-6 text-black hover:text-indigo-600"/>
                  </a></button>
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Edit Product
                    </h2>
                  </div>

                  <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                      <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900 ">
                      Productname
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="productname"
                          name="productname"
                          value={productname}
                          placeholder="Enter a name"
                          onChange={(e) => setProductname(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 ">
                Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>



                    <div>
                      <label htmlFor="cost" className="block text-sm font-medium leading-6 text-gray-900 ">
                      Cost
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          id="cost"
                          name="cost"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                          placeholder="Enter a Cost"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
    
    export default Editproduct_page;