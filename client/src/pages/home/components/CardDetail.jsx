import { useState } from "react";
import starEmpty from '../../../assets/svg/star-line-yellow.svg';
import starFull from '../../../assets/svg/star.svg';
import starHalf from '../../../assets/svg/star-half-yellow.svg';
import starRating from '../../../assets/svg/star-rating.svg';
import noProduct from '../../../assets/images/no-product.jpeg';
import { useNavigate } from "react-router-dom";

export default function CardDetail({ username, setUserVoteStatus, userVoteStatus, saveUserVotes, userId, game, cancelGameClickId,  saveVote, saveComment, exitDetailHandler}) {
    
const [vote, setVote] = useState(5);
const [comment, setComment] = useState('');

const navigate = useNavigate();
   
const clickVote = () => {
    if (!userId) {
        navigate('/login');
    } else if (userVoteStatus === 0 ) {
            saveVote(game.id, vote);
            saveUserVotes( userId, game.id, vote);
            setUserVoteStatus(1);
    }
};

const clickComment = () => {
    saveComment(game.id, comment, username ? username : '' );
    setComment('');
};

const gameRating = (game.sum / game.count || 1).toFixed(2);

const getStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
        if (i<= gameRating ) {
            stars.push(<img alt="star" key={i + 'f'} src={starFull} />)
        }  if (i< gameRating && gameRating < (i + 1)) {
            stars.push(<img alt="star" key={i + 'h'}  src={starHalf} />)
        } if (i> gameRating && gameRating < (i + 1)) {
            stars.push(<img alt="star" key={i + 'e'}   src={starEmpty} />)
        }
    }
    return stars;
};
  
    return(
        <>
            <div className="card-modal shadow" onClick={exitDetailHandler}>
                <div key={game.id} className="detail-item" >
                    <h3>{game.title}</h3>
                    <div className="detail-item-type">
                        <h4>{['PC', 'PlayStation', 'Xbox', 'Nintendo'][game.category - 7]}</h4>
                        <h6>{['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Puzzle'][game.type - 1]}</h6>
                    </div>
                    <div className="detail-item-voite" >
                        <h5>Game Ratings: 
                            <span> {(game.sum / game.count || 1).toFixed(2)} ({game.count}) </span>
                            {getStars()}
                        </h5> 
                        <div className="detail-item-voiting">
                            {
                                userVoteStatus === 0 &&
                                <>
                                    <input type="number" min="1" max="10"  value={vote} onChange={e => setVote(e.target.value)}></input>
                                    <img src={starRating} alt="star rating" onClick={clickVote}/>
                                </> 
                            }
                        </div>   
                    </div>
                    <img src={game.photo !== null ? game.photo : noProduct} alt="game" />
                    <div className="description" >
                        <h3>Description: </h3>         
                        {game.about}
                    </div>
                    <div className="comments-write" >
                        <textarea onChange={e => setComment(e.target.value)} value={comment} placeholder="Comment" />
                        <button className="btn-comment"  onClick={clickComment}>Add Your Comments</button>
                        <h4>Comments: </h4>
                        {
                        !game.comments ? null :
                        game.comments.slice(0, -5).split('-^o^-,').map((comment, i) => <div className="comments-read" key={i}><p>{comment}</p></div>)
                        }
                    </div>
                </div>
                <button className="close-modal"  onClick={cancelGameClickId} >x</button>
            </div>
        </> 
    )
}