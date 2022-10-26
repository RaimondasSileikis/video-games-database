import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/main.scss';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

import Login from './Pages/Login';
import Register from './Pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Components/Back/Logout';


function App() {
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
 }, [lastUpdate])


  return (
    <div className="app">
      
      <BrowserRouter   >
        <Routes>
          <Route  path="/login"  element={<Login setLastUpdate={setLastUpdate}/>} />
          <Route path="/register"  element={<Register setLastUpdate={setLastUpdate}/>} />
          <Route path="/logout"  element={<Logout setUser={setUser} setLastUpdate={setLastUpdate} />} />

          <Route  path="/admin/*" element={<Dashboard user={user} />}/>

          <Route  path="/"  element={<Home user={user} show="all"/>} />
          <Route path="action" element={<Home user={user} show="action"/>} />
          <Route path="rpg" element={<Home user={user} show="rpg"/>} />
          <Route path="strategy" element={<Home user={user} show="shooter"/>} />
          <Route path="puzzle" element={<Home user={user} show="puzzle"/>} />
          <Route path="pc" element={<Home user={user} show="pc"/>} />
          <Route path="playstation" element={<Home user={user} show="playstation"/>} />
          <Route path="xbox" element={<Home user={user} show="xbox"/>} />
          <Route path="nintendo" element={<Home user={user} show="nintendo"/>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;