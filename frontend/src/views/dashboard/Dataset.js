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
  const [firstEntry, setFirstEntry] = useState(0);
  const [showEntries, setShowEntries] = useState(1000);
  const [search, setSearch] = useState("");
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
          <Col md="auto">
            <button
              className="btn btn-create shadow btn-md weight-light"
              onClick={() => path.push("/home")}
            >
              Back to Home
            </button>
          </Col>
        </Row>
        <Row md="auto">
          <h1 className="display-4 pe-5 pt-3 pb-2">
            {localStorage.getItem("dataset")}
          </h1>
        </Row>
        <Row>
          <Col md="auto">
            <button
              className="btn btn-create shadow btn-sm weight-light"
              onClick={buttonClicked}
            >
              Get URL and Token for Qualtrics
            </button>
          </Col>
          <Col md="auto">
            <button
              className="btn btn-create shadow btn-sm weight-light"
              onClick={() => {
                path.push("/add");
              }}
            >
              Add Data
            </button>
          </Col>
          <Col md="auto">
            <button
              className="btn btn-danger shadow btn-sm weight-light"
              onClick={handleDelete}
            >
              Delete Dataset
            </button>
          </Col>
        </Row>
        <br />
        <Row display="box">
          <Col md="auto">
            Show{" "}
            <select
              onChange={(e) => setShowEntries(parseInt(e.target.value))}
              type="text"
              list="dropdown"
            >
              <option value={dataPairs.length}>all</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            Entries
          </Col>
          <Col md="auto">
            Search:{" "}
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
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
                  dataPairs
                    .filter(
                      (entry) =>
                        entry.key.includes(search) ||
                        entry.value.includes(search)
                    )
                    .slice(firstEntry, firstEntry + showEntries)
                    .map((entry) => {
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
                <th colSpan="3">
                  <Row>
                    <Col>
                      <button
                        className="btn btn-create bt-lg weight-light"
                        onClick={() => setFirstEntry(firstEntry - showEntries)}
                        hidden={firstEntry == 0 || showEntries == 1000}
                      >
                        Previous page
                      </button>
                    </Col>
                    <Col>
                      <button
                        className="btn btn-create bt-lg weight-light"
                        onClick={() => setFirstEntry(firstEntry + showEntries)}
                        hidden={firstEntry + showEntries >= dataPairs.length}
                      >
                        Next page
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
