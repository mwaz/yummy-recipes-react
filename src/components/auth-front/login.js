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
            username: '',

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
                window.localStorage.setItem('name', response.data['user']);
                window.localStorage.setItem('login', 'true');
                


                toast.success(response.data['message'])
                    this.setState({ redirect: true, username: response.data['user'] })
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    // console.log(error.resposne.data.message)
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
                
            <div className="background-div">
                    <Navbar />
                <div className="background-container">
                    <div className="background-container-form">
                        <center><strong> <div style={{ fontSize: "20px", paddingBottom: "1%" }}>Login  Here </div></strong></center>
                        
                            <ToastContainer />
                            <div className="card">
                                <div className="card-title">Login </div>
                                <div className="card-text">
                                    <Panel header='Register' bsStyle="warning">
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="email" id="email" placeholder="email" onChange={(event) => this.setState({ email: event.target.value })} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="password" id="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                                        </FormGroup>
                                        <Button bsStyle="success" onClick={(event => this.handleClick(event))}>Login</Button>
                                    </Panel>
                                     </div>
                                
                            </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
            </div>

        );
    }
}
export default Login;
