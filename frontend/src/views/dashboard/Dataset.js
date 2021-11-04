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
    
    var Data =[
        {Zipcode: 
            1001
            ,
            District: 
            2501
            },
            {Zipcode: 
            1002
            ,
            District: 
            2502
            },
            {Zipcode: 
            1003
            ,
            District: 
            2502
            },
            {Zipcode: 
            1005
            ,
            District: 
            2502
            },
            {Zipcode: 
            1007
            ,
            District: 
            2502
            },
            {Zipcode: 
            1008
            ,
            District: 
            2501
            },
            {Zipcode: 
            1009
            ,
            District: 
            2501
            },
            {Zipcode: 
            1010
            ,
            District: 
            2501
            },
            {Zipcode: 
            1011
            ,
            District: 
            2501
            },
            {Zipcode: 
            1012
            ,
            District: 
            2501
            },
            {Zipcode: 
            1013
            ,
            District: 
            2501
            },
            {Zipcode: 
            1020
            ,
            District: 
            2501
            },
            {Zipcode: 
            1022
            ,
            District: 
            2501
            },
            {Zipcode: 
            1026
            ,
            District: 
            2501
            },
            {Zipcode: 
            1027
            ,
            District: 
            2501
            },
            {Zipcode: 
            1028
            ,
            District: 
            2501
            },
            {Zipcode: 
            1029
            ,
            District: 
            2501
            },
            {Zipcode: 
            1030
            ,
            District: 
            2501
            },
            {Zipcode: 
            1031
            ,
            District: 
            2502
            },
            {Zipcode: 
            1032
            ,
            District: 
            2501
            },
            {Zipcode: 
            1033
            ,
            District: 
            2501
            },
            {Zipcode: 
            1034
            ,
            District: 
            2501
            },
            {Zipcode: 
            1035
            ,
            District: 
            2502
            },
            {Zipcode: 
            1036
            ,
            District: 
            2501
            },
            {Zipcode: 
            1037
            ,
            District: 
            2502
            },
            {Zipcode: 
            1038
            ,
            District: 
            2502
            },
            {Zipcode: 
            1039
            ,
            District: 
            2501
            },
            {Zipcode: 
            1040
            ,
            District: 
            2501
            },
            {Zipcode: 
            1050
            ,
            District: 
            2501
            },

    ]
    
    console.log(localStorage.getItem('token'));

    fetch('http://172.30.119.246:8080/api/v1/data/userSet/test/', {
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
                //     document.getElementById("table").innerHTML += `<tr>
                //     <td>` +row.key + `</td>
                //     <td>` + row.value + `</td>
                //     <td>
                //         <img className="delete-trashcan" src={Trashcan} alt="Pear Logo"/>
                //     </td>
                // </tr>`
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
