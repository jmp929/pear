import React, { useState } from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import '/Users/davidlundberg/pear/frontend/src/index.css';

function TokenModal(props) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header className="bg-light" >
                    <Modal.Title className="display-5 mx-auto">Your Token</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-auto">
                    <h1 className="fs-2 fw-light">Token</h1>
                </Modal.Body>
                <Modal.Footer>
                    <button className="modal-btn btn shadow login-btn btn-lg btn-block" type="submit "variant="primary" onClick={props.buttonClicked}>Close</button>
                    <button className="modal-btn btn shadow login-btn btn-lg btn-block" type="submit "variant="primary" onClick={props.buttonClicked}>New Token</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TokenModal
