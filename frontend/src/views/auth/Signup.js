import Modal from "react-bootstrap/Modal";
import '../../index.css';


import React, { useState, useEffect } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('/');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

//     return (
//         <div>
//             <Modal show={props.show} onHide={props.buttonClicked}>
//                 <Modal.Header className="modal-header-footer" closeButton>
//                     <Modal.Title className="m-title">Sign Up Form</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="modal-body">
//                 <form onSubmit={submitHandler}>
//                     <div className="form-group">
//                         <label className="font">Email</label>
//                         <input type="email" className="form-control shadow-sm" placeholder="Enter email"/>
//                     </div>
//                     <div className="form-group">
//                         <label className="font">Password</label>
//                         <input type="password" className="form-control shadow-sm" placeholder="Enter password"/>
//                     </div>
//                     <div className="form-group">
//                         <label className="font">Re-enter Password</label>
//                         <input type="password" className="form-control shadow-sm" placeholder="Enter password"/>
//                     </div>
//                 </form>
//                 </Modal.Body>
//                 <Modal.Footer className="modal-body">
//                     <button className=" modal-btn btn login-btn btn-lg btn-block shadow" type="submit "variant="primary">
//                         Sign Up
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }

// export default Signup
    const user = {
      email: email,
      password1: password1,
      password2: password2
    };

    fetch('http://localhost:8000/api/v1/users/auth/register/', {
      method: 'POST',
      headers: {
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
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Signup</h1>}
      {errors === true && <h2>Cannot signup with provided credentials</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>Email address:</label> <br />
        <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password1'>Password:</label> <br />
        <input
          name='password1'
          type='password'
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password2'>Confirm password:</label> <br />
        <input
          name='password2'
          type='password'
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />{' '}
        <br />
        <input type='submit' value='Signup' />
      </form>
    </div>
  );
};

export default Signup;
