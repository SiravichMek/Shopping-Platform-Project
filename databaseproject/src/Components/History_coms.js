import React, { useEffect, useState } from 'react';
import axios from 'axios';
const History_coms = () => {
    const [responseData1, setResponseData1] = useState([]);
    const [reviewedProducts, setReviewedProducts] = useState([]);
    useEffect(() => {
        const getDataDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/history/${sessionStorage.getItem('Username')}/${sessionStorage.getItem('Password')}`);
            setResponseData1(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        getDataDetails();
      }, []); 
      
      const ReviewTest = (event, productID) => {
        event.preventDefault();
        sessionStorage.setItem('ProductID', productID);
        setTimeout(() => {window.location.href = '/review';}, 300);
      };
      const formatDate = (dateString) => {
        const options = { day:'2-digit', month:'2-digit', year:'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).split('/').join(':');
      };
      
    return (
      <>
        <div className="relative overflow-hidden bg-gray-100 pb-20 pt-24 lg:pb-24  ">
        <div className="mx-auto max-w-full lg:max-w-none ">
          <div className="mt-[4rem] mx-auto lg:ml-[30rem] lg:items-center">
           
 
                {responseData1.map((order, index) => (
          <div key={index} className="mt-12 shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-8/12 lg:flex-none">
              <div className="text-xl font-medium bg-black py-4 text-white sm:rounded-t-3xl text-center">Order {order.OrderID}</div>
            <div className=" mx-auto  bg-white py-5 sm:rounded-b-3xl ">
              <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                {order.Detail.map((product, productIndex) => (
                  <div key={productIndex} className="flex  gap-4 justify-center max-h-full items-center">
                    
                    <div className="w-[44rem] ">
                     
                      <h3 className='text-lg font-medium my-3'>- {product.Name}</h3>
                      <p className='text-sm font-light my-3 indent-8'>{product.Description}</p>
                      
                    </div>
                    <div className="text-lg font-normal ">฿{product.Cost*product.Quantity}</div>
                    
                    
                    <button
                    className="duration-200 border-orange-600 border-2 text-black hover:bg-orange-600 hover:text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all "
                    type="button"
                    onClick={(event) => {
                      ReviewTest(event, product.ProductID);
                    }}
                    
                  >
                    Review
                  </button>
            
            <div className="text-lg font-normal">
</div>
                  </div>

                ))}
                <div className="grid grid-col-2 w-2/12">
                <p className='  mx-auto my-3 bg-black text-white py-1 px-2   rounded-xl'>Time: {new Date(order.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                <p className='mx-auto  bg-black text-white py-1 px-2  rounded-xl '>Date: {formatDate(order.Date)}</p>
                
               
                </div>
               

                <div className="flex">
                <p className='ml-[45rem] text-lg font-medium '>Total: </p>
                <div className="text-lg font-medium  bg-black text-white px-5  mx-3  rounded-3xl"> 
                ฿{order.Total_cost}</div>
              </div>
              </div>
            </div>
            
          </div>
        ))}


                </div>
                
                </div>
                </div>
              
      </>
    );
  };
  
  
  export default History_coms;