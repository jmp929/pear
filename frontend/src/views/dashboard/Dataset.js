import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import Trashcan from "../../images/delete_trashcan.png";
import { useHistory } from "react-router-dom";

function Dataset(props) {
  const path = useHistory();

  var [headers, setHeaders] = useState([]);

  var [dataPairs, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  console.log(localStorage.getItem("token"));
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/data/userSet/${localStorage.getItem(
        "dataset"
      )}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHeaders(data.data_pairs.shift());
        setData(
          data.data_pairs.map((row) => {
            return {
              key: row.key,
              value: row.value,
            };
          })
        );
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Row>
        <Col md={2}>
          <p
            className="back-to-home font pt-3 pb-2 fs-4"
            onClick={() => path.push("/home")}
          >
            <u>Back to Home</u>
          </p>
        </Col>
        <Col md={8}>
          <h1 className="welcome font pt-3 pb-2">Demo</h1>
        </Col>
        <Col>
          <Button variant="danger" size="lg" className="mt-2 weight-light">
            Delete Dataset
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 1, offset: 8 }}>
          <p className="font fs-3">Search:</p>
        </Col>
        <Col md={{ span: 2 }}>
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
          <Table className="table" id="table" hover bordered>
            <thead className="table-header-footer">
              <tr>
                <th className="font-color-white weight-light">{headers.key}</th>
                <th className="font-color-white weight-light">
                  {headers.value}
                </th>
                <th className="font-color-white weight-light">Remove Row</th>
              </tr>
            </thead>
            <tbody>
              {/* create's a table entry for each entry in the Dataset */}
              {loading ? (
                <tr>
                  <h2
                    style={{ textAlignVertical: "center", textAlign: "center" }}
                  >
                    {" "}
                    Loading...{" "}
                  </h2>
                </tr>
              ) : (
                dataPairs.map((entry) => {
                  return (
                    <tr>
                      <td>{entry.key}</td>
                      <td>{entry.value}</td>
                      <td>
                        <img
                          className="delete-trashcan"
                          src={Trashcan}
                          alt="Pear Logo"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot className="table-header-footer">
              <tr>
                <th colSpan="3">
                  <Row>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn btn-create btn-block weight-light"
                      >
                        Add New Entry
                      </button>
                    </Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn btn-create btn-block weight-light"
                      >
                        Bulk Add
                      </button>
                    </Col>
                    <Col></Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn btn-create btn-block weight-light"
                      >
                        Previous
                      </button>
                    </Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn btn-create btn-block weight-light"
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
