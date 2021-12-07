import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import trashcan from "../../images/delete_trashcan.png";
import { useHistory } from "react-router-dom";

function Dataset({ buttonClicked }) {
  const path = useHistory();

  var [dataPairs, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const reloadData = () => {
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
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(
      `http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/data/userSets/?dataset_name=${localStorage.getItem(
        "dataset"
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    ).then(() => {
      localStorage.removeItem("dataset");
      path.push("/home");
    });
  };

  function handleDeleteRow(e) {
    fetch(
      `http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/data/userPair/${
        e.key
      }/${e.value}/${localStorage.getItem("dataset")}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    ).then(() => {
      reloadData();
    });
  }

  return (
    <div>
      <Container className="home-container">
        <Row>
          <h1 className="display-6 pe-5 pt-3 pb-2">
            {localStorage.getItem("dataset")}
          </h1>
        </Row>
        <Row>
          <Col>
            <button
              className="btn btn-create shadow btn-lg weight-light"
              onClick={buttonClicked}
            >
              Get URL and Token for Qualtrics
            </button>
          </Col>
          <Col md>
            <button
              className="btn btn-create shadow btn-lg weight-light"
              onClick={() => {
                path.push("/add");
              }}
            >
              Add Data
            </button>
          </Col>
          <Col>
            <button
              className="btn btn-danger shadow btn-lg weight-light"
              onClick={handleDelete}
            >
              Delete Dataset
            </button>
          </Col>
        </Row>
        <br />
        <Row>
          <Table className="table" hover bordered useFlexLayout>
            <thead className="table-header-footer">
              <tr>
                <th className="font-color-white weight-light">Key</th>
                <th className="font-color-white weight-light">Value</th>
                <th
                  className="font-color-white weight-light"
                  style={{ width: "10%" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {/* create's a table entry for each entry in the Dataset */}
              <React.Fragment>
                {loading ? (
                  <tr>
                    <td colSpan="5">
                      <h4 className="font-color-black weight-light">
                        {" "}
                        Loading...{" "}
                      </h4>
                    </td>
                  </tr>
                ) : (
                  dataPairs.map((entry) => {
                    return (
                      <tr>
                        <td>{entry.key}</td>
                        <td>{entry.value}</td>
                        <td>
                          <button
                            value="Remove"
                            type="button"
                            className="btn btn-sm btn-danger"
                            style={{
                              width: 50,
                            }}
                            onClick={() => handleDeleteRow(entry)}
                          >
                            <img src={trashcan} className="delete-trashcan" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </React.Fragment>
            </tbody>
            <tfoot className="table-header-footer">
              <tr>
                <th colSpan="3"></th>
              </tr>
            </tfoot>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Dataset;
