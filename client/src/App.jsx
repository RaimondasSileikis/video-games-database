
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/main.scss';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';


import RequireAuth from "./Components/Back/RequireAuth";

import Login from './Pages/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Components/Back/Logout';



function App() {

  return (
    <div className="app">
      <BrowserRouter >
     <Routes>
       
     <Route path="/login"  element={<Login />} />
     <Route path="/logout"  element={<Logout />} />

       <Route path="/"  element={<Home show="all"/>} />
       <Route path="action" element={<Home show="action"/>} />
       <Route path="rpg" element={<Home show="rpg"/>} />
       <Route path="strategy" element={<Home show="shooter"/>} />
       <Route path="puzzle" element={<Home show="puzzle"/>} />
       <Route path="pc" element={<Home show="pc"/>} />
       <Route path="playstation" element={<Home show="playstation"/>} />
       <Route path="xbox" element={<Home show="xbox"/>} />
       <Route path="nintendo" element={<Home show="nintendo"/>} />


       <Route  path="/admin/*" element={

       <RequireAuth role='admin' >
          <Dashboard />
      </RequireAuth>} />

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
