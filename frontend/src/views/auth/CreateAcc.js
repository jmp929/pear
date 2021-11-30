import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '/Users/davidlundberg/pear/frontend/src/index.css';
import Logo from '/Users/davidlundberg/pear/frontend/src/images/logo.svg';
import { useHistory } from 'react-router-dom';
import FormGroup from "react-bootstrap/esm/FormGroup";
import { Row, Form, Button, Col } from "react-bootstrap";

function CreateAcc() {
    const path = useHistory();

    return (
        <div>
            <Container>
                <Card className="create-account-card shadow-lg m-5">
                <Card.Body>
                    <Row>
                        <h1 className="display-6">Create Your Account Now</h1>  
                    </Row>
                    <Row>
                        <Form>
                            <FormGroup className="p-4">
                                <input type="email" className="form-control shadow-sm p-2" placeholder="Email Address"></input>
                            </FormGroup >
                            <FormGroup className="p-4">
                                <input type="password" className="form-control shadow-sm p-2" placeholder="Password"></input>
                            </FormGroup>
                            <FormGroup className="p-4">
                                <input type="email" className="form-control shadow-sm p-2" placeholder="Re-enter Password"></input>
                            </FormGroup>
                                <button type="submit" className="btn login-btn shadow-sm btn-lg btn-block">Create Account</button>
                        </Form>
                    </Row>
                        <Row>
                            <p className="forgot-password ">Already Have An account?</p>
                        </Row>
                        <Row>
                            <Form>
                                <button type="submit" className="btn btn-create shadow-sm btn-lg btn-block" onClick={(() => path.push('/login'))}>Login</button>
                            </Form>
                        </Row>
                </Card.Body>
            </Card>
        </Container>
        </div>
    )
}

export default CreateAcc
