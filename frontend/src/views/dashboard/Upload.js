import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import '../../index.css';

function Upload(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <Container>
            <Modal show={props.show} onHide={props.buttonClicked}>
                <Modal.Body className = "modal-body">Woohoo, you're reading this text in a modal!</Modal.Body>
            </Modal>
        </Container>
    )
}

export default Upload
