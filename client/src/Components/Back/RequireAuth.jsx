import { useEffect, useState } from "react";

import axios from 'axios';
import { Link } from "react-router-dom";

 function  RequireAuth({ children, role, lastUpdate}) {


  const [view, setView] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/login-check' )
    .then(response => {
               
                if (role === response.data.user[0].role) {
                  setView(children);
                  
                } else {
                  setView(<div style={{ transform: 'translateX(20%)'}}>
                  <h2>{response.data.user}</h2><Link to="/" ><h3>Back to HomePage</h3></Link></div>)
                }
              })
        
          }, [children, role, lastUpdate]);
        
          return view;
        }
      
  export default RequireAuth;


  