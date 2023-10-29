import React, { useEffect, useState } from 'react';
import axios from 'axios';


const apiUrl = 'http://localhost:3001/api/main';

const Maincompo = () => {
    const [responseData, setResponseData] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get(apiUrl);
            setResponseData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <h2>Data from Backend:</h2>
            <div className="product-container">
                
                {responseData.map((products) => (
                    <div key={products.ProductID} className="product-card">
                        <div className="container">
                                <div className="row">
                                <div className="card-title">
                                    <img src={products.Picture} />
                                </div>

                                <div className="card-body">
                                    <p>Product name: {products.Name}</p>
                                    <p>Description: {products.Description}</p>
                                    <p>Price: {products.Cost}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Maincompo;
