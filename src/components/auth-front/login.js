import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../common/navbar.js';
import Footer from '../common/footer.js';
import { Panel, FormGroup, FormControl, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect : '',

        }
    }
    handleClick(event){
        const url = 'http://127.0.0.1:5000/yummy_api/v1/auth';
        let payload = {
            'email': this.state.email,
            'password': this.state.password,
        }
        axios.post(`${ url }/login`, payload)
            .then((response) => {
                window.localStorage.setItem('token', response.data.access_token);

                toast.success(response.data['message'])
                    this.setState({ redirect: true })
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                }
            })
    }
    
    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect to={{ pathname: '/categories' }} />
        }
        return (
            <div>
                <Navbar />
            <div className="background-div">
                <div className="background-container">
                    <div className="background-container-form">
                        <center><strong> <div style={{ fontSize: "20px", paddingBottom: "1%" }}>Login  Here </div></strong></center>
                        
                            <ToastContainer />
                        <Panel header='Register' bsStyle="warning">
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="email" id="email" placeholder="email" onChange={(event) => this.setState({ email: event.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{ backgroundColor: "black", color: "white", filter: "opacity(1)", }} type="password" id="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                            </FormGroup>
                            <Button bsStyle="success" onClick={(event => this.handleClick(event))}>Login</Button>
                        </Panel>
                    </div>
                </div>
            </div>
            <Footer />
            </div>

        );
    }
}
export default Login;
