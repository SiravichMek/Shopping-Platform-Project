import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
const apiUrl = 'http://localhost:3001/api/fetchShop';


const ShopBanner_coms = () => {
  const [shopname, setShopname] = useState('');
  const [shopimage, setShopimage] = useState('');
  const [productID, setProductID] = useState('');
  const [productID1, setProductID1] = useState('');
  const [description, setDescription] = useState('');
  const [responseData1, setResponseData1] = useState([]);
  const [responseData2, setResponseData2] = useState([]);

  const data_body = {
    Username: sessionStorage.getItem('Username'),
    Password: sessionStorage.getItem('Password'),
  };

  useEffect(() => {
    const FetchShopData = async () => {
      try {
        const response = await axios.post(apiUrl, data_body);
        setResponseData1(response.data.data.shopdata);
        setResponseData2(response.data.data.productdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    FetchShopData();
  }, []);

  useEffect(() => {
    if (responseData1.length > 0) {
      const shops = responseData1[0];
      setShopname(shops.Shopname);
      setShopimage(shops.Image);
      setDescription(shops.Description);
      setProductID1(shops.No_product);
    }
  }, [responseData1]);

  const handleDelete = async (event) => {
    try {
      const productId = event.target.id;
      setProductID(productId);
      console.log(productId);
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
            const deleteto = await axios.delete(`http://localhost:3001/api/deleteProduct/${productId}`);
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
            setTimeout(() => { window.location.href = '/manageshop'; }, 1000);
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };
  

  const handdleEdit = async (event) => {
    try {
      const productId = event.target.id;
      console.log(productId);
      sessionStorage.setItem('ProductID', productId);
      await axios.get(`http://localhost:3001/api/fetchSpecificProduct/${productId}`);
      if (productId !== '') {
        window.location.href = '/editproduct';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    
  return (
    <>
      <div className="relative overflow-hidden bg-gray-100 pb-20 pt-24 mt-16 lg:pb-24  ">
          <div className="mx-auto  w-[150rem] lg:max-w-none ">
          <div className=" xl:ml-[30rem] lg:items-center ">
                <div className="  shadow-xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-2/4 lg:flex-none">
                  <div className=" mx-auto  bg-white  py-5 sm:rounded-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                      <div className="flex items-center  gap-10  grid-row-1 grid-col-2">
                        <div className="object-left aspect-[4/4] ">
                        {shopimage ? (
  <img src={shopimage} alt="" className="h-auto max-w-[10rem]" />
) : (
  <img
    src="https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png"
    alt=""
    className="h-auto max-w-[10rem]"
  />
)}                        </div>
                        <div className="2">
                          <p className='text-lg font-medium mt-3'>{shopname}</p>
                          <p className='text-base font-light mt-3 text-left'>{description}</p>
                          <button className= 
                            "duration-300 flex mt-2 mr-auto shadow-lg border-black border-[0.1rem] text-black hover:text-white  hover:bg-black text-sm font-semibold leading-6  justify-center rounded-lg  px-2 py-0.5">
                            <a href="/editshop" > Edit shop </a>
                          </button>
                        </div>    
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>


        
        <div className="mx-auto max-w-full lg:max-w-none mt-10">
          <div className=" xl:ml-[25rem] lg:items-center">
            
          <div className="grid grid-row-3 grid-flow-col gap-5">
          <div className="text-xl font-medium ">Product List </div>
            <div ><button className= "duration-300 flex ml-[30rem] justify-center py-1.5 rounded-md border-green-700 border-[0.1rem] text-black hover:text-white  hover:bg-green-700 px-3  text-sm font-semibold leading-6  shadow-lg ">
              <a href="/addproducts">Add Product</a>
            </button>
            </div>
          </div>
          <div className="mt-1 text-md font-medium text-gray-500">Total product: {productID1}</div>

        
              
           
            {responseData2.map((products) => (
              <div className="mt-4 shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-3/4 lg:flex-none">
                <div className=" mx-auto  bg-white py-5 sm:rounded-3xl ">
                  <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                  <div className="grid grid-row-3 grid-flow-col gap-5  justify-center max-h-full items-center">
  
                  <div className="max-h-48">{products.Picture ? <img src={products.Picture} alt="Product" /> : <img src="https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png" alt="Product" />}  </div>
                  
                  <div className="w-[44rem]">
                  
                    <h3 className='text-lg font-medium'>{products.Name}</h3>
                 
                    <p className='text-sm font-light'>{products.Description}</p>
                  </div>
                  <div className="text-lg font-normal"><p className=''>฿{products.Cost}</p></div>
                  <div className="test1">
                  <button className="duration-300 flex mx-auto  justify-center rounded-md border-amber-400 border-[0.1rem] text-black hover:bg-amber-400 px-4 py-1  text-sm font-semibold leading-6 hover:text-white shadow-sm" id={products.ProductID} onClick={handdleEdit}>Edit</button>
                  </div>
                  <div className="test">
                  <button className="duration-300 flex mx-auto  justify-center rounded-md border-red-600 border-[0.1rem] text-black hover:bg-red-600 px-4 py-1   text-sm font-semibold leading-6 hover:text-white shadow-sm" id={products.ProductID} onClick={handleDelete}>Delete</button>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}

            </div>
          </div>
      </div>
     
      
          
                  
    </>
  )
}

export default ShopBanner_coms;