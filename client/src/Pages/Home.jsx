import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { Link} from 'react-router-dom';
import reducer from "../Reducers/reducer";
import { getDataFromServer, sortClientHeightAsc, sortClientHeightDesc, } from "../Actions";

import Nav from '../Components/Front/Nav';
import Search from '../Components/Front/Search';

import Card from '../Components/Front/Card';
import CardDetail from '../Components/Front/CardDetail';



export default function Home({show, user}) {
const [lastUpdate, setLastUpdate] = useState(Date.now());
const [listTableStatus, setListTableStatus] = useState(true);
const [libraryStatus, setLibraryStatus] = useState(false);
const [search, setSearch] = useState('');

const [games, dispachGames] = useReducer(reducer, []);

const [gameIndex, setGameIndex] = useState(null);

const [votes, setVotes] = useState('');
const [userVoteStatus, setUserVoteStatus] = useState('');

const [view, setView] = useState(<div className='loading'/>)

axios.defaults.withCredentials = true;



useEffect(() => {
    if (gameIndex !== null){
    (document.querySelector('.app').style.overflow =  'hidden') &&
    (document.querySelector('.app').style.height = '100vh')
    } 
      else {(document.querySelector('.app').style.overflow =  'visible') && 
            (document.querySelector('.app').style.height = 'initial')  
    }
  }, [gameIndex]);

//Read

    useEffect(() => {
        axios.get('http://localhost:3001/games-list/' + show)
            .then(res => {
                console.log(res.data);
                dispachGames(getDataFromServer(res.data));
                res.data.length && setView(null)
            })
    }, [show, lastUpdate]);


    useEffect(() => {
        axios.get('http://localhost:3001/votes-list/')
            .then(res => {
                console.log(res.data);
                setVotes(res.data);
            })
    }, [lastUpdate]);

    //Sort
    const serverSort = (by, dir) => {
        axios.get('http://localhost:3001/games-list-sorted/?dir='+ dir + '&by=' + by)
        .then(res => {
            dispachGames(getDataFromServer(res.data));
        });
    }
    // Search

    const doSearch = e => {
        setSearch(e.target.value);
    }
    const iputSearch = e => {
        setSearch(e.target.value);
    }
    const submitSearch = e => {
        axios.get('http://localhost:3001/games-list-search/?s='+ search)
        .then(res => {
            dispachGames(getDataFromServer(res.data));
        });
    }

    const deleteSearch = e => {
        setSearch('')
        axios.get('http://localhost:3001/games-list/all' )
            .then(res => {
            console.log(res.data);
            dispachGames(getDataFromServer(res.data));
        });
    }
    const saveUserVotes = ( userId, gameId, voteCount) => {
        axios.post('http://localhost:3001/user-vote/', {user: userId, game: gameId, votecount: voteCount})
        .then(res => {
            setLastUpdate(Date.now());
        });
    }

     const saveVote = (id, value) => {
        axios.post('http://localhost:3001/games-vote/' + id, {vote: value})
        .then(res => {
            setLastUpdate(Date.now());
        });
    }

    const saveComment = (id, comment, username) => {
        axios.post('http://localhost:3001/games-comment/' + id, {comment: comment, cname: username})
        .then(res => {
            setLastUpdate(Date.now());
        });
    }

    const gameClick = (id) => {
         const findIndex = games.findIndex((game) => game.id === id)
       setGameIndex(findIndex);
   
     const filteredVotedGames = votes.filter(vote => vote.game === games[findIndex].id)
     filteredVotedGames.filter(vote => 
        (vote.user === user.id)).length !== 0 ?
            setUserVoteStatus(1) :
            setUserVoteStatus(0);
     };

     const exitDetailHandler = e => {
        const element = e.target;
        if (element.classList.contains("shadow")) {
            setGameIndex(null);
        }
    }
   
     const cancelGameClickId = () =>{
        setGameIndex(null);
     }

    return(
        <>
        {view !== null ? view :
        <div className="home"   >
            <Nav user={user} search={search} resetSort={deleteSearch}  serverSort={serverSort} doSearch={doSearch} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} dispachGames={dispachGames} ></Nav>
            <Search deleteSearch={deleteSearch} iputSearch={iputSearch} search={search} doSearch={doSearch} submitSearch={submitSearch} />

            <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
                <h1>Sort by game genre</h1>
                <Link className="text-link" to="/action" onClick={() => setLibraryStatus(!libraryStatus)}>Action</Link>
                <Link className="text-link" to="/rpg" onClick={() => setLibraryStatus(!libraryStatus)} >Rpg</Link>
                <Link className="text-link" to="/strategy" onClick={() => setLibraryStatus(!libraryStatus)} >Strategy</Link>
                <Link className="text-link" to="/puzzle" onClick={() => setLibraryStatus(!libraryStatus)} >Puzzle</Link>
                <Link className="text-link" to="/action" onClick={() => setLibraryStatus(!libraryStatus)} >Action</Link>
                <Link className="text-link" to="/action" onClick={() => setLibraryStatus(!libraryStatus)} >Action</Link>
                <h1>Sort by game platform</h1>
                <Link className="text-link" to="/pc" onClick={() => setLibraryStatus(!libraryStatus)} >Pc</Link>
                <Link className="text-link" to="/playstation" onClick={() => setLibraryStatus(!libraryStatus)} >Playstation</Link>
                <Link className="text-link" to="/xbox" onClick={() => setLibraryStatus(!libraryStatus)} >Xbox</Link>
                <Link className="text-link" to="/nintendo" onClick={() => setLibraryStatus(!libraryStatus)} >Nintento</Link>

            </div>

            <div className='list-title'>
                <button onClick={() => serverSort('title', 'asc')} className="btn-nav btn-sort-up"><span>Sort by </span>Name</button>
                <button onClick={() => serverSort('title', 'desc')}  className="btn-nav btn-sort-down"><span>Sort by </span>Name</button>
                <button onClick={() => dispachGames(sortClientHeightAsc())}  className="btn-nav btn-sort-up"><span>Sort by </span>Rating</button>
                <button onClick={() => dispachGames(sortClientHeightDesc())}  className="btn-nav btn-sort-down"><span>Sort by </span>Rating</button>
                <button onClick={() => setLibraryStatus(!libraryStatus)} className="btn-nav btn-category">Category</button>

            </div>

            <div className='display-options'>
                <button  onClick={() => setListTableStatus(!listTableStatus)} className='btn-nav btn-list' ><span>Display</span>Options</button>
            </div>

            <div className="cards-list">
                <div className={` ${listTableStatus ? 'cards-column' : 'cards-row'}`}>
            
                    {
                    games.map(game => <Card gameClick={gameClick} key={game.id} item={game}  listTableStatus={listTableStatus} />)
                 
                    }
                
                </div>
            </div>

            {gameIndex !== null   ?   <CardDetail username={user.username} setUserVoteStatus={setUserVoteStatus} userVoteStatus={userVoteStatus}  saveUserVotes={saveUserVotes} votes={votes} userId={user.id}   saveVote={saveVote}  saveComment={saveComment}  cancelGameClickId={cancelGameClickId} game={games[gameIndex]} exitDetailHandler={exitDetailHandler}/> : null}

            <footer><p>Copyright &#169; Video Games Database</p></footer>      

        </div>
    }
</>

    )
}