import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { UserIcon, BookmarkIcon, NewspaperIcon, StarIcon, ArrowLeftIcon} from '@heroicons/react/24/solid'
const Review_coms = () => {
    const apiUrl = 'http://localhost:3001/api/review'; 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');


    const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
        Title: title,
        Description: description,
        Rating: rating,
        ProductID: sessionStorage.getItem('ProductID'),
      } 
      const createUser = async () => {
        try {
          const response = await axios.post(apiUrl, data_body);
          console.log('API Response:', response.data);
         
                Swal.fire({
                  position: 'mid',
                  icon: 'success',
                  title: 'Review complete',
                  showConfirmButton: false,
                  timer: 1000
                })
                setTimeout(() => {window.location.href = '/history';}, 1500);
           
        } catch (error) {
          console.error('API Error:', error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Signup failed.',
            text: 'Password does not match',
          })
        }
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        createUser();
        
      };
  return (
    <>
      <div className="relative overflow-hidden bg-gray-100 pb-20 pt-24 lg:pb-24 h-screen w-screen">
        
        <div className="mx-auto max-w-full lg:max-w-none ">
          <div className="mx-auto lg:ml-[39.5rem] lg:items-center">
            <div className="relative z-10 -mx-4 shadow-2xl ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none">
              <div className="relative bg-white px-4  sm:rounded-3xl sm:px-10">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  
                <button ><a href='/history'>
                  <ArrowLeftIcon className="pointer-events: none  h-6 w-6 text-black"/>
                  </a></button>
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Review 
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 ">
                    Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                    autoComplete="user"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>



                    <div>
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 ">
                        Description
                      </label>
                      <div className="mt-2">
                        <input
                          id="description"
                          name="description"
                          type="text"
                          placeholder="Enter a description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
              <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900 ">
              Rating
              </label>
              <div className="mt-2">
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  placeholder="Enter a rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  
              </div>
            </div>


            

            
            <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Send review
                    </button>
                  </div>

                  </form>
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

export default Review_coms