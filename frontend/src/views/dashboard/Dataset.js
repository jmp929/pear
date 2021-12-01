import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "src/index.css";
import Trashcan from "src/images/delete_trashcan.png";
import { useHistory } from "react-router-dom";

function Dataset() {
  const path = useHistory();
  const Data = [
    {
      Zipcode: 1001,
      District: 2501,
    },
    {
      Zipcode: 1002,
      District: 2502,
    },
    {
      Zipcode: 1003,
      District: 2503,
    },
  ];

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 className="display-6 pe-5 pt-3 pb-2">
            Zip Code to Congressional District
          </h1>
        </Col>
        <Col>
          <Button
            variant="danger"
            size="lg"
            className="mt-2 shadow-sm weight-light"
          >
            Delete Dataset
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 1, offset: 8 }}>
          <p className="fs-4">Search:</p>
        </Col>
        <Col md={{ span: 2 }}>
          <Form>
            <Form.Control className="shadow-sm" type="search"></Form.Control>
          </Form>
        </Col>
      </Row>
      <Container className="home-container">
        <Row md={6}>
          <Col md={1}>
            <p className="fs-5">show</p>
          </Col>
          <Col md={1}>
            <Form>
              <Form.Select className="shadow-sm">
                <option></option>
                <option value="10"></option>
                <option value="20"></option>
              </Form.Select>
            </Form>
          </Col>
          <Col md={1}>
            <p className="fs-5">Entries</p>
          </Col>
        </Row>
        <Row>
          <Table className="table" hover bordered>
            <thead className="table-header-footer">
              <tr>
                <th className="font-color-white weight-light">ZipCode</th>
                <th className="font-color-white weight-light">
                  Congressional District
                </th>
                <th className="font-color-white weight-light">Remove Row</th>
              </tr>
            </thead>
            <tbody>
              {/* create's a table entry for each entry in the Dataset */}
              <React.Fragment>
                {Data.map((entry) => {
                  return (
                    <tr>
                      <td>{entry.Zipcode}</td>
                      <td>{entry.District}</td>
                      <td>
                        <img
                          className="delete-trashcan"
                          src={Trashcan}
                          alt="Pear Logo"
                        />
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            </tbody>
            <tfoot className="table-header-footer">
              <tr>
                <th colSpan="3">
                  <Row>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn shadow-sm btn-create btn-block weight-light"
                      >
                        Add New Entry
                      </button>
                    </Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn shadow-sm btn-create btn-block weight-light"
                      >
                        Bulk Add
                      </button>
                    </Col>
                    <Col></Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn shadow-sm btn-create btn-block weight-light"
                      >
                        Previous
                      </button>
                    </Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn shadow-sm btn-create btn-block weight-light"
                      >
                        Next
                      </button>
                    </Col>
                  </Row>
                </th>
              </tr>
            </tfoot>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Dataset;
