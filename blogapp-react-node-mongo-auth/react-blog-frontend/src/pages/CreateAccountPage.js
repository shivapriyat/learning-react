import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const createAccount = async()=> {
        if(password !== confirmPassword) {
            setError("Password did not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
            return;
        } catch (error) {
            setError(error.message);
            return;
        }

    };
    return (
        <>
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p>}
            <input placeholder="enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account login</Link>
        
        </>
    )
}
export default CreateAccountPage;