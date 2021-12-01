import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "src/index.css";
import Logo from "src/images/logo.svg";

function HeaderNavbar() {
  return (
    <div>
      <Navbar color="light">
        <img className="navbar-logo" src={Logo} alt="Pear Logo" />
      </Navbar>
    </div>
  );
}

export default HeaderNavbar;
