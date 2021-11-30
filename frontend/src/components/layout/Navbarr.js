import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import '/Users/davidlundberg/pear/frontend/src/index.css';
import Logo from '/Users/davidlundberg/pear/frontend/src/images/logo.svg';
import { useHistory } from 'react-router-dom';


function Navbarr({buttonClicked}) {
    const path = useHistory();
    return (
        <Navbar className="navbarr shadow mb-3" expand="lg">
            <img className="navbar-logo" src={Logo} alt="Pear Logo"/>
            <h1 className="navbar-title">Pear</h1>
            <button className='token-btn btn btn-create shadow-sm btn-lg btn-block weight-light' onClick={buttonClicked}>Token</button>
            <button className='logout-btn btn btn-create shadow-sm btn-lg btn-block weight-light' onClick={() => path.push('/')}>Log Out</button>
        </Navbar>
    )
}

export default Navbarr
