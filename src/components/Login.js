import React from 'react'
import { Button } from 'react-bootstrap';
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import googleimg from "../images/googleimg.jpg";
import "./Login.css";


function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    }

    return (
        <div className="loginPage">
            <img src={googleimg} alt="Logo" width={600}/>
            <Button onClick={signInWithGoogle} variant="info">Sign In With Google</Button>
        </div>
    )
}

export default Login
