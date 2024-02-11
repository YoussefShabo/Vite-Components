import React, { useState } from 'react';
import "./Login.css";
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignUp from '../Auth/Signup';
import { Link } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <form onSubmit={signIn}>
        <div className="segment">
          <h1>Sign in</h1>
        </div>

        <label>
          <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          </label>
        <button className="red" type="submit">
          Log in
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
