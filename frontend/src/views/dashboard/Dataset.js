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

function Dataset({ buttonClicked }) {
  const path = useHistory();
  var [headers, setHeaders] = useState([]);

  var [dataPairs, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/v1/data/userSet/${localStorage.getItem(
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

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   fetch(
  //     `http://localhost:8000/api/v1/data/userSet/${localStorage.getItem(
  //       "dataset"
  //     )}/delete/`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Token ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   localStorage.removeItem("dataset");
  //   path.push("/home");
  // };

  return (
    <div>
      <Container className="home-container">
        <Row>
          <Col md>
            <h1 className="display-6 pe-5 pt-3 pb-2">
              {localStorage.getItem("dataset")}
            </h1>
          </Col>
          <Col>
            <button
              className="btn btn-create shadow btn-lg weight-light"
              onClick={buttonClicked}
            >
              Get URL and Token for Qualtrics
            </button>
          </Col>
        </Row>
        <Row>
          <Table className="table" hover bordered useFlexLayout>
            <thead className="table-header-footer">
              <tr>
                <th className="font-color-white weight-light">{headers.key}</th>
                <th className="font-color-white weight-light">
                  {headers.value}
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
                      </tr>
                    );
                  })
                )}
              </React.Fragment>
            </tbody>
            <tfoot className="table-header-footer"></tfoot>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Dataset;
