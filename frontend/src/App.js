// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/auth/Login.js' ;
import Navbarr from './components/layout/Navbarr';
import React, { useState} from 'react';
import { Button } from 'bootstrap';

function App() {
  
  const [user, setUser] = useState({email: ""});
  const [error, setError] = useState("");

  const Login_details = details => {
    console.log(details);
    // Sets the user state
    setUser({
      email: details.email
    });
  }

  // resets the user state
  const Logout = () => {
    setUser({name: "", email: ""});
  }

  return (
    <div className="App">
      <Navbarr />
      {/* If the user is not logged in show the Login From */}
      {(user.email !== "") ? (
        <div className="Welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <Button>Logout</Button>
        </div>
      ) : (
        // passes the empty login details (email) to the Login componenet
        <Login Login={Login_details} error={error}/>
      )}
    </div>
  );
}

export default App;
