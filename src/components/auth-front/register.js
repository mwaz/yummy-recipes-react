import React, { Component } from 'react';
import NavigationBar from '../common/navbar.js';
import Footer from '../common/footer.js';
import { Redirect } from 'react-router-dom';
import { Panel, Col, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../common/axios-calls';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            cpassword: '',
            redirect: '',
            errors: {},
        }

    }
    handleClick(event) {
        let payload = {
            'username': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
            'cpassword': this.state.cpassword,

        }
        if (this.state.password != this.state.cpassword) {
            toast("Password Mismatch", { type: toast.TYPE.ERROR });
            return 0;
        }

        axiosInstance
            .post(`auth/register `, payload)
            .then((response) => {
                toast.success(response.data.message)
                this.setState({ redirect: true })
                window.localStorage.setItem('login', 'False');

                console.log(JSON.stringify(response))
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
            return <Redirect to={{ pathname: '/login' }} />
        }
        return (
            <div>
                <div className="background-div">
                    <NavigationBar />
                    <div className="background-container">
                        <div className="background-container-form">
                            <center><strong> <div style={{ fontSize: "20px", paddingBottom: "1%" }}> Register Here </div></strong></center>
                            <ToastContainer />
                            <div className="card">
                                <div className="card-title">Registration </div>
                                    <div className="card-text">
                                    <Panel header='Register' bsStyle="warning">
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="text" id="username" placeholder="username" name="username" onChange={(event) => this.setState({ username: event.target.value })} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="email" id="email" placeholder="email" name="email" onChange={(event) => this.setState({ email: event.target.value })} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="password" id="password" placeholder="Password" name="password" onChange={(event) => this.setState({ password: event.target.value })} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl style={{ backgroundColor: "white", color: "black", filter: "opacity(1)", }} type="password" id="cpassword" placeholder="confirm Password" name="cpassword" onChange={(event) => this.setState({ cpassword: event.target.value })} />
                                        </FormGroup>
                                        <Button type="submit" bsStyle="success" onClick={(event => this.handleClick(event))}>Register</Button>
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
export default Register;
