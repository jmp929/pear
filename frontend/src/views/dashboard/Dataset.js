import React, { useState }from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../index.css';
import Trashcan from '../../images/delete_trashcan.png';
import { useHistory } from 'react-router-dom';

function Dataset() {
    const path = useHistory();
    
    var Data = []
    
    console.log(localStorage.getItem('token'));

    fetch('http://localhost:8000/api/v1/data/userSet/test/', {
        method: 'GET',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            for (const row of data) {
                    if(row.key != "zip") {
                    Data.push({
                        Zipcode: row.key,
                        District: row.value
                    });
                    document.getElementById("table").innerHTML += `<tr>
                    <td>` +row.key + `</td>
                    <td>` + row.value + `</td>
                    <td>
                        <img className="delete-trashcan" src={Trashcan} alt="Pear Logo"/>
                    </td>
                </tr>`
                    }
        }
        });

    return (
        <div>
            <Row>
                <Col md={2}>
                        <p className="back-to-home font pt-3 pb-2 fs-4" onClick={() => path.push('/home')}><u>Back to Home</u></p>
                </Col>
                <Col md={8}>
                    <h1 className="welcome font pt-3 pb-2">Demo</h1>
                </Col>
                <Col>
                    <Button variant="danger"  size="lg" className="mt-2 weight-light">Delete Dataset</Button>
                </Col>
            </Row>
            <Row>
                <Col md={{span:1, offset:8}}>
                    <p className="font fs-3">Search:</p>
                </Col>
                <Col md={{span:2}}>
                        <Form>
                            <Form.Control type="search"></Form.Control>
                        </Form>
                </Col>
            </Row>
            <Container className="home-container">
                <Row md={6}>
                    <Col md={1}>
                        <p className="font fs-5">show</p>
                    </Col>
                    <Col md={1}>
                        <Form>
                            <Form.Select>
                                <option></option>
                                <option value="10"></option>
                                <option value="20"></option>
                            </Form.Select>
                        </Form>
                    </Col>
                    <Col md={1}>
                        <p className="font fs-5">Entries</p>
                    </Col>
                </Row>
                <Row>
                <Table className="table" id='table' hover bordered>
                        <thead className="table-header-footer">
                            <tr>
                                <th className="font-color-white weight-light">ZipCode</th>
                                <th className="font-color-white weight-light">Congressional District</th>
                                <th className="font-color-white weight-light">Remove Row</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* create's a table entry for each entry in the Dataset */}
                            <React.Fragment>
                                {Data.map(entry => {
                                    return (
                                        <tr>
                                            <td>{entry.Zipcode}</td>
                                            <td>{entry.District}</td>
                                            <td>
                                                <img className="delete-trashcan" src={Trashcan} alt="Pear Logo"/>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </React.Fragment>
                        </tbody>
                        <tfoot className="table-header-footer">
                            <tr>
                                <th colSpan="3">
                                <Row>
                                    <Col md="auto">
                                        <button type="submit" className='btn btn-create btn-block weight-light'>Add New Entry</button>
                                    </Col>
                                    <Col md="auto">
                                        <button type="submit" className='btn btn-create btn-block weight-light'>Bulk Add</button>
                                    </Col>
                                    <Col></Col> 
                                    <Col md="auto">
                                        <button type="submit" className='btn btn-create btn-block weight-light'>Previous</button>
                                    </Col>
                                    <Col md="auto">
                                        <button type="submit" className='btn btn-create btn-block weight-light'>Next</button>
                                    </Col>
                                </Row>                      
                                </th>    
                            </tr>
                        </tfoot>
                    </Table>
                </Row>
            </Container>
        </div>
    )
}

export default Dataset
