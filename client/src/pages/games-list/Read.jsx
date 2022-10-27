import { Link} from 'react-router-dom';

import Item from './components/Item';
import NavDashboard from './components/NavDashboard';

export default function Read({user, games, setDeleteId, setModalData, setGameIndex }) {
   

    return(
       
        <div className="read">
            <NavDashboard user={user} />
            <div className="container">
                <div className="read-table table-item-max">
                    <div className='table-header'>
                        <h2>Games list</h2>
                        <Link className="btn btn-create" to="/admin/games/new">Create new Game</Link>
                    </div>
                    <div className="title">
                        <div>No</div>
                        <div style={{ minWidth: '8rem' }}>Title</div>
                        <div style={{ minWidth: '8rem' }}>Type</div>
                        <div style={{ minWidth: '8rem' }}>Category</div>
                        <div>Author</div>
                        <div>Comments</div>
                        <div>Action</div>
                    </div>
                    <ul>
                    {
                    games.map((item, i) => <Item key={item.id} i={i} item={item} setGameIndex={setGameIndex} setDeleteId={setDeleteId} setModalData={setModalData} />)
                    }
                    </ul>
                </div>
            </div>
        </div>   
    )
}