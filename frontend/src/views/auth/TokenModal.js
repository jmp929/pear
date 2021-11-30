import React, { useState } from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import '/Users/davidlundberg/pear/frontend/src/index.css';

function TokenModal(props) {
    const [show, setShow] = useState(true);

    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header classname="light">
                    <Modal.Title className="">Your Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="display-6 center">Token</h1>
                </Modal.Body>
                <Modal.Footer>
                    <button className="modal-btn btn login-btn btn-lg btn-block" type="submit "variant="primary" onClick={props.buttonClicked}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TokenModal
