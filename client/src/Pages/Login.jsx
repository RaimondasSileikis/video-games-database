import { useState } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Login({setLastUpdate}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const login = () => {
        axios.post('http://localhost:3001/login', {
            username : username,
            password: password,
        } )
          .then(res => {
           if (res.data.message) {
               setLoginStatus(res.data.message);
           } else {
                setLoginStatus(res.data);
                res.data[0].role === 'admin' ||
                res.data[0].role === 'moderator' ?
                navigate('/admin/games') :
                navigate('/');
                setLastUpdate(Date.now());
            }
        });
      };
 
const addUsername = e => {
    setUsername(e.target.value);
};
const addPassword = e => {
    setPassword(e.target.value);
};

    return(
  
        <div className='login'>
            <Link className='logo'  to="/">
                    <h1>Video Game Database</h1>
            </Link>

            <div className='reg-table'>
                <h2>Login</h2>
                <label>Username</label>
                <input type="text" onChange={addUsername} />
                <label>Password</label>
                <input type="password" onChange={addPassword} />
                <button className='btn-nav' onClick={login} >Login</button>

            </div>
            <div className='link-login'>
                <h2>{loginStatus}</h2>
                <h3>Don't have an account yet?</h3>
                <Link className='logout' to="/register" >
                    <h3>Register</h3>
                </Link>

            </div>
        </div>
    )
}