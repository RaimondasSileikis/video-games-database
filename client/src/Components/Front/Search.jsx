export default function Search({doSearch, search, submitSearch, deleteSearch }){

    return(
        <div className="search">
            <input onChange={doSearch} value={search} type="text" />
            <div className="close-icon" >
                <div onClick={deleteSearch} >{search.length !== 0 ? 'x' : ' '}</div>
            </div>
            <button  type="submit" onClick={submitSearch} className="btn-search">Search</button>
        </div>
    )
}