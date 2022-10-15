import { useState } from "react";
import { Link } from "react-router-dom";

import logout from '../../img/logout-line.svg';

export default function CreateAuthor({setCreateAuthorsData}) {

    const [author, setAuthor] = useState('');
 
const buttonHandler = () => {
    setCreateAuthorsData({
        author
    });
    setAuthor('');
}
    return(
        <div className="create" >
            <Link className='logo' to="/">
                <h3>Video Games Database</h3>
            </Link>
             <div className="nav-crud">
             <Link className='logout' to="/logout">
                 <img src={logout} alt="logout" />
                 </Link>
                <li>
                    <Link className="text-link" to="/admin/list" >Admin</Link>
                </li>
                    <span> &gt; </span>
                <li>
                    <h1>Developers List</h1>
                </li>
                    <span> &gt; </span>
                <li>
                    <h1>Create New Developer</h1>
                </li>

            </div>
            
            <div className="create-table" >
                <h2>Create New Developer</h2>

                <div className="form-container">
                <div className="formC" >

                    <div className="input name">
                        <label>Developer</label>
                        <input type="text" value={author}   onChange={e => setAuthor(e.target.value)}  />
                        
                    </div>
                 

            </div>
                <div className="input button">
                        <Link className="btn btn-save" to="/admin/developerList" onClick={buttonHandler} >Add</Link>
                    </div>

            </div>

            </div>
        </div>

    )
}