import React, { Component } from 'react';
import { Panel, Col, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import "../index.css";
import background from "../images/recipes.jpg";

const registrationForm = {
    width: '100%',
    height: "100vh",
    paddingRight: "12%",
    paddingLeft: "52%",
    paddingTop: "100px",
    paddingBottom: "50px",
    backgroundColor: "#000",
    zIndex: "9999",
    filter: "opacity(.92)",
};
const registration = {
    width: '100%',
    height: "vh",
    backgroundColor: "#ffffff",
    filter: "opacity(.93)",
    
};

const backgroundDiv = {
    width: "100%",
    color: "white",
    height: "100vh",
    backgroundImage: "url(" + background + ")",
    backgroundRepeat: "repeat -y",
    zIndex: "-9999",

};

class Register extends Component {
    render() {
        return (
        <div style={backgroundDiv}>
            <div style={registration}>
            <div style={registrationForm}>
            <center><strong> <div style={{fontSize:"20px", paddingBottom:"1%"}}> Register Here </div></strong></center>
            <Panel header='Register' bsStyle="warning">
                <FormGroup>
                    <FormControl style={{backgroundColor:"black", color:"white", filter: "opacity(1)",}} type="text" id="username" placeholder="username" onChange={(event) => this.setState({ username: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <FormControl style={{backgroundColor:"black", color:"white", filter: "opacity(1)",}} type="email" id="email" placeholder="email" onChange={(event) => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <FormControl style={{backgroundColor:"black", color:"white", filter: "opacity(1)",}} type="password" id="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <FormControl style={{backgroundColor:"black", color:"white", filter: "opacity(1)",}} type="password" id="cpassword" placeholder="confirm Password" onChange={(event) => this.setState({ cpassword: event.target.value })} />
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
