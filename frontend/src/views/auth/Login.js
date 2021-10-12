import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import '/Users/davidlundberg/pear/frontend/src/index.css';


function Login({Login, error}) {
    // Sets up the details passed in from the App into a useState 
    // This is more for me to make sure that useState worked properly 
    // Going to need to figure out how to pass the backend info into the frontend
    const [details, setDetails] = useState({email: "", password: ""})

    // Handles submit and prevents default empty form
    const submitHandler = e => {
        e.preventDefault();

        //Recalls Login function with the newly set details ()
        Login(details);
    }

    return (
        <Container>
                <Accordion className="pt-5 pb-5" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="accordion-header">Welcome to Pear</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Card className="login-card">
                <Card.Body>
                    <form onSubmit={submitHandler}>
                        <h3>Log in</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
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
