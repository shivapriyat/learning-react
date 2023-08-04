import { Link, useNavigate } from "react-router-dom";
import {getAuth,signOut} from 'firebase/auth';
import useUser from "./hooks/useUser";
const NavBar = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <div style={{float: 'right'}}>
                {!user ? <button onClick={()=> {navigate('/login')}}>Login</button>
                : <button onClick={()=> {signOut(getAuth())}}>Logout</button>}
            </div>
            </ul>

            
        </nav>
    );
}
export default NavBar;