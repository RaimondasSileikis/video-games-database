import { Link} from 'react-router-dom';

import NavDashboard from '../../pages/games-list/components/NavDashboard';

export default function ReadAuthor({authors, setDeleteAuthorId, user}){


    return(
        <div className="read" >
            <NavDashboard user={user} />
            <div className="container">
                <div className="read-table table-item-min" >
                    <div className='table-header' >
                        <h2>Developers list</h2>
                        <Link className="btn btn-create" to="/admin/developers/new"  >Create new Developer</Link>
                    </div>
                    <>
                        <div className="title item-3" >
                            <div>No</div>
                            <div>Developer</div>
                        </div>
                    </>
                    <ul>
                    {
                        authors.map((item, i) => <div key={item.id} >
                            <div className="item-in-table item-3" >
                                <div>{i + 1}</div>
                                <div>{item.author}</div>
                                <button className="button btn-delete"  onClick={() => setDeleteAuthorId(item)} >DELETE</button>
                            </div>
                        </div>)
                    }
                    </ul>
                </div> 
            </div>
        </div>
    )
}