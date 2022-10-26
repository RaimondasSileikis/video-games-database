import NavDashboard from './NavDashboard';

export default function ReadUsers({setEditUserData, users, setDeleteUserId, user}){


const changeRole = (e, item) => {
    setEditUserData({ role: e.target.value, id: item.id});
}

    return(
        
    <div className="read" >
        <NavDashboard user={user} />
        <div className="container">
        <div className="read-table table-item-min" >
            <div className='table-header' >
                <h2>Users list</h2>
                
            </div>
        
            <div>
                <div className="title item-4" >
                    <div>No</div>
                    <div>User Name</div>
                    <div>User Role</div>
                </div>
            </div>
           
            <ul>
                {
                    users.map((item, i) => <div key={item.id} >
                        
                    <div className="item-in-table item-4" >
                        <div>{i + 1}</div>
                        <div>{item.username}</div>
                        { item.role === user.role ? <div>{item.role}</div> :
                        <>
                            <div className="input type" >
                                <select value={item.role} onChange={ e => changeRole(e, item)} >
                                    <option value="visitor">visitor</option>
                                    <option value="moderator">Moderator</option>
                            
                                </select>
                            </div>
                        <button className="button btn-delete"  onClick={() => setDeleteUserId(item)} >DELETE</button>
                        </>}
                    </div>
                       
                </div>)
                }

            </ul>

        </div> 
    </div>
    </div>

    )
}