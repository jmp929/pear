import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "../../index.css";
import Logo from "../../images/logo.svg";
import { useHistory } from "react-router-dom";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { Row, Form, Button, Col } from "react-bootstrap";

function CreateAcc() {
  const path = useHistory();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2,
    };

    fetch("http://localhost:8000/api/v1/users/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("/home");
        } else {
          setEmail("");
          setPassword1("");
          setPassword2("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      <Container>
        <Card className="create-account-card shadow-lg m-5">
          <Card.Body>
            <Row>
              <h1 className="display-6">Create Your Account Now</h1>
            </Row>
            <Row>
              <Form onSubmit={submitHandler}>
                <FormGroup className="p-4">
                  <input
                    type="email"
                    className="form-control shadow-sm p-2"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                </FormGroup>
                <FormGroup className="p-4">
                  <input
                    type="password"
                    className="form-control shadow-sm p-2"
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                  ></input>
                </FormGroup>
                <FormGroup className="p-4">
                  <input
                    name="password2"
                    type="password"
                    className="form-control shadow-sm p-2"
                    placeholder="Re-enter Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  ></input>
                </FormGroup>
                <button
                  type="submit"
                  className="btn login-btn shadow-sm btn-lg btn-block"
                >
                  Create Account
                </button>
              </Form>
            </Row>
            <Row>
              <p className="forgot-password ">Already Have An account?</p>
            </Row>
            <Row>
              <Form>
                <button
                  type="submit"
                  className="btn btn-create shadow-sm btn-lg btn-block"
                  onClick={() => path.push("/login")}
                >
                  Login
                </button>
              </Form>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CreateAcc;
