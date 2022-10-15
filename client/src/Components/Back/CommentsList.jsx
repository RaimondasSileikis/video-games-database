

export default function CommentsList({setDeleteId, deleteComment, item, setModalData}) {

 
    return(
        
      <div>
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

      </div>
    )
}