import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import '../../index.css';
import Logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';


function Navbarr() {
    const path = useHistory();
    return (
        <Navbar className="navbar shadow" expand="lg">
            <img className="navbar-logo" src={Logo} alt="Pear Logo"/>
            <h1 className="navbar-title">Pear</h1>
            <button className='logout-btn btn btn-create btn-lg btn-block weight-light' onClick={() => path.push('/')}>Log Out</button>
        </Navbar>
    )
}

export default Navbarr
