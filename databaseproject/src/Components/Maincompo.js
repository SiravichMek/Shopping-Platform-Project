import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/card.css';

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
        <div>
            <h2>Data from Backend:</h2>
            {responseData.map((products) => (
                <div key={products.ProductID}>
                    <div className="container">
                        <div className="card-title">
                            <h1>{products.Name}</h1>
                        </div>
                        <div className="card-body">
                            <p>{products.Description}</p>
                            <p>{products.Cost}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Maincompo;
