import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPinIcon} from '@heroicons/react/24/solid'

const Order_coms = () => {
  const [responseData, setResponseData] = useState([]);
  const [addresss, setAddresss] = useState();

  
  useEffect(() => {
  const getUserOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/receipt/${sessionStorage.getItem('Username')}/${sessionStorage.getItem('Password')}`);
      setResponseData(response.data.data.order);
      setAddresss(response.data.data.address[0].Address || 'asdsadasdasd');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  getUserOrder();
  
}, []);



  return (
    <>
    <div className="relative overflow-hidden  pb-20 pt-24 mt-16 lg:pb-24  bg-gray-200  min-h-screen">
          <div className="mx-auto  w-[150rem] lg:max-w-none ">
            
          <div className=" xl:ml-[29.5rem] lg:items-center ">
                <div className="  shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-6/12 lg:flex-none mt-[3rem]">
                <div className="bg-black  py-5 sm:rounded-t-3xl mx-auto text-white text-center text-2xl font-medium">Complete Order</div>
                  <div className=" mx-auto  bg-gray-100  py-5 sm:rounded-b-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                      <div className="flex items-center  gap-20  grid-row-1 grid-col-4 ml-[37rem] "></div>
                      <div className="text-xl font-medium ml-[3.5rem] my-3 flex">
                      
                     
                    
                        <MapPinIcon className="animate-bounce h-7 w-7 text-red-600"/>Address: {addresss}
                        </div>
                      {responseData.map((order, index) => (<div key={index} >
                
                {order.Detail.map((product, productIndex) => (
                  <div key={productIndex} className="grid grid-row-3 grid-flow-col gap-5 justify-center max-h-full items-center">
                    <div className="w-[44rem]">

                      <div className='text-lg font-medium'>- {product.Name}</div>
                      <div className='text-sm font-light indent-9'>{product.Description}</div>
                    </div>
                    <div className="text-lg font-normal my-8"><p className=''>฿{product.Cost*product.Quantity}</p></div>
                  </div>
                ))}
                 <hr className="mt-[3rem] mx-auto w-10/12 border-slate-500" />
                <div className="mt-[0.5rem] ml-[45rem] text-lg font-normal sm:rounded-b-3xl">Total: ฿{order.Total_cost}</div>
              </div>
          
        ))}
          </div>
         
          {/* <div >Total price: ฿{order.Total_cost}</div> */}
          </div>

          
          </div>
          </div>
          
          </div>
          </div>
          
    </>
  )
}

export default Order_coms
