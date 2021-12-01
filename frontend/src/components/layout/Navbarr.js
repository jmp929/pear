import React, { Component, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "../../index.css";
import Logo from "../../images/logo.svg";
import { useHistory } from "react-router-dom";
import Logout from "../../views/auth/Logout";

function Navbarr() {
  const path = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.replace("/");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    fetch(
      "http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/users/auth/logout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        window.location.replace("/");
      });
  };

  return (
    <Navbar className="navbar shadow" expand="lg">
      <img className="navbar-logo" src={Logo} alt="Pear Logo" />
      <h1 className="navbar-title">Pear</h1>
      <button
        className="logout-btn btn btn-create btn-lg btn-block weight-light"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </Navbar>
  );
}

export default Navbarr;
