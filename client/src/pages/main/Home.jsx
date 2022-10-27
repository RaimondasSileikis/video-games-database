import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import reducer from "./Reducers/reducer";
import { getDataFromServer} from "./Actions";

import Nav from './components/Nav';
import Search from './components/Search';

import Card from './components/Card';
import CardDetail from './components/CardDetail';
import GamesCategory from './components/GamesCategory';
import GamesSort from './components/GamesSort';


export default function Home({show, user}) {
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [listTableStatus, setListTableStatus] = useState(true);
    const [categoryStatus, setCategoryStatus] = useState(false);
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
            });
    }, [show, lastUpdate]);


    useEffect(() => {
        axios.get('http://localhost:3001/votes-list/')
            .then(res => {
                console.log(res.data);
                setVotes(res.data);
            });
    }, [lastUpdate]);

    //Sort
    const serverSort = (by, dir) => {
        axios.get('http://localhost:3001/games-list-sorted/?dir='+ dir + '&by=' + by)
        .then(res => {
            dispachGames(getDataFromServer(res.data));
        });
    };

    // Search
    const doSearch = e => {
        setSearch(e.target.value);
    };
   
    const submitSearch = e => {
        axios.get('http://localhost:3001/games-list-search/?s='+ search)
        .then(res => {
            dispachGames(getDataFromServer(res.data));
        });
    };

    const deleteSearch = e => {
        setSearch('')
        axios.get('http://localhost:3001/games-list/all' )
            .then(res => {
                console.log(res.data);
                dispachGames(getDataFromServer(res.data));
            });
    };

    const saveUserVotes = ( userId, gameId, voteCount) => {
        axios.post('http://localhost:3001/user-vote/', {user: userId, game: gameId, votecount: voteCount})
        .then(res => {
            setLastUpdate(Date.now());
        });
    };

    const saveVote = (id, value) => {
        axios.post('http://localhost:3001/games-vote/' + id, {vote: value})
        .then(res => {
            setLastUpdate(Date.now());
        });
    };

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
        filteredVotedGames.filter(vote => (vote.user === user.id)).length !== 0 ?
            setUserVoteStatus(1) :
            setUserVoteStatus(0);
        };

    const exitDetailHandler = e => {
        const element = e.target;
        if (element.classList.contains("shadow")) {
            setGameIndex(null);
        }
    };
   
    const cancelGameClickId = () =>{
        setGameIndex(null);
    };

    return(
        <>
            {
                view !== null ? view :
                <div className="home"   >
                    <Nav user={user} resetSort={deleteSearch} />
                    <Search  search={search} doSearch={doSearch} submitSearch={submitSearch} deleteSearch={deleteSearch}/>
                    <GamesCategory categoryStatus={categoryStatus} setCategoryStatus={setCategoryStatus}/>
                    <GamesSort serverSort={serverSort} dispachGames={dispachGames} setCategoryStatus={setCategoryStatus} categoryStatus={categoryStatus} />
                    <div className='display-options'>
                        <button  onClick={() => setListTableStatus(!listTableStatus)} className='btn-nav btn-list' ><span>Display</span>Options</button>
                    </div>
                    <div className="cards-list">
                        <div className={` ${listTableStatus ? 'cards-column' : 'cards-row'}`}>
                            {
                                games.map(game => <Card key={game.id} gameClick={gameClick} item={game} listTableStatus={listTableStatus} />)
                            }
                        </div>
                    </div>
                        {
                            gameIndex !== null && 
                            <CardDetail username={user.username} setUserVoteStatus={setUserVoteStatus} userVoteStatus={userVoteStatus}  saveUserVotes={saveUserVotes} userId={user.id}   saveVote={saveVote}  saveComment={saveComment}  cancelGameClickId={cancelGameClickId} game={games[gameIndex]} exitDetailHandler={exitDetailHandler}/>
                        }
                </div>
            }
        </>
    )
}