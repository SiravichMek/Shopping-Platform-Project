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
        { name: 'User', href: '/admin_main', current: true },
        { name: 'Review', href: '/admin_review', current: false },
      ]
      const data_body = {
        Username: sessionStorage.getItem('Username'),
        Password: sessionStorage.getItem('Password'),
    };

      

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
    window.sessionStorage.removeItem('isLoggedInAdmin');
   
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
      <div className="mx-auto bg-black shadow-md rounded-b-md">
      <Disclosure as="nav" className="mx-auto  w-3/4 ">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-8 lg:px-12">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src="https://res.cloudinary.com/dygewdrju/image/upload/v1700127154/ShoppingPlatform/Untitled-2_nsjeqj.png"
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
                          item.current ? ' text-white' : 'text-white ',
                          'mt-2 rounded-md  text-lg font-bold'
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
                      <img
                        className="h-12 w-12s rounded-full"
                        src="https://media.istockphoto.com/id/1160027332/vector/creative-elegant-letter-a-vector-emblem.jpg?s=612x612&w=0&k=20&c=mWg1EQXXJmjtTIIwFyKqx7OS4HAA7UwdHhkkomSKB1s="
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                     
                      <Menu.Item>
                        
                          <p
                            
                            className="block px-4 py-2 text-lg text-white text-center font-medium"
                          >
                            Hello! Admin
                          </p>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-white hover:text-black ' : '', 'block px-4 py-2 text-sm text-white ')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              
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