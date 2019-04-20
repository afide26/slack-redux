import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello React </h1>
        <Link to="/login" component={Login}>
          Login
        </Link>
        <Link to="/register" component={Register}>
          Register
        </Link>
      </div>
    );
  }
}

export default App;
