import { sortClientHeightAsc, sortClientHeightDesc } from "../Actions";

export default function GamesSort({serverSort, dispachGames, setCategoryStatus, categoryStatus}){

    return(
        <div className='list-title'>
        <button onClick={() => serverSort('title', 'asc')} className="btn-nav btn-sort-up">
            <span>Sort by </span>
            Name
        </button>
        <button onClick={() => serverSort('title', 'desc')}  className="btn-nav btn-sort-down">
            <span>Sort by </span>
            Name
        </button>
        <button onClick={() => dispachGames(sortClientHeightAsc())}  className="btn-nav btn-sort-up">
            <span>Sort by </span>
            Rating
        </button>
        <button onClick={() => dispachGames(sortClientHeightDesc())}  className="btn-nav btn-sort-down">
            <span>Sort by </span>
            Rating
        </button>
        <button onClick={() => setCategoryStatus(!categoryStatus)} className="btn-nav btn-category">
            Category
        </button>
    </div>
    )
}