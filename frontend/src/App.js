// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './views/auth/Logout'
import Login from './views/auth/Login.js' ;
import Signup from './views/auth/Signup';
import Navbarr from './components/layout/Navbarr';
import HeaderNavbar from "./components/layout/HeaderNavbar";
import Home from './views/dashboard/Home';
import Upload from './views/dashboard/Upload';
import Dataset from "./views/dashboard/Dataset";
import AddData from './views/dashboard/AddData';
import React, { useState} from 'react';
import { Button } from 'bootstrap';
import Header from "./views/landing/Header";
import TokenModal from "./views/auth/TokenModal";
 


function App() {
  

  const [user, setUser] = useState({email: "", password: ""});
  const [token, setToken] = useState({hasToken: false, tokenTimeLeft: ''});
  const [error, setError] = useState("");

  // Show Sign Up Modal
  const [showState, setShowState] = useState(false);
  const signUpHandler = () => {
    setShowState((showState) => showState = !showState);
  }

  // Show Upload CSV Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const addDataHandler = () => {
    setShowUploadModal((showUploadModal) => showUploadModal = !showUploadModal);
  }

  //Show Token Modal 
  const [showTokenModal, setShowTokenModal] = useState(false);
  const tokenHandler = () => {
    setShowTokenModal((showTokenModal) => showTokenModal = !showTokenModal);
  }

  // Handle adding rows to addData
  const NewData =[
    {
        Key: '',
        Value: '',
    }
  ]; 
  const [RowArray, addRowsState] = useState([{Key: '', Value: ''}]);
  const addRowsHandler = () => {
    addRowsState((RowArray) => RowArray = [...RowArray, `${RowArray.length}`]);
  }
  

  //Handle Login_details
  const Login_details = details => {
    console.log(details);
    // Sets the user state
    setUser({
      email: details.email,
      password: details.password,

    });
  }
  const Token_details = tokenDetails => {
    setToken({
      hasToken: tokenDetails.hasToken,
      tokenTimeLeft: tokenDetails.tokenTimeLeft
    });
  }

  // resets the user state
  const Logout = () => {
    setUser({name: "", email: ""});
  }

  // const isLogged = !!localStorage.getItem("token")

  // if(!isLogged) {
  //     return (
  //       <Redirect to="/" />
  //     )
  // }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HeaderNavbar />
            <Header />
          </Route>
          <Route exact path="/login">
            <Login Login={Login_details} error={error} buttonClicked={signUpHandler}/>
          </Route>
          <Route exact path="/home">
            <Navbarr buttonClicked={tokenHandler}/>
            <Home buttonClicked={addDataHandler}/>
            {/* <Upload show={showUploadModal} buttonClicked={addDataHandler} /> */}
            <TokenModal Login={Login_details} Token={Token_details} show={showTokenModal} buttonClicked={tokenHandler}/>
          </Route>
          <Route exact path="/dataset">
            <Navbarr Token={Token_details} buttonClicked={tokenHandler}/>
            <TokenModal show={showTokenModal} buttonClicked={tokenHandler}/>
            <Dataset />
          </Route>
          <Route exact path="/add">
            <Navbarr buttonClicked={tokenHandler}/>
            <TokenModal show={showTokenModal} buttonClicked={tokenHandler}/>
            <AddData />
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/upload">
            <Upload/>
          </Route>
        </Switch>
      </Router>

      {/* If the user is not logged in show the Login From */}
      {/* {(user.email !== "") ? (
        <div className="Welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <Button>Logout</Button>
        </div>
      ) : (
        // passes the empty login details (email) to the Login componenet
        <Login Login={Login_details} error={error}/>
        // <Signup />
      )} */}
    </div>
  );
}

export default App;
