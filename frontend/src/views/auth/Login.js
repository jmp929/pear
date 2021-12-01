import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../../index.css';
import Logo from '../../images/logo.svg';
import { useHistory } from 'react-router-dom';
import Signup from './Signup';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!!localStorage.getItem('token')) {
        window.location.replace('/home');
      } else {
        setLoading(false);
      }
    }, []);
  
    const onSubmit = e => {
      e.preventDefault();
  
      const user = {
        email: email,
        password: password
      };
  
      fetch('http://localhost:8000/api/v1/users/auth/login/', {
        method: 'POST',
        headers: {
            Accept : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          if (data.key) {
            localStorage.clear();
            localStorage.setItem('token', data.key);
            window.location.replace('/home');
          } else {
            setEmail('');
            setPassword('');
            localStorage.clear();
            setErrors(true);
          }
        });
    };

    return (
        <Container>
                <Card className="login-card shadow-lg">
                <Card.Body>
                {loading === false}
                {errors === true && <h2>Cannot log in with provided credentials</h2>}
                {loading === false && (
                    <form onSubmit={onSubmit}>
                        <img className="logo" src={Logo} alt="Pear Logo"/>
                        <h1 className="login-title display-6">Pear</h1>
                        <p className="login-title">A one stop shop for you and your data pairs</p>
                        <div className="login-inputs ">
                            <div className="form-group">
                                <input name='email' type="email" className="form-control login-credentials shadow" placeholder="Email Address" onChange={e => setEmail(e.target.value)} value={email} required/>{" "}
                            </div>

                            <div className="form-group">
                                <input name='password' type="password" className="form-control login-credentials shadow" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} required/>{" "}
                            </div>
                        </div>
                        <button type="submit" className="btn login-btn btn-lg btn-block shadow" onClick={onSubmit}>Log In</button>
                        <p className="need-account font">Don't have an account?</p>
                        <Link to="/signup">
                            <button type="button" className="btn btn-create btn-lg btn-block shadow" component={Signup}>Create Account</button>
                        </Link>
                        <p className="forgot-password text-right">
                          <a href="#">Forgot password?</a>
                        </p>
                    </form>
                )}
                </Card.Body>
            </Card>
        </Container>
    )
}



export default Login