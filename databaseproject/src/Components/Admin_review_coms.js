import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Admin_coms = () => {
    const [responseData, setResponseData] = useState([]);
    const [productID, setProductID] = useState('');

    const apiUrl = "http://localhost:3001/api/reviewAdmin";



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
            const deleteto = await axios.delete(`http://localhost:3001/api/reviewDeleteAdmin/${productId}`);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            setTimeout(() => { window.location.href = '/admin_review'; }, 1000);
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };
  return (
    <>
     <div className="relative overflow-hidden  pb-20 pt-24 mt-16 lg:pb-24  ">
          <div className="mx-auto  w-[178rem] lg:max-w-none ">
          <div className=" xl:ml-[16rem] lg:items-center ">
                <div className="shadow-md ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl w-[85rem] lg:flex-none">
                  <div className=" mx-auto  bg-gray-100  py-5 sm:rounded-3xl ">
                    <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                    <div className="text-xl text-center mb-4">Review in database</div>
                      <div className="flex items-center  grid-row-1 grid-col-4 mx-auto">
                        
                      
                      <table className="table-auto ">
                        
  <thead >
    <tr>
    <th className='px-12 py-4 border-2  border-black text-center'>ReviewID</th>
      <th className='px-12 py-4 border-2  border-black text-center'>Name</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Title</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Description</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Rating</th>
      <th className='px-12 py-4 border-2 border-black text-center'>Action</th>
    </tr>
  </thead>
  <tbody>
    {responseData.map((reviews, index) => (
      <tr key={index} >
        <td className='px-12 py-4 border-2 border-black text-center'>{reviews.ReviewID}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{reviews.ReviewerName}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{reviews.Title}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{reviews.Description}</td>
        <td className='px-12 py-4 border-2 border-black text-center'>{reviews.Rating}★</td>
        <th className='px-12 py-4 border-2 border-black text-center'><button className='duration-300 rounded-md border-[0.1rem] px-3 py-1 border-red-600 text-black text-sm font-normal hover:bg-red-600 hover:text-white' id={reviews.ReviewID} onClick={handleDelete}>Delete</button></th>
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