import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap';
import '/Users/davidlundberg/pear/frontend/src/index.css';

function TokenModal(props) {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState('');
    const [hasToken, setHasToken] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
        window.location.replace('/');
        } else {
        setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        setHasToken(true);

        const tokan = {
            token: token,
            hasToken: hasToken,
            timeLeft: timeLeft
        }

        fetch('http://localhost:8000/api/v1/users/auth/survey_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(tokan)
            })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                localStorage.clear();
                localStorage.setItem('token', data.key);
                // window.location.replace('/home');
                } else {
                setToken('');
                setHasToken(false);
                localStorage.clear();
                setErrors(true);
                }
            });
    };

    // const onReset = e => {
    //     setToken('');
    //     setHasToken(false);
    //     setTimeLeft('');
        
    //     const tokan = {
    //         token: '',
    //         hasToken: hasToken,
    //         timeLeft: timeLeft
    //     }
    //     fetch('http://localhost:8000/api/v1/users/auth/survey_token/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Token ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify(tokan)
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.key) {
    //             localStorage.clear();
    //             localStorage.setItem('token', data.key);
    //             // window.location.replace('/home');
    //             } else {
    //             setToken('');
    //             setHasToken(false);
    //             localStorage.clear();
    //             setErrors(true);
    //             }
    //         });
    const onReset = e => {
        // setToken('');
        // setHasToken(false);
        // setTimeLeft('');
        
        const tokan = {
            token: '',
            hasToken: hasToken,
            timeLeft: timeLeft
        }
        fetch('http://localhost:8000/api/v1/users/auth/survey_token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(tokan)
            })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                localStorage.clear();
                localStorage.setItem('token', data.key);
                // window.location.replace('/home');
                } else {
                setToken('');
                setHasToken(false);
                localStorage.clear();
                setErrors(true);
                }
            });
    }
    
    if (!hasToken) {
        return (
            <div>
                <Modal show={props.show}>
                    <Modal.Header className="bg-light" >
                        <Modal.Title className="display-6 mx-auto">Create Your New Token</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup className="">
                                <FormControl name="token" type="token" value={token} onChange={e => setToken(e.target.value)} placeholder="Enter Token"></FormControl>{' '}
                            </FormGroup >
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="modal-btn btn shadow login-btn btn-lg btn-block" variant="primary" onClick={props.buttonClicked}>Close</button>
                        <button className="modal-btn btn shadow login-btn btn-lg btn-block" type="submit "variant="primary" onClick={onSubmit}>Submit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
        } else {
            return (
                <div>
                    <Modal show={props.show}>
                        <Modal.Header className="bg-light" >
                            <Modal.Title className=" fw-light fs-3 mx-auto">You Have Already Created Your Token</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
        
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="modal-btn btn shadow login-btn btn-lg btn-block" variant="primary" onClick={props.buttonClicked}>Close</button>
                            <button className="modal-btn btn shadow login-btn btn-lg btn-block" type="submit "variant="primary" onClick={onReset}>Reset</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
}

export default TokenModal


// const has_token = false;
        //     fetch("http://localhost:8000/api/v1/users/auth/survey_token/", {
        //         method: "GET",
        //         headers: {
        //             Authorization: `Token ${localStorage.getItem("token")}`,
        //         },
        //         })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             setTokenTimeLeft(data.created);
        //         });
