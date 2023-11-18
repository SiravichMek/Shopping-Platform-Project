import React from 'react';
import './Styles/index.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import './Styles/App.css';
// Below This add is import page.
import Login from "./Pages/Login_page.js";
import Main from "./Pages/Main_page.js";
import Signup from "./Pages/Signup_page.js";
import Editshop from "./Pages/Editshop_page.js";
import Profile from "./Pages/Profile_page.js";
import Editprofile from "./Pages/Editprofile_page.js";
import Manageshop from "./Pages/Manageshop_page.js";
import Addproduct from "./Pages/Addproduct_page.js";
import Editproduct from "./Pages/Editproduct_page.js";
import Cart from "./Pages/Cart_page.js";
import Order from "./Pages/Order_page.js";
import Review from "./Pages/WriteReview.js";
import History from "./Pages/History_page.js";
import AdminMain from "./Pages/Admin_main_page.js";
import AdminReview from "./Pages/Admin_review_page.js";




import Notfound from "./Pages/Notfound_page.js";




function App() {
  const LoggedIn = window.sessionStorage.getItem("isLoggedIn")
  const LoggedInAdmin = window.sessionStorage.getItem("isLoggedInAdmin")
  return (
    
    <div className="App">
      <Routes>
      {/* Start page when open. */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Added pages and set path. */}
      <Route path="/login" element={LoggedIn?<Main /> :<Login />} />
      <Route path="/main" element={LoggedIn?<Main /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={LoggedIn?<Profile/> : <Login />}/>
      <Route path="/editshop" element={LoggedIn?<Editshop/> : <Login />} />
      <Route path="/editprofile" element={LoggedIn?<Editprofile/>: <Login />}/>
      <Route path="/manageshop" element={LoggedIn?<Manageshop/> : <Login />}/>
      <Route path="/addproducts" element={LoggedIn?<Addproduct/> : <Login />}/>
      <Route path="/editproduct" element={LoggedIn?<Editproduct/> : <Login />}/>
      <Route path="/cart" element={LoggedIn?<Cart/> : <Login />}/>
      <Route path="/recipe" element={LoggedIn?<Order/> : <Login />}/>
      <Route path="/review" element={LoggedIn?<Review/> : <Login />}/>
      <Route path="/history" element={LoggedIn?<History/> : <Login />}/>
      <Route path="/admin_main" element={LoggedInAdmin?<AdminMain/> : LoggedIn?<Main />: <Login />}/>
      <Route path="/admin_review" element={LoggedInAdmin?<AdminReview/> : LoggedIn?<Main />: <Login />}/>

      
      {/* Redirect page to 404 when url out of our url lists */}
      <Route path="/NotFoundPage" element={<Notfound/>}/>
      <Route path="/404" element={<Navigate to="/NotFoundPage" />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
