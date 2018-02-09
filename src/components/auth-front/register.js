import React, { Component } from 'react';
import NavigationBar from '../common/navbar';
import Footer from '../common/footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Panel, FormGroup, FormControl, Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

class Register extends Component {  
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            cpassword: '',
            redirect: '',
        }
    }
   handleClick (event){
       const url = 'http://127.0.0.1:5000/yummy_api/v1/auth';
       let payload = {
           'username': this.state.username,
           'email': this.state.email,
           'password': this.state.password,
           'cpassword': this.state.cpassword,

       }
    if(this.state.password !== this.state.cpassword){
        toast("Password Mismatch", {type: toast.TYPE.ERROR});
        return 0;
       }
    
    axios.post(`${ url }/register `, payload)
           .then((response) => {
               this.setState({ redirect: true })
               toast.success(response.data['message'])
               console.log(response.data['message'])

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
            return <Redirect to={{ pathname: '/login' }} />
        }
        return (
            <div>
            <NavigationBar />
                
            <div className="background-div">
                <div className="background-container">
                    <div className="background-container-form">
                        <center><strong> <div style={{ fontSize: "20px", paddingBottom: "1%" }}> Register Here </div></strong></center>
                           
                        <ToastContainer />
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
            <Footer />
            </div>
        );
    }
}
export default Register;
