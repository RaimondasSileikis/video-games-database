import { useState } from 'react';
import {  Link, } from "react-router-dom";
import axios from 'axios';


export default function Register(){


    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordRepeat, setPasswordReapet] = useState('');
   
    const [regStatus, setRegStatus] = useState('');
    const [regInfo, setRegInfo] = useState(false);

    axios.defaults.withCredentials = true;

    const register = () => {
        if (usernameReg.length >= 3 &&
            passwordReg.length >= 6 &&
            passwordReg === passwordRepeat) {
            
 axios.post('http://localhost:3001/register', {
          username : usernameReg,
          password: passwordReg,
      } )
        .then(response => {
          console.log(response, response.status);
         
          if (response && response.data.message === '') {
              setRegStatus('Congratulations, your account has been successfully created.')
              setRegInfo(true)
          } else {
            setRegStatus(response.data.message)
            setRegInfo(false)
          }
        });

        } else if (usernameReg.length < 3 && passwordReg.length < 6 ) {
            setRegStatus('Username and password to short')
            setRegInfo(false)
        } else if (usernameReg.length < 3 && passwordReg.length >= 6 ) {
            setRegStatus('Username to short')
            setRegInfo(false)
        } else if (usernameReg.length >= 3 && passwordReg.length < 6 ) {
            setRegStatus('Password to short')
            setRegInfo(false)
        }else{
            setRegStatus('Passwords must match')
            setRegInfo(false)
        }
    };

const newUsername = e => {
    setUsernameReg(e.target.value.trim());
};
const newPassword = e => {
    setPasswordReg(e.target.value.trim())
};

const confirmPassword = e => {
    setPasswordReapet(e.target.value)
}

    return(
        <div className='login'>
            <Link className='logo'  to="/">
                    <h1>Video Game Database</h1>
            </Link>

            {regInfo === false &&
            <div className='reg-table'>
                <h2>Create Account</h2>
                <label>Username</label>
                <input type="text"  onChange={newUsername} placeholder='At least 3 characters' />
                <label>Password</label>
                <input type="password" onChange={newPassword}  placeholder='At least 6 characters'/>
                <label>Re-enter Password</label>
                <input type="password" onChange={confirmPassword}  />
                <button className='btn-nav' onClick={register}>Register </button>

            </div>
            } 

             <div className='link-login'>
                <h2>{regStatus}</h2>
                <h3>Alredy have an account?</h3>
                <Link className='logout' to="/login" >
                    <h3>Sign in</h3>
                </Link>
            </div>
        </div>
    )
}