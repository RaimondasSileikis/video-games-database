import { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Login(){

    
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
       
    const [regStatus, setRegStatus] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();


    const register = () => {
      axios.post('http://localhost:3001/register', {
          username : usernameReg,
          password: passwordReg,
      } )
        .then(response => {
          console.log(response, response.status);
          if (response) {
              setRegStatus('Congratulations, your account has been successfully created.')

          }
        });
    };


    const login = () => {
        axios.post('http://localhost:3001/login', {
            username : username,
            password: password,
        } )
          .then(response => {
           if (response.data.message) {
               setLoginStatus(response.data.message);
           } else {
               setLoginStatus(response.data[0].username);
            (response.data[0].role == 'admin')
                ? navigate('/admin/list', { replace: true })
                : navigate('/', { replace: true });
                
           }
        });
      };
 

const newUsername = e => {
    setUsernameReg(e.target.value);
};
const newPassword = e => {
    setPasswordReg(e.target.value);
};
  
const addUsername = e => {
    setUsername(e.target.value);
};
const addPassword = e => {
    setPassword(e.target.value);
};

  
    return(
    <>
    
        <div className='registration'>

            {regStatus === '' && 
            <>
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text" onChange={newUsername} />
            <label>Password</label>
            <input type="text" onChange={newPassword} />
            <button onClick={register}>Register </button>
            </>}
            <h2>{regStatus}</h2>

        </div>
        <div className='login'>
            <h1>Login</h1>
            <label>Username</label>
            <input type="text" onChange={addUsername} placeholder='Username...' />
            <label>Password</label>
            <input type="text" onChange={addPassword} placeholder='Password...'/>
            <button onClick={login} >Login </button>
            <h2>Login status: {loginStatus}</h2>


            
        </div>
    </>

    )
}