import React, { useState } from "react";
import "./Login.css";
import "./App";
import axios from "axios";
import App from "./App";

const Login = () => {
  const [step, setStep] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    let request = {
      email: document.getElementById("InputEmail").value,
      password: document.getElementById("InputPassword").value,
    };
    axios
      .post("http://localhost:5000/login", request)
      .then((resp) => {
        setStep(false);

        console.log(resp);
        alert(resp.data.message);
      })
      .catch((err) => {
        setStep(true);
        console.log("not logged");
        console.log(err);
      });
  };

  return (
    <div>
      {step ? (
        <div className="main">
          <form action="" onSubmit={handleLogin}>
            <div className="form">
              <label htmlFor="">User Name</label>
              <input type="text" id="InputEmail" />

              <label htmlFor="">Password</label>
              <input type="password" id="InputPassword" />
              <div>
                <input type="checkbox" />
                <label htmlFor="">Check me out</label>
              </div>
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <App />
      )}
    </div>
  );
};

export default Login;
