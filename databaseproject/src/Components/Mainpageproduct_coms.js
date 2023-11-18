
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'



const apiUrl1 = 'http://localhost:3001/api/main';
const apiUrl2 = 'http://localhost:3001/api/addProduct_cart';



const Maincompo = () => {
    const [responseData, setResponseData] = useState([]);
    const [productID, setproductID] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleShowModal = (products) => {
      setSelectedProduct(products);
      setShowModal(true);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(apiUrl1)
                
                setResponseData(response.data.data);
                // console.log(response.data.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getProducts();
    }, []);
    
    const Addtoproduct = async (event, productId) => {
        try {
          setproductID(productId);
          sessionStorage.setItem('ProductID', productId); // Use the updated productId here
      
          const data_body = {
            Username: sessionStorage.getItem('Username'),
            Password: sessionStorage.getItem('Password'),
            ProductID: productId, // Use the updated productId here
          };
      
          if (productId !== '') {
            const response = await axios.post(apiUrl2, data_body);
            Swal.fire({
              position: "middle",
              icon: "success",
              title: "Product Added",
              showConfirmButton: false,
              timer: 700
            });
            setTimeout(() => {window.location.href = '/main';}, 1000);
            // console.log('Product added successfully', response);
          }
        } catch (error) {
          console.error('Error Adding data:', error);
        }
      };
      const filteredProducts = selectedCategory
  ? responseData.filter(product => product.Category === selectedCategory)
  : responseData;
      
    return (
        <>
             <div className="bg-neutral-200 ">
                
               <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="sr-only">Products</h2>
                  <div>
                    
                  <Menu as="div" className="relative mr-8">
                  <div>
                    <Menu.Button className="flex rounded-full">
                     
          
                    <p className="duration-300 flex mb-5 text-xl font-medium px-2 py-1 text-black border-2 border-black rounded-xl shadow-2xl hover:text-white hover:bg-black">
                      <AdjustmentsHorizontalIcon className="h-7 w-auto text-black hover:text-white" />
                        
                    </p>                    
                  </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    {/* start my fillter */}
                    <Menu.Items className="mb-4 flex grid-row-1 gap-2  right-0 px-4   w-[30rem] origin-top-right rounded-md bg-white py-3 text-lg text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item className="">
                        {({ active }) => (
                          <button className='duration-300 hover:bg-black rounded-xl hover:text-white px-3 py-1' onClick={() => setSelectedCategory('Furniture')}>Furniture</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className='duration-300 hover:bg-black rounded-xl hover:text-white px-3 py-1' onClick={() => setSelectedCategory('Electronic')}>Electronic</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className='duration-300 hover:bg-black rounded-xl hover:text-white px-3 py-1' onClick={() => setSelectedCategory('Clothes')}>Clothes</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className='duration-300 hover:bg-black rounded-xl hover:text-white px-3 py-1' onClick={() => setSelectedCategory('Shoes')}>Shoes</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className='duration-300 hover:bg-red-600 rounded-xl hover:text-white px-3 py-1' onClick={() => setSelectedCategory('')}>Clear</button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                    {/* End my fillter */}


                  </Transition>
                </Menu>
              </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {filteredProducts.map((products, index) => (
                      <a key={products.ProductID} href={products.href} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
  <div className="relative">
  {products.Picture ?
    <img src={products.Picture} alt={products.imageAlt}
    className="cursor-pointer h-full w-full object-cover object-center group-hover:opacity-75"
    />
    : <img src="https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png" 
    className="cursor-pointer h-full w-full object-cover object-center group-hover:opacity-75"
     alt="Product" />
  }
    <button
      className="duration-300 absolute bottom-4 right-[2.8rem] hover:bg-black hover:text-white font-bold  text-sm px-10 py-2 rounded shadow hover:shadow-lg "
      type="button"
      onClick={() => handleShowModal(products)}
      
    >
      See more details
    </button>
   
  </div>
  
  </div>
  <p className="mt-4 text-lg text-gray-700">{products.Name}</p>
    <p className="mt-1 text-xl font-medium text-gray-900">฿{products.Cost}</p>                        
     
  {showModal && selectedProduct && (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-[50rem] my-12 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              <p className="mt-4 text-xl text-gray-700">{selectedProduct.Name}</p>
              
              <p className="mt-1 text-sm text-gray-500">{selectedProduct.Category}</p>
              
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span> 
              
            </button>
            
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              <div className="text-md font-medium">Description</div>
              <p className="mt-1 text-sm text-gray-700">Rating {Number(selectedProduct.Rating).toFixed(1)}★</p>
            <p className="mt-1 text-sm text-gray-500">{selectedProduct.Description}</p>
            <p className="mt-3 text-xl font-medium text-gray-900">฿{selectedProduct.Cost}</p>
            </p>
           
          </div>


          <div className="relative p-4 flex-auto bg-gray-100 shadow-md">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              <div className="text-md font-medium">Latest Review</div>
            </p>
            <p className="mt-1 text-md font-normal text-gray-500">Title: {selectedProduct.Review_title}</p>
            <p className="mt-1 text-md font-normal text-gray-500">Description: {selectedProduct.Review_description}</p>
            <p className="mt-1 text-md font-normal text-gray-500">Name: {selectedProduct.Review_Username}</p>
          </div>

          
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            
            <button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="border-green-600 border-2 text-black hover:bg-green-600 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(event) => {
                Addtoproduct(event, selectedProduct.ProductID);
                setShowModal(false);
              }}
            >
              Add to carts
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
)}

                      </a>
                    ))}
                  </div>
                </div>
              </div>
        </>
    );
};

export default Maincompo;
