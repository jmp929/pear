import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import "../../index.css";

function TokenModal(props) {
  const [show, setShow] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [details, setDetails] = useState({
    username: localStorage.getItem("username"),
    password: "",
  });
  const [token, setToken] = useState("");

  const generateToken = () => {
    fetch(
      "http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/users/auth/survey_token/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        setShowToken(true);
      });
  };

  return (
    <div>
      <Modal show={props.show}>
        <Modal.Header className="bg-light">
          <Modal.Title className="display-5 mx-auto">
            Qualtrics Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <h7>
            <span className="fw-bold">URL: </span>
            <br />
            <span className="fw-light bg-light">
              pear-backend-slempp.apps.cloudapps.unc.eduapi/v1/data/getValue/$&#123;e://Field/key&#125;/
              {localStorage.getItem("dataset")}/
            </span>
            <br />
            <br />
            <span className="fw-bold">Token: </span>
            <span style={{ display: "flex" }} hidden={showToken}>
              <input
                type="password"
                className="form-control login-credentials shadow"
                placeholder="Password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
              <button
                className="modal-btn btn shadow-sm login-btn btn-lg btn-block"
                onClick={generateToken}
              >
                Generate Token
              </button>
            </span>
            <span className="fw-light bg-light" hidden={!showToken}>
              {token}
            </span>
          </h7>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="modal-btn btn shadow-sm login-btn btn-lg btn-block"
            type="submit "
            variant="primary"
            onClick={props.buttonClicked}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TokenModal;
