import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { useHistory } from "react-router-dom";

function AddData({ buttonClicked, numRows }) {
  const path = useHistory();
  const NewData = [
    {
      Key: "",
      Value: "",
    },
  ];

  const [rows, addRows] = useState(1);

  return (
    <div>
      <Row>
        <Col>
          <p className="display-4 pt-3 pb-3">
            <u>Add Data</u>
          </p>
        </Col>
      </Row>
      <Container>
        <Row>
          <Table className="table shadow-lg" bordered responsive="sm">
            <thead className="table-header-footer">
              <tr>
                <th className="font-color-white weight-light">Key</th>
                <th className="font-color-white weight-light">Value</th>
                <th className="font-color-white weight-light">Remove Row</th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment>
                {NewData.map((entry) => {
                  return (
                    <tr>
                      <td>
                        <Form>
                          <Form.Control
                            type="key"
                            className="shadow-sm"
                            placeholder={entry.Key}
                          ></Form.Control>
                        </Form>
                      </td>
                      <td>
                        <Form>
                          <Form.Control
                            className="shadow-sm"
                            type="key"
                          ></Form.Control>
                        </Form>
                      </td>
                      <td>
                        <Form>
                          <Form.Control
                            className="shadow-sm"
                            type="key"
                          ></Form.Control>
                        </Form>
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
                        className="btn shadow btn-create btn-block weight-light"
                        onClick={buttonClicked}
                      >
                        Upload Data
                      </button>
                    </Col>
                    <Col md="auto">
                      <button
                        type="submit"
                        className="btn shadow btn-add-row shadow-sm btn-block weight-light"
                      >
                        Add Row
                      </button>
                    </Col>
                    <Col></Col>
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

export default AddData;
