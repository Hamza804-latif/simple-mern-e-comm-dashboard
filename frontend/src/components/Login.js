import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const Login = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("auth", JSON.stringify(result.auth));
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="register">
      <h1>Login!</h1>

      <input
        className="inputbox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="inputbox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="registerbtn" onClick={Login}>
        Login
      </button>

      <p>
        Do not have an account <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
