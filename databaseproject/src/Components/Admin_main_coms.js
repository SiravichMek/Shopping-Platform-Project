import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Admin_coms = () => {
    const [responseData, setResponseData] = useState([]);


    const apiUrl = "http://localhost:3001/api/mainAdmin";



    useEffect(() => {
        const getUserinrow = async () => {
            try {
              const response = await axios.get(apiUrl);
              setResponseData(response.data.data);
    
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          getUserinrow();
    }, [])
  return (
    <>
    <div className="relative overflow-hidden  pb-20 pt-24 mt-16 lg:pb-24  ">
          <div className="mx-auto  w-[178rem] lg:max-w-none ">
          <div className=" xl:ml-[16rem] lg:items-center ">
                <div className="shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl w-[85rem] lg:flex-none">
                  <div className=" mx-auto  bg-gray-100  py-5 sm:rounded-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                    <div className="text-xl text-center mb-4">User in database</div>
                      <div className="flex items-center  grid-row-1 grid-col-4 mx-auto">
                        
                      
                      <table className="table-auto ">
                        
  <thead >
    <tr>
    <th className='px-12 py-4 border-2  border-black text-center'>UserID</th>
      <th className='px-12 py-4 border-2  border-black text-center'>Name</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Username</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Telephone</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Address</th>
    </tr>
  </thead>
  <tbody>
    {responseData.map((users, index) => (
      <tr key={index} >
        <td className='px-12 py-4 border-2 border-black text-center'>{users.UserID}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{users.Name}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{users.Username}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{users.Tel}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{users.Address}</td>
      </tr>
    ))}
  </tbody>
</table>


                          

                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
                </div> 
                        
                        
    </>
  )
}

export default Admin_coms