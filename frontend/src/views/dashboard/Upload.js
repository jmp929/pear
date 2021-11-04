import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import '../../index.css';

function Upload(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const requestData = new FormData();
    const inputFile = useRef(null);

    const handleClick = event => {
        inputFile.current.click();
    };

     

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        requestData.append('dataset_name', fileUploaded.name.replace(/\.[^/.]+$/, ""));
        requestData.append('file', fileUploaded);
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: requestData
        }
        delete options.headers['Content-Type'];
        fetch('/api/v1/data/userSets/', options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    };

    return (
        <div>
            <button type='submit' onClick={handleClick} className='btn btn-create btn-block weight-light'>Upload Data as CSV</button>
            <input
                type="file"
                ref={inputFile}
                onChange={handleChange}
                style={{ display: 'none' }}
            />


        </div>
    )
}

export default Upload
