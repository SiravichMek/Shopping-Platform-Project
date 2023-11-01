import { useEffect, useState} from "react"
import Swal from 'sweetalert2'
import axios from "axios"
const apiUrl = 'http://localhost:3001/api/fetchShop'; 

const ShopBanner_coms = () => {
    const [shopname, setShopname] = useState('');
    const [productID, setProductID] = useState('');
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
        if (responseData1.length > 0 ) {
          const shops = responseData1[0];
          setShopname(shops.Shopname);
          setDescription(shops.Description);
        }
      }, [responseData1]);

      useEffect(() => {
        if (responseData2.length > 0 ) {
          const products = responseData2[0];
          setProductID(products.ProductID);
        }
      }, [responseData2]);
      const handleDelete = async () => {
        try {
          const deleteto = await axios.delete(`http://localhost:3001/api/deleteProduct/${productID}`);
          console.log (productID)
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              setTimeout(() => {window.location.href = '/manageshop';}, 1000);
            }
          })
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  return (
    <>
      <div  className="">
        <div className="text-center">
          <p className='text-xl mt-3'>{shopname}</p>
          <p className='text-xl mt-3'>{description}</p>
          <button className= 
          "flex mx-auto  justify-center rounded-md bg-amber-500 px-3  text-sm font-semibold leading-6 text-white shadow-sm ">
              <a href="/editshop" >
                Create shop
              </a>
            </button>
            <div className="container mx-auto mt-32">
                <button className= 
            "flex mx-auto  justify-center rounded-md bg-green-700 px-3  text-sm font-semibold leading-6 text-white shadow-sm ">
                <a href="/addproducts" >
                  Add Product
                </a>
              </button>
            </div>
          <div className="container mx-auto mt-32">
            {responseData2.map((products, index) => (
              <div key={index} className=" ">
                <div className="text-center ">
                <h3 className=''>{products.Name}</h3>
                <p className=''>{products.Cost}</p>
                <p className=''>{products.Description}</p>
                <button className="flex mx-auto  justify-center rounded-md bg-amber-400 px-3  text-sm font-semibold leading-6 text-white shadow-sm" id={products.ProductID}><a >Edit</a></button>
                <br></br>
                <button className="flex mx-auto  justify-center rounded-md bg-red-600 px-3  text-sm font-semibold leading-6 text-white shadow-sm" id={products.ProductID} onClick={handleDelete}><a >Delete</a></button>
                <br></br>
                <br></br>
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