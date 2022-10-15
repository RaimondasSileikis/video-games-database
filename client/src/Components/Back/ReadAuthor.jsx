import { Link} from 'react-router-dom';
import logout from '../../img/logout-line.svg';

export default function ReadAuthor({authors, setDeleteAuthorId}){


    return(
        
        <div className="read" >
            <Link className='logo' to="/">
                <h3>Games Database</h3>
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
            <h1>Developers list</h1>
            </li>
        </div>
        <div className="nav-crud">
            <li>
            <Link className="text-link list-link" to="/admin/list" >Products List</Link>
            </li>
            
        </div>

    <div className="read-table" >
            <div className='table-header' >
             <h2>Developers list</h2>
             <Link className="btn btn-create" to="/admin/newDeveloper"  >Create new Developer</Link>
            </div>
        
            <div>
                <div className="title" >
                    <div>No</div>
                    <div>Developer</div>
                </div>
            </div>
           
            <ul>
                {
                    authors.map((item, i) => <div key={item.id} >
                        
                    <div className="item-in-table" >
                        <div>{i + 1}</div>
                        <div>{item.author}</div>
                        
                        <button className="button btn-delete"  onClick={() => setDeleteAuthorId(item)} >DELETE</button>
                       
                    </div>
                        
                </div>)
                }

            </ul>

        </div> 

</div>

    )
}