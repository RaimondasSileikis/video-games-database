import { Link} from 'react-router-dom';

export default function Item({setDeleteId, item, i, setModalData, setGameIndex}){


const countComments = !item.comments ? 0 :
    item.comments.slice(0, -5).split('-^o^-,').length;

    return(
        
        <div className="item-in-table" >
            <div>{i + 1}</div>
            <div style={{minWidth:'8rem'}}>{item.title}</div>
            <div style={{minWidth:'6rem'}}>{['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Puzzle'][item.type - 1]} </div>
            <div style={{minWidth:'6rem'}}>{['PC', 'PlayStation', 'Xbox', 'Nintendo'][item.category - 7]} </div>
            <div>{item.author}</div>
            {
                countComments === 0 ? <div>{countComments}</div> :
                    <Link className="comment"  onClick={() =>setGameIndex(i)} to="/admin/comments" >Comments ({countComments})</Link>
            }
            <Link className="button btn-edit"  onClick={() =>setModalData(item)} to="/admin/games/edit" >EDIT</Link>
            <button className="button btn-delete"  onClick={()=>setDeleteId({id:item.id})} >DELETE</button>
        </div>
    )
}