import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "../../index.css";
import { useHistory } from "react-router-dom";

function Home({ buttonClicked }) {
  const path = useHistory();

  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/v1/data/userSets/", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let rows = [];
        let promises = data.map((row) => {
          return fetch(
            `http://localhost:8000/api/v1/data/userSet/${row.name}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              rows.push({
                Name: row.name,
                Size: data.dataset_size,
                Date_Uploaded: row.created,
                Last_Queried: row.last_queried,
                id: row.id,
              });
            });
        });
        Promise.all(promises).then(() => {
          setDatasets(rows);
          setErrors(data.length == 0);
          setLoading(false);
        });
      });
  }, []);

  return (
    <Container className="home-container">
      <Row>
        <Col md={4}>
          <h1 className="welcome display-5 pt-3 pb-3">Welcome to Pear</h1>
        </Col>
      </Row>
      <Row>
        <Table className="table shadow-lg" hover bordered>
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
            {errors == true && (
              <tr>
                <td colSpan="5">
                  <h4 className="font-color-black weight-light">
                    No datasets found
                  </h4>
                </td>
              </tr>
            )}
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
              datasets.map((dataset) => {
                return (
                  <tr>
                    <td>{dataset.Name}</td>
                    <td>{dataset.Size}</td>
                    <td>{dataset.Date_Uploaded}</td>
                    <td>{dataset.Last_Queried}</td>
                    <td>
                      <a
                        href="#"
                        onClick={() => {
                          localStorage.setItem("dataset", dataset.Name);
                          path.push("/dataset");
                        }}
                      >
                        View Data
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot className="table-header-footer">
            <tr>
              <th colSpan="5">
                <Col>
                  <button
                    type="submit"
                    className="btn btn-create shadow btn-block weight-light"
                    onClick={buttonClicked}
                  >
                    Upload
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
