import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartComs = () => {
  const [responseData, setResponseData] = useState([]);
  const [productID, setProductID] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [isButtonDisabled1, setButtonDisabled1] = useState(false);
  const [isButtonDisabled2, setButtonDisabled2] = useState(false);

  const apiUrl1 = `http://localhost:3001/api/getProductCart`;
  const apiUrl2Add = `http://localhost:3001/api/addQuantity`;
  const apiUrl2Minus = `http://localhost:3001/api/minusQuantity`;
  

  const AddProductWithDelay = (productId) => {
    if (isButtonDisabled1) {
      return;
    }
    setButtonDisabled1(true);
    AddProduct(productId);
    setTimeout(() => {
      setButtonDisabled1(false);
    }, 800);
  };

  const MinusProductWithDelay = (productId) => {
    if (isButtonDisabled2) {
      return;
    }
    setButtonDisabled2(true);
    ReduceProduct(productId);
    setTimeout(() => {
      setButtonDisabled2(false);
    }, 800);
  };
  


  const data_body1 = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.post(apiUrl1, data_body1);
        setResponseData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      getProducts();
    }, []);

    
    useEffect(() => {
      if (responseData.length > 0) {
        const carts = responseData[0];
        setProductID(carts.ProductID);
      }
    
  }, [responseData]);
  

  const ReduceProduct = async (productId) => {
    try {
      const response = await axios.put(apiUrl2Minus, {
        ProductID: productId,
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
      });
      const updatedResponseData = responseData.map(async (product) => {
        if (product.ProductID === productId && product.Quantity >= 1) {
          product.Quantity -= 1;
          if (product.Quantity === 0) {
            try {
              await axios.put(`http://localhost:3001/api/deleteQuantity/${productId}`, data_body1);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              setTimeout(() => { window.location.href = '/cart'; }, 1000);
            } catch (error) {
              console.error('Error deleting quantity:', error);
            }
          }
        }
        return product;
      });
      const resolvedResponseData = await Promise.all(updatedResponseData);
      setResponseData(resolvedResponseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  
  

  const AddProduct = async (productId) => {
    try {
      const response = await axios.put(apiUrl2Add, {
        ProductID: productId,
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
      });
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    const updatedResponseData = responseData.map((item) => {
      
      if (item.ProductID === productId && item.Quantity >= 1) {
        item.Quantity += 1;
      }
     
      
      return item;
    });
    setResponseData(updatedResponseData);
  };
  
  const handleDelete = async (event) => {
    try {
      const productId = event.target.id;
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.put(`http://localhost:3001/api/deleteQuantity/${productId}`, data_body1);
            Swal.fire(
              'Deleted!',
              'Product has been deleted.',
              'success'
            );
            setTimeout(() => { window.location.href = '/cart'; }, 1000);
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };
  useEffect(() => {
    // Calculate the total cost when responseData changes
    const calculateTotalCost = () => {
      const sum = responseData.reduce((acc, cart) => acc + cart.Cost * cart.Quantity, 0);
      setTotalCost(sum);
    };

    calculateTotalCost();
  }, [responseData]);

  const getUserOrder = async () => {
    try {
      await axios.post('http://localhost:3001/api/submitOrder', data_body1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const HaddleUpdate = (event) => {
    event.preventDefault();
    if (totalCost){
    getUserOrder();
    Swal.fire({
      position: 'mid',
      icon: 'success',
      title: 'Ordered complete',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {window.location.href = '/recipe';}, 1500);
  }
  else {Swal.fire({
    position: 'mid',
    icon: 'warning',
    title: 'Warning',
    text: 'Empty cart',
    showConfirmButton: false,
    timer: 1500
  })}
  };

  // const totalproduct = async {}
  return (
    <>
      <div className="relative overflow-hidden  pb-20 pt-24 mt-16 lg:pb-24  ">
          <div className="mx-auto  w-[178rem] lg:max-w-none ">
          <div className=" xl:ml-[22rem] lg:items-center ">
                <div className="  shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl w-[71.5rem] lg:flex-none">
                  <div className=" mx-auto  bg-gray-100  py-5 sm:rounded-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                      <div className="flex items-center  gap-20  grid-row-1 grid-col-4 ml-[33rem]">
                        
                        
                          <div className='text-lg font-medium '>Unit Price</div>
                          <div className='text-lg font-medium '>Quantity</div>
                          <div className='text-lg font-medium '>Total Price</div>
                          <div className='text-lg font-medium '>Action</div>

                          

                      </div>
                    </div>
                  </div>
                </div>

                        
                        {responseData.map((carts) => (
              <div className="mt-5 shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-xl lg:w-[71.5rem] lg:flex-none">
                <div className=" mx-auto  bg-white py-3 sm:rounded-xl ">
                  <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                  <div className="flex grid-row-1 grid-col-5">
  
                  <div className="w-11">
                    <h3 className='flex text-lg font-medium whitespace-nowrap'>{carts.Name}</h3>
                    
                  </div>

                  <div className="grid grid-cols-4 gap-[4.5rem] ml-[30rem] content-right">                      
                    <div className="text-lg font-normal ">฿{carts.Cost}</div>
                    
                    <div className="flex gap-3 flex-row justify-start text-center">
                    <button
                          className="duration-300 text-lg font-medium flex mr-auto shadow-lg border-red-600 border-[0.1rem] text-black hover:text-white hover:bg-red-600  leading-6 justify-center rounded-md px-2 py-0.5"
                          onClick={() => MinusProductWithDelay(carts.ProductID)}
                          disabled={isButtonDisabled2}
                        >
                          -
                        </button>      
                      <div className="mt-1 text-lg font-regular text-gray-900">{carts.Quantity}</div>
                    <button
                          className="duration-300 text-lg font-medium flex mr-auto shadow-lg border-green-600 border-[0.1rem] text-black hover:text-white hover:bg-green-600 leading-6 justify-center rounded-md px-2 py-0.5"
                          onClick={() => AddProductWithDelay(carts.ProductID)}
                          disabled={isButtonDisabled1}
                        >
                          +
                        </button>                    
                        </div>
                    <div className="mt-1 text-lg font-regular text-gray-900">฿{carts.Cost*carts.Quantity}</div>
                    <button className="duration-300 text-md font-normal flex mr-auto shadow-lg border-red-600 border-[0.1rem] text-black hover:text-white  hover:bg-red-600  leading-6  justify-center rounded-md  px-2 py-0.5" id={carts.ProductID} onClick={handleDelete}>Delete</button>
                  </div>
                      </div>
                    </div>

                </div>
              </div>
            ))}
            <div className="  shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-t-3xl lg:w-7/12 lg:flex-none fixed bottom-0">
                  <div className=" mx-auto  bg-black  py-5 sm:rounded-t-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                      <div className="flex items-center  gap-20  grid-row-1 grid-col-4 ml-[37rem]">

                      <div className="text-lg font-medium text-white">Total Cost</div>
                      <div className="text-lg font-medium text-white ">฿{totalCost}</div>
                      <button onClick={HaddleUpdate} className="duration-300 flex mr-auto shadow-lg border-white border-[0.1rem] text-white hover:text-black  hover:bg-white  leading-6  justify-center rounded-md  px-2 py-0.5 w-[7rem]" >Place Order</button>
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

export default CartComs;