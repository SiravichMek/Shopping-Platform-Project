import { useEffect, useState} from "react"
import axios from "axios"
const apiUrl = 'http://localhost:3001/api/fetchShop'; 

const ShopBanner_coms = () => {
    const [shopname, setShopname] = useState('');
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

      
  return (
    <>
      <div  className="">
        <div className="text-center">
          <p className='text-xl mt-3'>{shopname}</p>
          <p className='text-xl mt-3'>{description}</p>
          <button className= 
          "flex mx-auto  justify-center rounded-md bg-red-600 px-3  text-sm font-semibold leading-6 text-white shadow-sm ">
              <a href="/editshop" >
                Create shop
              </a>
            </button>
            <div className="container mx-auto mt-32">
                <button className= 
            "flex mx-auto  justify-center rounded-md bg-red-600 px-3  text-sm font-semibold leading-6 text-white shadow-sm ">
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