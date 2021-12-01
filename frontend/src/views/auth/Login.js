import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '/Users/davidlundberg/pear/frontend/src/index.css';
import Logo from '/Users/davidlundberg/pear/frontend/src/images/logo.svg';
import { useHistory } from 'react-router-dom';


function Login({Login, error, buttonClicked}) {
    const path = useHistory();
    const [details, setDetails] = useState({email: "", password: ""})

    const [show, setShow] = useState(false);



    // Handles submit and prevents default empty form
    const submitHandler = e => {
        e.preventDefault();

        //Recalls Login function with the newly set details ()
        Login(details);
    }


    return (
        <Container>
                <Card className="login-card shadow-lg">
                <Card.Body>
                    <form onSubmit={submitHandler}>
                        <img className="logo" src={Logo} alt="Pear Logo"/>
                        <h1 className="login-title display-6">Pear</h1>
                        <p className="login-title">A one stop shop for you and your data pairs</p>
                        <div className="login-inputs ">
                            <div className="form-group">
                                <input type="email" className="form-control login-credentials shadow" placeholder="Email Address" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control login-credentials shadow" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                            </div>
                        </div>
                        <button className="btn login-btn btn-lg btn-block shadow" onClick={(() => path.push('/home'))}>Log In</button>
                        <p className="need-account">Don't have an account?</p>
                        <button type="submit" className="btn btn-create btn-lg btn-block shadow" onClick={buttonClicked}>Create Account</button>
                        <p className="mt-3 text-right">
                            <a href="#">Forgot password?</a>
                        </p>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login
