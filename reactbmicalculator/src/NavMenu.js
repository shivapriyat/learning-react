import {Link} from 'react-router-dom';
export function NavMenu() {
    return(
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contacts</Link>
            <Link to="/restapi">REST API</Link>
            <Link to="/graphql">Graph QL</Link>
        </nav>
        </>
    );
}