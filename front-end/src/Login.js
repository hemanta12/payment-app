import "./Login.css";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";


function Login() {
  console.log("from login.js");
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);

  const afterSubmit = () => {
    const body = {
      username: username,
      password: password,
    };
    const information = {
      method: "POST",
      body: JSON.stringify(body),
    };
    fetch("/logIn", information)
      .then(async (res) => {
        let response = await res.json();
        if (response.isLoggedIn) {
          setIsLoggedIn(true);
          console.log("logged in");

        }
        else {
          alert("Invalid username and password combo");
        }
      })

      .catch((e) => console.log(e));
  };

  if (isLoggedIn) {
    console.log(username + " is logged in.");
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <h2>Login Form</h2>

      <div>
        <label>Username </label>
        <input value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={afterSubmit}>Submit</button>
      {error}
    </div>
  );
}

export default Login;
