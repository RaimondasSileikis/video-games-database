import NavDashboard from './NavDashboard';

export default function CommentsList({ game,  deleteComment, username }) {
console.log('gamesfdew', game);

    return(
          
        <div className="read" >
            <NavDashboard username={username} />
            <div className="container">
            <div className="read-table table-item-min" >
                <div className='table-header' >
                    <div>
                       <h2>Coments in:  </h2> 
                       <i>
                           {game.title}
                       </i>
                    </div>
                    
                </div>
            
            <div className="title" >
                <div>No</div>
                <div>Comment</div>
            </div>
            
            <ul>
                {
                    game.comments ? game.comments.slice(0, -5).split('-^o^-,').map((item, i) => <div key={i} >
                        
                    <div className="item-in-table item-3" >
                        <div>{i + 1}</div>
                        <div>{item}</div>
                        <button className="button btn-delete"  onClick={() => deleteComment(game.cid.split(',')[i])}>DELETE</button>
                    </div>
                        
                    </div>) : null
                }
            </ul>
        </div> 
        </div>
    </div>

    )
}