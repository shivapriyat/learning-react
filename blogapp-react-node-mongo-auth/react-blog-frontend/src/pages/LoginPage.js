import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const login = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
            return;
        } catch (e) {
            setError(e.message);
            return;
        }
    }
    return (
        <>
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input placeholder="enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <Link to="/create-account">Don't have an account create one here</Link>
        </>
    )
}
export default LoginPage;