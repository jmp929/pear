import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { useHistory } from "react-router-dom";
import trashcan from "../../images/delete_trashcan.png";
import { Alert } from "react-bootstrap";

function AddData({ buttonClicked, deleteRowClicked, editRowData, rowArray }) {
  const path = useHistory();

  const [rows, addRows] = useState();
  const [error, ShowError] = useState("");

  const handleAddData = (e) => {
    e.preventDefault();
    let rowsToAdd = {
      new_objs: rowArray.map((entry) => ({
        key: entry.Key,
        value: entry.Value,
      })),
    };
    let options = {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(rowsToAdd),
    };
    console.log(options);
    fetch(
      `http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/data/userSet/${localStorage.getItem(
        "dataset"
      )}/`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Key already exists");
        }
        path.push("/dataset");
      })
      .catch((e) => {
        ShowError(e.message);
      });
    return false;
  };

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
          <form onSubmit={(e) => handleAddData(e)}>
            <Table className="table shadow-lg" bordered responsive="sm">
              <thead className="table-header-footer">
                <tr>
                  <th className="font-color-white weight-light">Key</th>
                  <th className="font-color-white weight-light">Value</th>
                  <th className="font-color-white weight-light">Remove Row</th>
                </tr>
              </thead>
              <tbody>
                {rowArray.map((entry) => {
                  return (
                    <tr>
                      <td>
                        <input
                          required
                          type="key"
                          className="shadow-sm"
                          onChange={(e) => {
                            let newEntry = entry;
                            let index = rowArray.indexOf(entry);
                            newEntry = { ...newEntry, Key: e.target.value };
                            editRowData(newEntry, index);
                          }}
                          value={entry.Key}
                        ></input>
                      </td>
                      <td>
                        <input
                          required
                          className="shadow-sm"
                          type="value"
                          onChange={(e) => {
                            let newEntry = entry;
                            let index = rowArray.indexOf(entry);
                            newEntry = {
                              ...newEntry,
                              Value: e.target.value,
                            };
                            editRowData(newEntry, index);
                          }}
                          value={entry.Value}
                        ></input>
                      </td>
                      <td>
                        <button
                          value="Remove"
                          type="button"
                          className="btn btn-danger shadow"
                          style={{
                            width: 50,
                          }}
                          onClick={(entry) => {
                            deleteRowClicked(entry);
                          }}
                        >
                          <img src={trashcan} className="delete-trashcan" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="table-header-footer">
                <tr>
                  <th colSpan="3">
                    <Row>
                      <Col>
                        <button
                          onClick={buttonClicked}
                          className="btn shadow btn-add-row shadow-sm btn-block weight-light"
                        >
                          Add Row
                        </button>
                      </Col>
                      <Col>
                        <input
                          value="Submit"
                          type="submit"
                          className="btn shadow btn-add-row shadow-sm btn-block weight-light"
                        ></input>
                      </Col>
                    </Row>
                  </th>
                </tr>
              </tfoot>
            </Table>
          </form>
        </Row>
        <Row>{error && <Alert>{error}</Alert>}</Row>
      </Container>
    </div>
  );
}

export default AddData;
