import Item from './Item';
import { Link} from 'react-router-dom';
import logout from '../../img/logout-line.svg';


export default function Read({username, deleteComment, games, setDeleteId, setModalData }) {
    
    
    return(
    <>
       
        <div className="read" >
            <Link className='logo' to="/">
                <h3>Video Games Database </h3>
                <h3> {username}</h3>
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
                    <h1>Products list</h1>
                    
                </li>
            </div>

            <div className="nav-crud">
                <li>
                    <Link className="text-link list-link" to="/admin/developerList" >Developers List</Link>
                </li>
            
            </div>

            <div className="read-table" >
                <div className='table-header' >
                    <h2>Products list</h2>
                    <Link className="btn btn-create" to="/admin/new"  >Create new Product</Link>
                </div>
        
                <div className="title" >
                    <div>No</div>
                    <div style={{minWidth:'8rem'}} >Title</div>
                    <div style={{minWidth:'8rem'}} >Type</div>
                    <div style={{minWidth:'8rem'}} >Category</div>
                    <div>Author</div>
                    <div>Comments</div>
                    <div>Action</div>
                  
                </div>
        
        {games.length ? 
                <ul>
                {
                    games.map((item, i) => <Item deleteComment={deleteComment}  key={item.id} item={item} i={i + 1} setDeleteId={setDeleteId} setModalData={setModalData}/>)
                }

                </ul>
                :
                <h2>Please wait...Loading</h2>
        }
            </div>

        </div>




           
    </>
    );
}