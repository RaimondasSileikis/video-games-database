import { Link } from "react-router-dom";


export default function Nav({user, resetSort}){

    return(
        
        <div className="nav-home">
            <Link className="logo" to="/" onClick={resetSort} >
                <div className='logo-max'>
                    <h1>Video Games Database </h1> 
                </div>
                <div className='logo-min'>
                    <h1>VGD</h1> 
                </div>
            </Link>
            <div className="user">
                { 
                    !user.username ? 
                    <>
                        <Link className='logout' to="/login" >
                            <h3>Sign In</h3>
                        </Link>
                        <Link className='logout' to="/register" >
                            <h3>Sign Up</h3>
                        </Link>
                    </>
                    : 
                    <>
                        <div className='user'>
                            <h2> {user.username}</h2>
                            <Link className='logout' to="/logout" onClick={resetSort} >
                                <h3>Logout</h3>
                            </Link>
                        </div>
                    </> 
                }
            </div>
       </div>
    )
}