import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../Styles/main.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from '../../pages/home/Home';
import Dashboard from './Dashboard';
import Register from '../../pages/sign-up/Register';
import Login from '../../pages/sign-in/Login';
import Logout from '../../pages/logout/Logout';


export default function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [user, setUser] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() =>{
    axios.get('http://localhost:3001/login')
    .then((response) => {
        if ( response.data.loggedIn === true) {
          setUser(response.data.user[0])
          console.log(response.data);
        }
    })
 }, [lastUpdate]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register"  element={<Register/>} />
          <Route  path="/login"  element={<Login setLastUpdate={setLastUpdate}/>}/>
          <Route path="/logout"  element={<Logout/>} />

          <Route  path="/admin/*" element={<Dashboard user={user} />}/>
          
          <Route  path="/"  element={<Home user={user} show="all"/>} />
          <Route path="action" element={<Home user={user} show="action"/>} />
          <Route path="adventure" element={<Home user={user} show="adventure"/>} />
          <Route path="rpg" element={<Home user={user} show="rpg"/>} />
          <Route path="strategy" element={<Home user={user} show="shooter"/>} />
          <Route path="shooter" element={<Home user={user} show="shooter"/>} />
          <Route path="puzzle" element={<Home user={user} show="puzzle"/>} />
          <Route path="pc" element={<Home user={user} show="pc"/>} />
          <Route path="playstation" element={<Home user={user} show="playstation"/>} />
          <Route path="xbox" element={<Home user={user} show="xbox"/>} />
          <Route path="nintendo" element={<Home user={user} show="nintendo"/>} />
        </Routes>
      </BrowserRouter>
  )
};