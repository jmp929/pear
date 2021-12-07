import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";

function LogoutModal(props) {
  const handleLogout = (e) => {
    e.preventDefault();

    fetch(
      "http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/users/auth/logout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        window.location.replace("/");
      });
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.buttonClicked}>
        <Modal.Header className="bg-light">
          <Modal.Title className="display-7 mx-auto">
            Are you sure you want to logout?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            variant="danger"
            className="modal-btn btn shadow-sm btn-lg btn-block"
            onClick={props.buttonClicked}
          >
            Cancel
          </Button>
          <Button
            className="modal-btn btn shadow-sm login-btn btn-lg btn-block"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogoutModal;
