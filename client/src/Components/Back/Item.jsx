import { Link} from 'react-router-dom';

export default function Item({setDeleteId, deleteComment, item, i, setModalData}){



    return(
        
            <div className="item-in-table" >
                <div>{i}</div>
                <div style={{minWidth:'8rem'}}>{item.title}</div>
                <div style={{minWidth:'6rem'}}>{['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Puzzle'][item.type - 1]} </div>
                <div style={{minWidth:'6rem'}}>{['PC', 'PlayStation', 'Xbox', 'Nintendo'][item.category - 7]} </div>
                <div>{item.author}</div>

                <div className="comments-list" >

                { 
                    item.comments ? item.comments.slice(0, -5).split('-^o^-,').map((c, i) => (
                        <li className='comment' key={i}>
                            {c}
                            <div >
                                <button className="button" type="button" onClick={() => deleteComment(item.cid.split(',')[i])}>Delete</button>
                            </div>
                        </li>
                        )) : null
                }
                </div>
           
      
             
                <Link className="button btn-edit" key={item} onClick={() =>setModalData(item)} to="/admin/edit" >EDIT</Link>
               
                <button className="button btn-delete"  onClick={()=>setDeleteId({id:item.id})} >DELETE</button>
             
            </div>

     

    )
}