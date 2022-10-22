import { useState } from "react";
import { Link } from "react-router-dom";

import NavDashboard from './NavDashboard';

export default function CreateAuthor({setCreateAuthorsData, username}) {

    const [author, setAuthor] = useState('');
 
    const buttonHandler = () => {
        setCreateAuthorsData({
            author
        });
        setAuthor('');
    }
    return(
        <div className="create" >
             <NavDashboard username={username} />
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
                        <Link className="btn btn-save" to="/admin/developers" onClick={buttonHandler} >Add</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}