import "./Registration.css";
import "./Login.css"
import React from "react";
import { useHistory } from "react-router-dom";

function Registration() {
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirm, setPasswordConfirm] = React.useState("");

  function isValidRegistration() {
    let allErrorMessages = [
      "Username needs 3 or more characters",
      "Password needs 3 or more characters",
      "Confirm password must be filled out!",
      "Passwords do not match!",
    ];

    let errorString;
    console.log(username);
    console.log(password);
    console.log(password_confirm);
    if (username.length < 2)
      errorString += allErrorMessages[0] + "\n";
    if (password.length < 2)
      errorString += allErrorMessages[1] + "\n";
    if (password_confirm.length < 2)
      errorString += allErrorMessages[2] + "\n";
    if (password !== password_confirm)
      errorString += allErrorMessages[3] + "\n";

    console.log(errorString);
    if (errorString) {
      alert(errorString);
      return false;

    } else {
      return true;
    }
  }

  const afterSubmit = () => {
    if (isValidRegistration()) {
      const body = {
        username: username,
        password: password,
        password_confirm: password_confirm,
      };
      const information = {
        method: "POST",
        body: JSON.stringify(body),
      };
      fetch("/Register", information)
        .then(async (res) => {
          let response = await res.json();
          console.log(response);
          if (response.isRegistered === false) {
            alert("Username already exists!");
          }
          else {
            alert("Registration successful!");
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log('form is not valid');
    }


  };

  return (
    <div className="registration">
      <div>
        <h3 className="registerMessage">Enter a username and password with at least 3 characters</h3>
        <h2>Registration form </h2>
        <label> Username </label>
        <input type="text" required
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label> Password </label>
        <input
          type="password" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label> Confirm Password </label>
        <input
          type="password" required
          value={password_confirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <button onClick={afterSubmit}>Submit</button>
      {error}
    </div>
  );
}

export default Registration;
