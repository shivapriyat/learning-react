import { Link, useNavigate } from "react-router-dom";
import {getAuth,signOut} from 'firebase/auth'
const NavBar = () => {
    const navigate = useNavigate();
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
                <button onClick={()=> {navigate('/login')}}>Login</button>
                <button onClick={()=> {signOut(getAuth())}}>signOut</button>
            </div>
            </ul>

            
        </nav>
    );
}
export default NavBar;