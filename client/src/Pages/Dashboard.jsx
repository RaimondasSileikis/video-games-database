import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';


import ReadAuthor from "../Components/Back/ReadAuthor";
import Create from "../Components/Back/Create";
import CreateAuthor from "../Components/Back/CreateAuthor";
import Edit from "../Components/Back/Edit";
import Read from "../Components/Back/Read";
import CommentsList from '../Components/Back/CommentsList';

export default function Dashboard(){



    const [lastUpdate, setLastUpdate] = useState(Date.now());// state
    const [createData, setCreateData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [modalData, setModalData] = useState(null);

    const [games, setGames] = useState([]);
    const [deleteId, setDeleteId] = useState(null);

    const [createAuthorsData, setCreateAuthorsData] = useState(null);
    const [authors, setAuthors] = useState([]);
  
    const [deleteAuthorId, setDeleteAuthorId] = useState(null);


 
const [username, setUsername] = useState('');


axios.defaults.withCredentials = true;

useEffect(() =>{
    axios.get('http://localhost:3001/login')
    .then((response) => {
        if (response.data.loggedIn == true) {
          setUsername(response.data.user[0].username);  
          console.log(response.data); 
        }
    })
}, [])

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
      <Route path="/list"  element={<Read username={username} deleteComment={deleteComment} games={games} setModalData={setModalData} setDeleteId={setDeleteId} />}/>
       <Route  path="/new"  element={<Create setCreateData={setCreateData} authors={authors} />}/>
       <Route  path="/edit"  element={<Edit  setEditData={setEditData} setModalData={setModalData} modalData={modalData} authors={authors}  />}/>



       <Route  path="/developerList"  element={<ReadAuthor setDeleteAuthorId={setDeleteAuthorId} authors={authors} />}/>

       
       <Route  path="/newDeveloper"  element={<CreateAuthor  setCreateAuthorsData={setCreateAuthorsData} />}/>

       <Route  path="/commentsList"  element={<CommentsList />}/>
       
      </Routes>

    )
}