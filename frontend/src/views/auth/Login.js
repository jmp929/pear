import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "../../index.css";
import Logo from "../../images/logo.svg";
import { useHistory } from "react-router-dom";

function Login({ Login, error, buttonClicked }) {
  const path = useHistory();
  const [details, setDetails] = useState({ email: "", password: "" });

  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      window.location.replace("/home");
    } else {
      setLoading(false);
    }
  }, []);

  // Handles submit and prevents default empty form
  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      "http://pear-backend-slempp.apps.cloudapps.unc.edu/api/v1/users/auth/login/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem(
            "username",
            details.email.substring(0, details.email.lastIndexOf("@"))
          );
          localStorage.setItem("token", data.key);
          window.location.replace("/home");
        } else {
          setDetails({ email: "", password: "" });
          localStorage.clear();
          setErrors(true);
        }
      });

    //Recalls Login function with the newly set details ()
    Login({
      username: details.email.substring(0, details.email.lastIndexOf("@")),
      password: details.password,
    });
  };

  return (
    <Container>
      <Card className="login-card shadow-lg">
        <Card.Body>
          {loading === false && (
            <form onSubmit={submitHandler}>
              <img className="logo" src={Logo} alt="Pear Logo" />
              <h1 className="login-title display-6">Pear</h1>
              <p className="login-title">
                A one stop shop for you and your data pairs
              </p>
              {errors === true && (
                <Alert variant="danger">
                  Can not login with provided credentials
                </Alert>
              )}
              <div className="login-inputs ">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control login-credentials shadow"
                    placeholder="Email Address"
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    value={details.email}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control login-credentials shadow"
                    placeholder="Password"
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                  />
                </div>
              </div>
              <button
                className="btn login-btn btn-lg btn-block shadow"
                onClick={submitHandler}
              >
                Log In
              </button>
              <p className="need-account">Don't have an account?</p>
              <button
                type="submit"
                className="btn btn-create btn-lg btn-block shadow"
                onClick={buttonClicked}
              >
                Create Account
              </button>
              <p className="mt-3 text-right">
                <a href="#">Forgot password?</a>
              </p>
            </form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
