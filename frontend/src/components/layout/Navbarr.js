import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "../../index.css";
import Logo from "../../images/logo.svg";
import { useHistory } from "react-router-dom";
import LogoutModal from "../../views/auth/LogoutModal";
import Button from "@restart/ui/esm/Button";

function Navbarr({ buttonClicked, logoutClicked }) {
  const path = useHistory();
  return (
    <Navbar className="navbarr shadow mb-3" expand="lg">
      {/* <div className="navbar-title">
        <img className="navbar-logo" src={Logo} alt="Pear Logo" />
        <h1 className="display-6 navbar-title">Pear</h1>
      </div> */}

      <Navbar.Brand href="/home">
        <h1 className="navbar-title display-6">
          {" "}
          <img
            alt=""
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block"
          />{" "}
          Pear{" "}
        </h1>
      </Navbar.Brand>

      {/* <button
        className="token-btn btn btn-create shadow btn-lg btn-block weight-light"
        onClick={buttonClicked}
      >
        Get Token
      </button> */}
      <button
        className="logout-btn btn btn-create shadow btn-lg btn-block weight-light"
        onClick={logoutClicked}
      >
        Log Out
      </button>
    </Navbar>
  );
}

export default Navbarr;
