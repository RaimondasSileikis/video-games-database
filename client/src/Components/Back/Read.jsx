import Item from './Item';
import { Link} from 'react-router-dom';

import NavDashboard from './NavDashboard';


export default function Read({ username, deleteComment, games, setDeleteId, setModalData, setGameIndex }) {

     
    return(
    
        <div className="read" >

            <NavDashboard username={username}/>
        <div className="container">

            <div className="read-table table-item-max" >
                <div className='table-header' >
                    <h2>Games list</h2>
                    <Link className="btn btn-create" to="/admin/games/new"  >Create new Game</Link>
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
                    games.map((item, i) => <Item setGameIndex={setGameIndex} deleteComment={deleteComment}  key={item.id} item={item} i={i} setDeleteId={setDeleteId} setModalData={setModalData}/>)
                }

                </ul>
                :
                <h2>Please wait...Loading</h2>
                }

            </div>
            </div>
        </div>
        
   

    )
}