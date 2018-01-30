import React, { Component } from 'react';
import { Panel, Col, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import background from "../images/recipes.jpg";

class Register extends Component {
    render() {
        return (
            <div className="background-div">
                <div className="background-container">
                    <div className="background-container-form">
                        <center><strong> <div style={{ fontSize: "20px", paddingBottom: "1%" }}> Register Here </div></strong></center>
                        <Panel header='Register' bsStyle="warning">
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="text" id="username" placeholder="username" onChange={(event) => this.setState({ username: event.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="email" id="email" placeholder="email" onChange={(event) => this.setState({ email: event.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="password" id="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="password" id="cpassword" placeholder="confirm Password" onChange={(event) => this.setState({ cpassword: event.target.value })} />
                            </FormGroup>
                            <Button bsStyle="success" onClick={(event => this.handleClick(event))}>Register</Button>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
