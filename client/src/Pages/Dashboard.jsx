import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';


import ReadAuthor from "../Components/Back/ReadAuthor";
import Create from "../Components/Back/Create";
import CreateAuthor from "../Components/Back/CreateAuthor";
import Edit from "../Components/Back/Edit";
import Read from "../Components/Back/Read";
import CommentsList from '../Components/Back/CommentsList';
import ReadUsers from '../Components/Back/ReadUsers';

import ErrorPage from '../Components/Back/ErrorPage';

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

   const [users, setUsers] = useState([]);
   const [deleteUserId, setDeleteUserId] = useState(null);
   const [editUserData, setEditUserData] = useState(null);

   const [view, setView] = useState(<div className='loading'/>)
   const [viewUsers, setViewUsers] = useState(<div className='loading'/>)
   
axios.defaults.withCredentials = true;

 // Read users
 useEffect(() => {
  axios.get('http://localhost:3001/users')
    .then(res => {
      console.log(res);
      
      !res.data.message && setUsers(res.data);
      res.data.message ? setViewUsers(<ErrorPage message={res.data.message}/>) : setViewUsers(null)

    })
}, [lastUpdate]);

 // Read games
 useEffect(() => {
  axios.get('http://localhost:3001/games-manager')
    .then(res => {
      console.log(res.data);
     
      !res.data.message && setGames(res.data);
      res.data.message ? setView(<ErrorPage message={res.data.message}/>) : setView(null)
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
  


  //Delete User
  useEffect(() => {
    if (null === deleteUserId) {
      return;
    } 
    axios.delete('http://localhost:3001/users/' + deleteUserId.id,)
      .then(res => {
        console.log(res);
        setLastUpdate(Date.now());
      });

  }, [deleteUserId])

console.log('deletinam', deleteUserId);

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
    if (null === editUserData) {
      return;
    }
    axios.put('http://localhost:3001/users/' + editUserData.id, editUserData)
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());
    });
  
  },[editUserData]);

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
  console.log('edito data', editData);

    return(

    <>
      {view !== null ? view :
  <>
        <Routes>
          <Route  path="/users"  element={
            viewUsers !== null ? viewUsers :
            <ReadUsers setEditUserData={setEditUserData} setDeleteUserId={setDeleteUserId} users={users} user={user} />
          }/>

        
          <Route path="/games"  element={<Read view={view} deleteComment={deleteComment} games={games} setModalData={setModalData} setDeleteId={setDeleteId} setGameIndex={setGameIndex} user={user} />}/>
          <Route  path="/games/new"  element={<Create  setCreateData={setCreateData} authors={authors} user ={user}/>}/>
          <Route  path="/games/edit"  element={<Edit  setEditData={setEditData} setModalData={setModalData} modalData={modalData} authors={authors} user={user} />}/>
          <Route  path="/developers"  element={<ReadAuthor setDeleteAuthorId={setDeleteAuthorId} authors={authors} user={user} />}/>
          <Route  path="/developers/new"  element={<CreateAuthor  setCreateAuthorsData={setCreateAuthorsData} user={user} />}/>
          <Route  path="/comments"  element={<CommentsList game={games[gameIndex]}  deleteComment={deleteComment}  user={user}/>}/>
       
        </Routes>
        <footer><p>Copyright &#169; Video Games Database</p></footer>
        </>
      }
      
    </>

  )
}