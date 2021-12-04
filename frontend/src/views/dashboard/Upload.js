import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "../../index.css";

function Upload(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const requestData = new FormData();
  const inputFile = useRef(null);
  const [loading, isLoading] = useState(false);
  const [details, setDetails] = useState({ name: "", key: "", value: "" });

  const handleClick = (event) => {
    inputFile.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    isLoading(true);
    const fileUploaded = event.target.files[0];
    requestData.append("dataset_name", details.name);
    requestData.append("file", fileUploaded);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: requestData,
    };
    delete options.headers["Content-Type"];
    fetch("http://localhost:8000/api/v1/data/userSets/", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        isLoading(false);
        handleClose();
      });
  };

  return (
    <Container>
      <Modal show={props.show} onHide={props.buttonClicked}>
        <Modal.Title className="display-5 mx-auto">
          Database Details
        </Modal.Title>
        <Modal.Body className="modal-body">
          <form id="upload_details">
            <div className="form-group p-2">
              <label>Set a unique name for your database (no spaces)</label>
              <input
                type="text"
                className="form-control shadow"
                placeholder="Database Name"
                onChange={(e) => {
                  setDetails({ ...details, name: e.target.value });
                }}
                value={details.name}
                required
              />
            </div>
            {/* <div className="form-group p-2">
              <input
                type="text"
                className="form-control shadow"
                placeholder="Column 1 (Key) Label"
                onChange={(e) =>
                  setDetails({ ...details, key: e.target.value })
                }
                value={details.key}
                required
              />
            </div>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control shadow"
                placeholder="Column 2 (Value) Label"
                onChange={(e) =>
                  setDetails({ ...details, value: e.target.value })
                }
                value={details.value}
                required
              />
            </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer hidden={details.name == ""}>
          <br />
          <button
            hidden={!loading}
            disabled
            className="modal-btn btn shadow-sm login-btn btn-lg"
          >
            Uploading...
          </button>
          <button
            hidden={loading}
            onClick={handleClick}
            className="modal-btn btn shadow-sm login-btn btn-lg"
          >
            Browse for CSV
          </button>
          <input
            type="submit"
            type="file"
            ref={inputFile}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Upload;
