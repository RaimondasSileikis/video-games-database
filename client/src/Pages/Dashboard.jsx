import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';


import ReadAuthor from "../Components/Back/ReadAuthor";
import Create from "../Components/Back/Create";
import CreateAuthor from "../Components/Back/CreateAuthor";
import Edit from "../Components/Back/Edit";
import Read from "../Components/Back/Read";
import CommentsList from '../Components/Back/CommentsList';

export default function Dashboard({user}){

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [createData, setCreateData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [modalData, setModalData] = useState(null);

    const [games, setGames] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const [createAuthorsData, setCreateAuthorsData] = useState(null);
    const [authors, setAuthors] = useState([]);
  
    const [deleteAuthorId, setDeleteAuthorId] = useState(null);

    const [gameIndex, setGameIndex] = useState('');

   

// axios.defaults.withCredentials = true;



 // Read games
 useEffect(() => {
  axios.get('http://localhost:3001/games-manager')
    .then(res => {
      console.log(res.data);
      setGames(res.data);
    })
}, [lastUpdate]);
   
 //Read Author
  useEffect(() => {
    axios.get('http://localhost:3001/games-authors')
        .then(res => {
            console.log(res.data);
            setAuthors(res.data);
        })
  }, [lastUpdate]);
  
  //Create
  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios.post('http://localhost:3001/games-manager', createData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });
  
  },[createData]);
  
  //Create Author
  useEffect(() => {
    if (null === createAuthorsData) {
      return;
    }
    axios.post('http://localhost:3001/games-authors', createAuthorsData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });
  
  },[createAuthorsData]);
  
 //Delete
      useEffect(() => {
        if (null === deleteId) {
          return;
        }
        axios.delete('http://localhost:3001/games-manager/' + deleteId.id, )
        .then(res => {
          console.log(res);
          setLastUpdate(Date.now());
        });
    
      },[deleteId])
  
    const deleteComment = id => {
      axios.delete('http://localhost:3001/games-delete-comment/' + id, )
        .then(res => {
          console.log(res);
          setLastUpdate(Date.now());
        });
    }

    //Delete AUTHOR
       useEffect(() => {
        if (null === deleteAuthorId) {
          return;
        }
        axios.delete('http://localhost:3001/games-manager-authors/' + deleteAuthorId.id,)
          .then(res => {
            console.log(res);
            setLastUpdate(Date.now());
          });
    
      }, [deleteAuthorId])

  //Edit
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3001/games-manager/' + editData.id, editData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });
  
  },[editData]);
  
 
    return(
    
      <Routes>
      <Route path="/games"  element={<Read deleteComment={deleteComment} games={games} setModalData={setModalData} setDeleteId={setDeleteId} setGameIndex={setGameIndex} username={user.username} />}/>
       <Route  path="/games/new"  element={<Create  setCreateData={setCreateData} authors={authors} username={user.username}/>}/>
       <Route  path="/games/edit"  element={<Edit  setEditData={setEditData} setModalData={setModalData} modalData={modalData} authors={authors} username={user.username} />}/>



       <Route  path="/developers"  element={<ReadAuthor setDeleteAuthorId={setDeleteAuthorId} authors={authors} username={user.username} />}/>

       
       <Route  path="/developers/new"  element={<CreateAuthor  setCreateAuthorsData={setCreateAuthorsData} username={user.username} />}/>

       <Route  path="/comments"  element={<CommentsList game={games[gameIndex]}  deleteComment={deleteComment}  username={user.username}/>}/>
       
      </Routes>

    )
}