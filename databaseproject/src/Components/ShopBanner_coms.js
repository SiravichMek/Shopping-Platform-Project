import { useEffect, useState} from "react"
import axios from "axios"
const apiUrl = 'http://localhost:3001/api/fetchShop'; 

const ShopBanner_coms = () => {
    const [shopname, setShopname] = useState('');
    const [description, setDescription] = useState('');
    const [responseData, setResponseData] = useState([]);
    
    const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
    };
    useEffect(() => {
        const FetchShopData = async () => {
          try {
            const response = await axios.post(apiUrl, data_body);
            setResponseData(response.data.data.shopdata);
            console.log(response)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        FetchShopData();
      }, []);

      useEffect(() => {
        if (responseData.length > 0 ) {
          const shops = responseData[0];
          setShopname(shops.Shopname);
          setDescription(shops.Description);
        }
      }, [responseData]);
  return (
    <>
    <div className="test">asdasdasd</div>
                    <div  className=" w-3/4 place-content-center p-auto shadow-lg  my-10">
                            <div className="text-center ">
                            <h3 className='text-xl mt-3'>{shopname}</h3>
                            <h3 className='text-xl mt-3'>{description}</h3>
                        
                        </div>
                    </div>
    </>
  )
}

export default ShopBanner_coms;