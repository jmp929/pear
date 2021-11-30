import React from 'react'
import header from '/Users/davidlundberg/pear/frontend/src/images/header.jpg';
import Logo from '/Users/davidlundberg/pear/frontend/src/images/logo.svg';
import CreateAcc from '../auth/CreateAcc';
import { Container, Row, Col } from 'react-bootstrap';

function Header() {
    return (
        <div>
            <header id="showcase" className="shadow-sm">
                <Row id="hero">
                    <Col>
                        <Row>
                            <h1 className="display-2">Pear</h1>
                            <h3 className="display-6">A one stop shop for you and your data pairs</h3>
                        </Row>
                    </Col>
                    <Col>
                        <img className="header-logo" src={Logo} alt="Pear Logo"/>
                    </Col>
                </Row>
            </header> 
            <div>
                <Row>
                    <Col className="p-4 header-info-container">
                        <Row>
                            <h1 className="display-4">Optimize Your Survey Research</h1>
                        </Row>
                        <Row className="p-4">
                            <li className="header-info-font">Pear allows researchers to dynamically return calues to the survey participant based on their inputs.</li>
                        </Row>
                        <Row className="p-4">
                            <li className="header-info-font">You, as the researcher, are able to upload datasets of key value pairs and provide Qualtrics with an API endpoint to Pear. </li>
                        </Row>
                        <Row className="p-4">
                            <li className="header-info-font">Pear will then retrieve the value from the specified dataset. </li>
                        </Row>
                        <Row className="p-4">
                            <h1 className="display-4">The Best Part?</h1>
                        </Row>
                        <Row className="p-2">
                            <li className="header-info-font">These requests are automatically processed when the participant enters an input into the specified field!</li>
                        </Row>
                    </Col>
                    <Col>
                        <CreateAcc />
                    </Col>
                </Row>  
            </div>
       </div>
    )
}

export default Header
