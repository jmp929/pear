import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../../index.css";

function Signup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handles submit and prevents default empty form
  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2,
    };

    fetch(
      "http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/users/auth/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("/home");
        } else {
          setEmail("");
          setPassword1("");
          setPassword2("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.buttonClicked}>
        <Modal.Header className="modal-header-footer" closeButton>
          <Modal.Title className="m-title">Sign Up Form</Modal.Title>
          {errors === true && <p>Cannot signup with provided credentials</p>}
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form id="signup" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email" className="font">
                Email
              </label>
              <input
                type="email"
                className="form-control shadow-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password1" className="font">
                Password
              </label>
              <input
                name="password1"
                type="password"
                className="form-control shadow-sm"
                placeholder="Enter password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2" className="font">
                Re-enter Password
              </label>
              <input
                name="password2"
                type="password"
                className="form-control shadow-sm"
                placeholder="Re-enter password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="modal-body">
          <button
            className=" modal-btn btn login-btn btn-lg btn-block shadow"
            type="submit"
            form="signup"
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
