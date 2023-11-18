import { Fragment, useEffect, useState } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'
import axios from 'axios';
const Navigationbar = () => {
  const apiUrl = 'http://localhost:3001/api/main_cart'; 
  const [responseData, setResponseData] = useState();
  const [responseData1, setResponseData1] = useState();
  const [imageprofile, setImageprofile] = useState();
  const [quantity, setQuantity] = useState([]);
    const navigation = [
        { name: 'Fat Cart', href: '/main', current: true },
      ]
      const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
    };

      useEffect(() => {
        const FetchImage = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/main_image/${sessionStorage.getItem('Username')}/${sessionStorage.getItem('Password')}`);
            setResponseData1(response.data.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        FetchImage();
      }, []);

      useEffect(() => {
        if (responseData1) {
          setImageprofile(responseData1[0].Image);
          console.log()
          
        }
      }, [responseData1]);
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    
    const fetch_number = async() => { 
      try{
        const response = await axios.post(apiUrl, data_body)
        setResponseData(response.data.data);
      }
    catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetch_number();
    setQuantity(responseData)
  }, []);
        
  const handleLogout = () =>{
    window.sessionStorage.removeItem('Username');
    window.sessionStorage.removeItem('Password');
    window.sessionStorage.removeItem('ProductID');
    window.sessionStorage.removeItem('isLoggedIn');
    Swal.fire({
        position: 'mid',
        icon: 'success',
        title: 'Logout succeeded',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(() => {window.location.href = '/login';}, 1500);
    }
    return(
      <div className="mx-auto bg-white shadow-md rounded-b-md">
      <Disclosure as="nav" className="mx-auto  w-3/4 ">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-8 lg:px-12">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src="https://res.cloudinary.com/dygewdrju/image/upload/v1700127043/ShoppingPlatform/Untitled-1_ga70zt.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? ' text-black ' : 'text-black hover:bg-black',
                          'mt-2 text-xl font-bold '
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                

                {/* Profile dropdown */}
                <Menu as="div" className="relative mr-8">
                  <div>
                    <Menu.Button className="relative flex rounded-full  hover:ring-2 hover:ring-black">
                      <span className="absolute -inset-1" />
                      <span className="sr-only">Open user menu</span>
                      {imageprofile ? (
  <img
    className="h-12 w-12 rounded-full"
    src={imageprofile}
    alt=""
  />
) : (
  <img
    className="h-12 w-12 rounded-full"
    src="https://i.redd.it/9n0nspcldhu01.jpg"
    alt=""
  />
)}

                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/manageshop"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Shop
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="relative">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-200 p-2 text-black  hover:ring-2 hover:ring-black "
                >
                  <a href='/cart' className="relative">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View Cart</span>
                  <ShoppingCartIcon className="h-8 w-8" aria-hidden="true" />
                  </a>
                </button>
                <div className="z-40 absolute -top-[10px] left-[27px] rounded-full bg-red-600 px-2 text-white">{responseData}</div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
    
    )
};
export default Navigationbar;