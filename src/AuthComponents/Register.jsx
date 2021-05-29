import React, { useState } from "react";
import CircularProgressBar from "../MiddlewareComponents/CircularProgressBar";

const Register = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [progressBar,setProgressBar] = useState(false)

  const registerBtn = () => {
    setProgressBar(true)
    let payload = {
      name: name,
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch("http://ec2-3-17-161-123.us-east-2.compute.amazonaws.com:3000/register", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setProgressBar(false)
        if (data.error !== undefined) {
          props.setMessage(data.error);
          props.setSeverity("error")
          props.setOpen(true);
        }
        
        else if (data.message === "User registered successfully") {
          props.setMessage(data.message);
          props.onChange("container");
          props.setSeverity("success")
          props.setOpen(true);
        }
        else {
          props.setMessage(data.message);
          props.setSeverity("warning")
          props.setOpen(true);
        }
        console.log(data)
      });
  };

  return (
    <>
      <form name="signup" id="signupForm" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="button"
          onClick={registerBtn}
          className="btn"
          value="Sign up"
        />
        {progressBar && <CircularProgressBar />}
      </form>
    </>
  );
};

export default Register;
