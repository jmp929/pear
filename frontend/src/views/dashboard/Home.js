import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import '../../index.css';
import { useHistory } from 'react-router-dom';


function Home(buttonClicked) {
    const path = useHistory();

    const [show, setShow] = useState(false);

    var Datasets = [
        {
            Name: "Zip Code to Congressional Districts",
            Size: 50000,
            Date_Uploaded: "08-10-2019",
            Last_Queried: "09-10-2021",
            id: 1
        },
        {
            Name: "Software to CVE",
            Size: 700000,
            Date_Uploaded: "08-10-2019",
            Last_Queried: "09-10-2021",
            id: 2
        }
    ]

    fetch('http://localhost:8000/api/v1/data/userSets/', {
        method: 'GET',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            
            for (const row of data) {
                    Datasets.push({
                        Name: row.name,
                        Size: 700000,
                        Date_Uploaded: "08-10-2019",
                        Last_Queried: "09-10-2021",
                        id: row.id
                    });
                    document.getElementById("table").innerHTML +=
                        "<td>" + row.name + `</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                                            <a href="/dataset" onClick={}>View Data</a>
                                        </td>`;
                    //window.location.replace('http://localhost:3000/home');
        }
        });




    return (
        <Container className="home-container">
            <Row>
                <Col md={4}>
                    <h1 className="welcome font pt-3 pb-2">Welcome to Pear</h1>
                </Col>
            </Row>
            <Row>
                <Table className="table" id="table" hover bordered>
                    <thead className="table-header-footer">
                        <tr>
                            <th className="font-color-white weight-light">Name</th>
                            <th className="font-color-white weight-light">Size</th>
                            <th className="font-color-white weight-light">Date Uploaded</th>
                            <th className="font-color-white weight-light">Date Last Queried</th>
                            <th className="font-color-white weight-light">View Data Set</th>
                        </tr>
                    </thead>
                    <tbody>
                        <React.Fragment>
                            {Datasets.map(dataset => {
                                return (
                                    <tr>
                                        <td>{dataset.Name}</td>
                                        <td>{dataset.Size}</td>
                                        <td>{dataset.Date_Uploaded}</td>
                                        <td>{dataset.Last_Queried}</td>
                                        <td>
                                            <a href="#" onClick={() => path.push('/dataset')}>View Data</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </React.Fragment>
                    </tbody>
                    <tfoot className="table-header-footer">
                        <tr>
                            <th colSpan="5">
                                <Col md={4}>
                                    <button type="submit" className='btn btn-create btn-block weight-light' onClick={(() => path.push('/add'))}>Add New Data Set Here</button>
                                </Col>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
            </Row>
        </Container>
    )
}

export default Home
