import { Link} from 'react-router-dom';

export default function NavDashboard({user}) {

const urlName = window.location.pathname.slice(1).split('/');
    
    return(
        <>
            <div className='nav-dashboard' >
                <Link className='logo' to="/">
                    <div className='logo-max'>
                        <h1>Video Games Database </h1> 
                    </div>
                    <div className='logo-min'>
                        <h1>VGD</h1> 
                    </div>
                </Link>
                <div className='user' >
                    <h1>Hello <i>{user.role}</i></h1>
                    <h2> {user.username}</h2>
                    <Link className='logout' to="/logout">
                        <h3>Logout</h3>
                    </Link>
                </div>
            </div>
            <div className="nav-list">
                <li>
                    <Link className="admin-link" to="/admin/games" >Admin:</Link>
                </li>
                <li>
                    <Link className={` ${urlName[1] === 'games' ? 'url-name list-link' : 'list-link'}`} to="/admin/games" >Games</Link>
                    {
                        urlName[2] &&
                        urlName[1] === 'games' &&
                        <h3><span> &gt; </span>{urlName[2]}</h3>
                    }
                </li>
                <li>
                    <Link className={` ${urlName[1] === 'developers' ? 'url-name list-link' : 'list-link'}`} to="/admin/developers" >Developers</Link>
                    {
                        urlName[2] &&
                        urlName[1] === 'developers' &&
                        <h3> <span> &gt; </span>{urlName[2]}</h3>
                    }
                </li>
                {user.role === 'admin' &&
                <li>
                    <Link className={` ${urlName[1] === 'users' ? 'url-name list-link' : 'list-link'}`} to="/admin/users" >Users</Link>
                    {
                        urlName[2] &&
                        urlName[1] === 'users' &&
                        <h3> <span> &gt; </span>{urlName[2]}</h3>
                    }
                </li>}
                <li>
                    {
                        urlName[1] === 'comments' &&
                        <h4>{urlName[1]}</h4>
                    }
                </li>
            </div>
        </>
    );
}