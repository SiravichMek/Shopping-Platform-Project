import React from 'react';
import './Styles/index.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import './Styles/App.css';
// Below This is import page.
import Login from "./Pages/Login_page.js";
import Main from "./Pages/Main_page.js";
import Signup from "./Pages/Signup_page.js";
import Profile from "./Pages/Profile_page.js";

function App() {
  return (
    <div className="App">
      <Routes>
      {/* Start page when open. */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Added pages and set path. */}
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile/>}/>
      
      {/* Redirect page to 404 when url out of our url lists */}
      <Route path="/404" element={<Navigate to="/NotFoundPage" />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
