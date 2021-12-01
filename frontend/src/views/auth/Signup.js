import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "src/index.css";

function Signup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handles submit and prevents default empty form
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.buttonClicked}>
        <Modal.Header className="modal-header-footer" closeButton>
          <Modal.Title className="m-title">Sign Up Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="font">Email</label>
              <input
                type="email"
                className="form-control shadow-sm"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label className="font">Password</label>
              <input
                type="password"
                className="form-control shadow-sm"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label className="font">Re-enter Password</label>
              <input
                type="password"
                className="form-control shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="modal-body">
          <button
            className=" modal-btn btn login-btn btn-lg btn-block shadow"
            type="submit "
            variant="primary"
          >
            Sign Up
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signup;
