import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import '/Users/davidlundberg/pear/frontend/src/index.css';
import Logo from '/Users/davidlundberg/pear/frontend/src/images/logo.svg';

function HeaderNavbar() {
    return (
        <div>
            <Navbar color="light">
                <img className="navbar-logo" src={Logo} alt="Pear Logo"/>
            </Navbar>
        </div>
    )
}

export default HeaderNavbar
