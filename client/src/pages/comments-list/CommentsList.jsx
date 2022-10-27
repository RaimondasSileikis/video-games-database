import NavDashboard from "../games-list/components/NavDashboard"

export default function CommentsList({ game,  deleteComment, user }) {

    return(
         
        <div className="read" >
            <NavDashboard user={user} />
            <div className="container">
                <div className="read-table item-min" >
                    <div className='table-header' >
                        <div>
                            <h2>Coments in: </h2> 
                            <i>{game.title}</i>
                        </div>
                    </div>
                    <div className="title item-3" >
                        <div>No</div>
                        <div>Comment</div>
                    </div>
                    <ul>
                        {
                            !game.comments ? null :
                            game.comments.slice(0, -5).split('-^o^-,')
                            .map((item, i) => <div key={i} >
                                <div className="item-in-table item-3" >
                                    <div>{i + 1}</div>
                                    <div>{item}</div>
                                    <button className="button btn-delete"  onClick={() => deleteComment(game.cmtid.split(',')[i])}>DELETE</button>
                                </div>
                            </div>
                            ) 
                        }
                    </ul>
                </div> 
            </div>
        </div>
    )
}