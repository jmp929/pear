import React, { Component, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import '../../index.css';
import Logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';
import Logout from '../../views/auth/Logout';

function Navbarr({buttonClicked}) {
    const path = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
        window.location.replace('/');
        } else {
        setLoading(false);
        }
    }, []);

    const handleLogout = e => {
        e.preventDefault();

        fetch('http://localhost:8000/api/v1/users/auth/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.clear();
            window.location.replace('/');
        });
    };
    
    return (
        <Navbar className="navbarr shadow mb-3" expand="lg">
            <img className="navbar-logo" src={Logo} alt="Pear Logo"/>
            <h1 className="display-6 navbar-title">Pear</h1>
            <button className='home-btn btn btn-create shadow btn-lg btn-block weight-light' onClick={() => path.push('/home')}>Home</button>
            <button className='token-btn btn btn-create shadow btn-lg btn-block weight-light' onClick={buttonClicked}>Get Token</button>
            <button className='logout-btn btn btn-create shadow btn-lg btn-block weight-light' onClick={handleLogout}>Log Out</button>
            <button className='logout-btn btn btn-create btn-lg btn-block weight-light' onClick={handleLogout}>Log Out</button>
        </Navbar>
    )
}

export default Navbarr
