import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import Logout from "./Logout";
import Payments from "./Payments";
import logo from './logo.png';

function App() {
  console.log("from app.js");

  return (
    <BrowserRouter>
      <header>
      <div className="header">
      <img src={logo} className="logo" alt="Logo" />
      <h1 className="logoName">JadeLight</h1>
    </div>
      <h3>
      <div className="links">
        <Link to="/">Home </Link>
        <Link to="/login">Login </Link>
        <Link to="/register">Register </Link>
        <Link to="/payments">Payments </Link>
        <Link to="/logout">Logout </Link>
      </div>
      </h3>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
      <body>
        <div id="page-container">
        <div id="content-wrap">
        </div>
          <footer id="footer">      
          <span id="footer-name">Jadelight © 2022</span> 
          <a id="email-link" href="randomemail@aol.co"> Contact Owner</a>
          </footer>
        </div>
      </body>
    </BrowserRouter>
  );
}

export default App;
