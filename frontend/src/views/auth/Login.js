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
                <Card className="login-card">
                <Card.Body>
                    <form onSubmit={submitHandler}>
                        <img className="logo" src={Logo} alt="Pear Logo"/>
                        <h1 className="login-title font">Pear</h1>
                        <p className="login-title subtitle font">A one stop shop for you and your data pairs</p>
                        <div className="login-inputs ">
                            <div className="form-group">
                                <input type="email" className="form-control login-credentials" placeholder="Email Address" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control login-credentials" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                            </div>
                        </div>
                        <button className="btn login-btn btn-lg btn-block" onClick={(() => path.push('/home'))}>Log In</button>
                        <p className="need-account font">Don't have an account?</p>
                        <button type="submit" className="btn btn-create btn-lg btn-block" onClick={buttonClicked}>Create Account</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login
