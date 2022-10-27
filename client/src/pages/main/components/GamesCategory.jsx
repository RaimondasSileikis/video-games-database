import { Link } from "react-router-dom"

export default function GamesCategory({categoryStatus, setCategoryStatus}){

    const changeCategoryStatus = () => {
        setCategoryStatus(!categoryStatus)
    };

    return(
        <div className={`category ${categoryStatus ? 'active-category' : ''}`}>
        <h1>Sort by game genre</h1>
        <Link className="text-link" to="/action" onClick={changeCategoryStatus}>Action</Link>
        <Link className="text-link" to="/rpg" onClick={changeCategoryStatus} >Rpg</Link>
        <Link className="text-link" to="/strategy" onClick={changeCategoryStatus} >Strategy</Link>
        <Link className="text-link" to="/puzzle" onClick={changeCategoryStatus} >Puzzle</Link>
        <Link className="text-link" to="/action" onClick={changeCategoryStatus} >Action</Link>
        <Link className="text-link" to="/action" onClick={changeCategoryStatus} >Action</Link>
        <h1>Sort by game platform</h1>
        <Link className="text-link" to="/pc" onClick={changeCategoryStatus} >Pc</Link>
        <Link className="text-link" to="/playstation" onClick={changeCategoryStatus} >Playstation</Link>
        <Link className="text-link" to="/xbox" onClick={changeCategoryStatus} >Xbox</Link>
        <Link className="text-link" to="/nintendo" onClick={changeCategoryStatus} >Nintento</Link>
    </div>
    )
}