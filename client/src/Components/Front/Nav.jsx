import { Link } from "react-router-dom";
import login from '../../img/login.svg';
import Logout from "../Back/Logout";

export default function Nav({username, libraryStatus, setLibraryStatus, resetSort}){

    return(
        <div className="nav-home">
            <Link className="logo" to="/" onClick={resetSort}  >Video Games Database</Link>

            <div className="nav-right">
                <button onClick={() => setLibraryStatus(!libraryStatus)} className="btn-nav">Category</button>
            { !username 
            ? 
            <>
                <Link className='btn-nav' to="/login" >Sign in</Link>
                <Link className='btn-nav' to="/login" >Register</Link>
            </>
             : 
            <>
             <div className='logo'>{username}</div>
             <Link className='btn-nav' to="/logout" onClick={resetSort}  >Logout</Link>
             </> 
            }
                

            </div>
            
        </div>

    )
}