import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const CollectData = async () => {
    if ((name, email, password)) {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
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
        alert("some thing went wrong");
      }
    } else {
      alert("please enter data");
    }
  };

  return (
    <div className="register">
      <h1>Register!</h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <button className="registerbtn" onClick={CollectData}>
        Register
      </button>
      <p>
        Already have an account <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
