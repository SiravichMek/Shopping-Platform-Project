import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { ArrowLeftIcon} from '@heroicons/react/24/solid'

const apiUrl = 'http://localhost:3001/api/addProduct'; 

const Addproducts_coms = () => {
    const [productname, setProductname] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [productimage, setProductimage] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
        Name: productname,
        Picture: imageBase64,
        Description: description,
        Cost: cost,
        Category: category,
    }

    const createProduct = async () => {
        try {
          const response = await axios.post(apiUrl, data_body);
          console.log('API Response:', response.data);
          if (data_body.Username !== '' && data_body.Password !== '') {
            if (data_body.Name !== '' && data_body.Cost !== '' && data_body.Category !== '') {
                Swal.fire({
                  position: 'mid',
                  icon: 'success',
                  title: 'Create product complete',
                  showConfirmButton: false,
                  timer: 1000
                })
                setTimeout(() => {window.location.href = '/manageshop';}, 1500);
            } 
          }
        } catch (error) {
          console.error('API Error:', error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'failed.',
            text: 'Can not create product',
          })
        }
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // When the reader is done reading the file, the result attribute contains the Base64 string
            setImageBase64(reader.result);
          };
          reader.readAsDataURL(file); // Read the file as a data URL (Base64 format)
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        createProduct();
        
      };

  return (
    <>
        <div className="container h-full 2xl:w-1/4 lg:w-2/4  mx-auto mt-16 w-full">
          <div className="grid-rows-1">
          <div className="grid-cols-1">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-16 shadow-2xl rounded-3xl">
          <button className='mb-8 -ml-[2.5rem]'><a href='/manageshop'>
                  <ArrowLeftIcon className="pointer-events: none  h-6 w-6 text-black hover:text-indigo-600"/>
                  </a></button>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <div className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add product
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>


          <div>
                      <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                        Image
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="file"
                          name="image"
                          type="file"
                          accept=".jpeg, .png, .jpg"
                          
                          onChange={handleImageChange}
                          className="pl-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                       
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Render your IdentificationIcon or any other component here */}
                        </div>
                      </div>
                      {imageBase64 && ( // Display the converted image as Base64
                        <div>
                          <p>Image Base64:</p>
                          <img src={imageBase64} alt="Uploaded" />
                        </div>
                      )}
                    </div>
        
            <div>
              <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900 ">
              Productname
              </label>
              <div className="mt-2">
                <input
                  id="productname"
                  name="productname"
                  type="text"
                  autoComplete="name"
 		              value={productname}
                  onChange={(e) => {
                    const productnameInput = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/; // Regex allowing only letters and numbers

                    if (regex.test(productnameInput)) {
                      setProductname(productnameInput);
                    } else {
                      
                      Swal.fire({
                        title: "Warning",
                        text: "Special characters are not allowed.",
                        icon: "warning"
                      });
                    }
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

		          <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 ">
                Description
                </label>
                <div className="mt-2 ">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="text"
                    value={description}
                    onChange={(e) => {
                      const descriptionInput = e.target.value;
                      const regex = /^[a-zA-Z0-9]*$/; // Regex allowing only letters and numbers
  
                      if (regex.test(descriptionInput)) {
                        setDescription(descriptionInput);
                      } else {
                        
                        Swal.fire({
                          title: "Warning",
                          text: "Special characters are not allowed.",
                          icon: "warning"
                        });
                      }
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 "
                  />
                </div>
              </div>

            <div>
              <label htmlFor="cost" className="block text-sm font-medium leading-6 text-gray-900 ">
              Cost
              </label>
              <div className="mt-2 ">
                <input
                  id="cost"
                  name="cost"
                  type="number"
                  autoComplete="tel"
                  value={cost}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 10); // Limit input to 10 characters
                    setCost(inputValue); // Update the 'cost' state with the limited value
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div>
              <select
                id="category"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected>
                  Choose a category
                </option>
                <option value="Clothes">Clothes</option>
                <option value="Shoes">Shoes</option>
                <option value="Electronic">Electronic</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>


            
            <div>
              <button
                type="submit"
                className="duration-300 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Create
              </button>
            </div>
          </form>

        </div>
      </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default Addproducts_coms