import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/profile'; 

const Profileform =() =>{
    const [responseData, setResponseData] = useState(null);
    
    useEffect(() => {
        Logintest();
      }, []);
      
    const Logintest = async () => {
        try {
          const response = await axios.post(apiUrl, {
            Username: sessionStorage.getItem('Username'),
            Password: sessionStorage.getItem('Password'),
          });
          console.log('API Response:', response.data);
          // handle success or redirection here
        } catch (error) {
          console.error('API Error:', error.response.data);
          // handle error here
        }
      };

      
    return( 
    <>
        <h1>Profile Page</h1>
            <div className="container">
                
                <div className="row-md-4">
                    <div className="col-md-12">
                        Profile Information
                    </div>
                    <div>
      <button onClick={fetchData}>Fetch Data</button>
      
    </div>
                </div>
            </div>
    </>
    );
};
export default Profileform;