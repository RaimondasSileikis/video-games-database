import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import getBase64 from "../../Functions/getBase64";
import logout from '../../img/logout-line.svg';

export default function Create({ authors, setCreateData}) {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('1');
    const [category, setCategory] = useState('7');
    const [about, setAbout] = useState('');

    const [author, setAuthor] = useState(authors[0].id);

    const fileInput = useRef();

    const buttonHandler = () => {
        const file = fileInput.current.files[0];

        if (file) {
            getBase64(file)
            .then(photo => {
                console.log(photo);
                setCreateData({
                    title,
                    type,
                    category,
                    about,
                    photo,
                    author
                });
            });
        } else {
            setCreateData({
                title,
                type,
                category,
                about,
                photo: null,
                author
            });
        }
        setTitle('');
        setType(1);
        setCategory(7);
        setAbout('');
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
    return(
        <div className="create" >
            <Link className='logo' to="/">
                <h3>Video Games Database</h3>
            </Link>
            <div className="nav-crud">
                <Link className='logout' to="/logout">
                    <img src={logout} alt="logout" />
                </Link>
                <li>
                    <Link className="text-link" to="/admin/list" >Admin</Link>
                </li>
                    <span> &gt; </span>
                <li>
                    <h1>Product List</h1>
                </li>
                    <span> &gt; </span>
                <li>
                    <h1>Create New Product</h1>
                </li>

            </div>
            
            <div className="create-table" >
                <h2>Create New Product</h2>

                <div className="form-container">
                    <div className="formC" >
                        <div className="input name">
                            <label>Name</label>
                            <input type="text" value={title} onChange={e => inputHandler(e, 'title')}  />
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
                            <label>Dispriction:</label>
                            <textarea type="text" value={about} onChange={e => inputHandler(e, 'about')}/>
                        </div>

                        <div className="input file">
                            <label>Insert Photo:</label>
                            <input ref={fileInput} type="file" />
                        </div>

                    </div>
                    <div className="input button">
                        <Link className="btn btn-save" to="/admin/list" onClick={buttonHandler} >Add</Link>
                    </div>

                </div>

            </div>
        </div>

    )
}