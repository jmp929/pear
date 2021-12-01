import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "src/index.css";
import Logo from "src/images/logo.svg";
import { useHistory } from "react-router-dom";

function Navbarr({ buttonClicked }) {
  const path = useHistory();
  return (
    <Navbar className="navbarr shadow mb-3" expand="lg">
      <img className="navbar-logo" src={Logo} alt="Pear Logo" />
      <h1 className="display-6 navbar-title">Pear</h1>
      <button
        className="home-btn btn btn-create shadow btn-lg btn-block weight-light"
        onClick={() => path.push("/home")}
      >
        Home
      </button>
      <button
        className="token-btn btn btn-create shadow btn-lg btn-block weight-light"
        onClick={buttonClicked}
      >
        Get Token
      </button>
      <button
        className="logout-btn btn btn-create shadow btn-lg btn-block weight-light"
        onClick={() => path.push("/")}
      >
        Log Out
      </button>
    </Navbar>
  );
}

export default Navbarr;
