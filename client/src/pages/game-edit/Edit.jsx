import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import getBase64 from "../../functions/getBase64";
import NavDashboard from "../games-list/components/NavDashboard";


export default function Edit({ authors, setEditData, setModalData, modalData, user}) {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('1');
    const [category, setCategory] = useState('7');
    const [about, setAbout] = useState('');
    const [id, setId] = useState('0');

    const [remove, setRemove] = useState(false);
    const [author, setAuthor] = useState('0');

    const fileInput = useRef();

    const buttonHandler = () => {
        const file = fileInput.current.files[0];

        if (file) {
            getBase64(file)
            .then(photo => {
                console.log(photo);
                setEditData({
                    title,
                    type,
                    category,
                    about,
                    id,
                    photo,
                    author,
                    del: remove ? 1 : 0
                });
                setModalData(null);
                setRemove(false);
            });
        } else {
            setEditData({
                title,
                type,
                category,
                about,
                id,
                photo: '',
                author,
                del: remove ? 1 : 0
            });
            setModalData(null);
            setRemove(false);
        }
    }

const inputHandler = (e, which) => {
    switch(which) {
        case 'title': 
        setTitle(e.target.value);
        break;
        case 'type': 
        setType(e.target.value);
        break;
        case 'category': 
        setCategory(e.target.value);
        break;
        case 'about': 
        setAbout(e.target.value);
        break;
        case 'author': 
        setAuthor(e.target.value);
        break;
        default:
    }
}

useEffect(() => {
    if (modalData === null) {
        setTitle('');
        setType(1);
        setCategory(7);
        setAbout('');
    } else {
        setTitle(modalData.title); 
        setType(modalData.type);
        setCategory(modalData.category);
        setAbout(modalData.about);
        setAuthor(authors.filter(item => item.author === modalData.author)[0].id);
        setId(modalData.id);
    }
}, [modalData, authors])

if (modalData === null) {
    return null;
}

    return(
        <div className="edit" >
            <NavDashboard user={user} />
            <div className="edit-table" >
                <h2>Edit Game</h2>
                <div className="form-container">
                    <div className="formE" >
                        <div className="input name">
                            <label>Name</label>
                            <input type="text" value={title} onChange={e => inputHandler(e, 'title')} />
                        </div>
                        <div className="input type" >
                            <label >Genres:</label>
                            <select value={type} onChange={e => inputHandler(e, 'type')} >
                                <option value="1">Action</option>
                                <option value="2">Adventure</option>
                                <option value="3">RPG</option>
                                <option value="4">Strategy</option>
                                <option value="5">Shooter</option>
                                <option value="6">Puzzle</option>
                            </select>
                        </div>
                        <div className="input category" >
                            <label >Platforms:</label>
                            <select value={category} onChange={e => inputHandler(e, 'category')} >
                                <option value="7">PC</option>
                                <option value="8">PlayStation</option>
                                <option value="9">Xbox</option>
                                <option value="10">Nintendo</option>
                            </select>
                        </div>
                        <div className="input authors">
                            <label>Authors:</label>
                            <select onChange={e => inputHandler(e, 'author')} value={author}>
                            {
                                authors.map(a => <option key={a.id} value={a.id}>{a.author}</option>)
                            }
                            </select>     
                        </div>
                        <div className="input about">
                            <label>About:</label>
                            <textarea type="text" value={about} onChange={e => inputHandler(e, 'about')}/>
                        </div>
                        <div className="input file">
                            <label>Change Photo:</label>
                            <input ref={fileInput} type="file" />
                        </div>
                        <div className="input active"  >
                                <input type="checkbox"  onChange={() => setRemove(r => !r)}  checked={remove} />
                                <label >Delete Photo</label>
                        </div>
                        <div  className="input photo"  >
                            {
                                !modalData.photo ? null : 
                                <img src={modalData.photo} alt="img"></img>
                            }
                        </div>
                    </div>
                    <div className="input button">
                        <Link className="btn btn-save" to="/admin/games"  onClick={buttonHandler} >Save</Link>
                        <Link className="btn btn-cancel" to="/admin/games"  onClick={() => setModalData(null)} >Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}