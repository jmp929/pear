import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "../../index.css";
import { useHistory } from "react-router-dom";

function Home(buttonClicked) {
  const path = useHistory();

  const [datasets, setDatasets] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let size = 0;
    fetch("http://localhost:8000/api/v1/data/userSets/", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        'content-type' : 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatasets(
          data.map((row) => {
            fetch(
              "http://localhost:8000/api/v1/data/userSet/" + row.name + "/",
              {
                method: "GET",
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            )
              .then((res) => (res = res.json()))
              .then((data) => {
                size = data.data_pairs.length;
              });
            return {
              Name: row.name,
              Size: size,
              Date_Uploaded: "08-10-2019",
              Last_Queried: "09-10-2021",
              id: row.id,
            };
          })
        );
        setLoading(false);
      });
  }, []);

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
              <th className="font-color-white weight-light">
                Date Last Queried
              </th>
              <th className="font-color-white weight-light">View Data Set</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? (
                <tr> Loading... </tr>
              ) : (
                datasets.map((dataset) => {
                  return (
                    <tr>
                      <td>{dataset.Name}</td>
                      <td>{dataset.Size}</td>
                      <td>{dataset.Date_Uploaded}</td>
                      <td>{dataset.Last_Queried}</td>
                      <td>
                        <a href="#" onClick={() => path.push("/dataset")}>
                          View Data
                        </a>
                      </td>
                    </tr>
                  );
                })
              )
              // }
              // }
            }
            {/* </React.Fragment> */}
          </tbody>
          <tfoot className="table-header-footer">
            <tr>
              <th colSpan="5">
                <Col md={4}>
                  <button
                    type="submit"
                    className="btn btn-create shadow btn-block weight-light"
                    onClick={() => path.push("/add")}
                  >
                    Add New Data Set Here
                  </button>
                </Col>
              </th>
            </tr>
          </tfoot>
        </Table>
      </Row>
    </Container>
  );
}

export default Home;
