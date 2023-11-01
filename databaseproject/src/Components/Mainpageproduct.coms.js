
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const apiUrl = 'http://localhost:3001/api/main';

const Maincompo = () => {
    const [responseData, setResponseData] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        try {
            const response = await axios.get(apiUrl)
            
            setResponseData(response.data.data);
            console.log(response.data.data);
            
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);
    
    return (
        <>
            
            <div  className="container mx-auto w-full ">
            
                <div className=" grid grid-cols-5 justify-items-center ">
                    {responseData.map((products, index) => (
                    <div key={index} className=" w-3/4 place-content-center p-auto shadow-lg  my-10">
                            <img src='https://idea7.co.uk/wp-content/uploads/2021/02/placeholder-250x250-1.png'/>
                            {/* <img src='https://dummyimage.com/300.png/09f/fff'/> */} 
                            <div className="text-center ">
                            <h3 className='text-xl mt-3'>{products.Name}</h3>
                            {/* <p>Description: {products.Description}</p> */}
                            <p className='text-2xl my-5'>฿{products.Cost}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Maincompo;
