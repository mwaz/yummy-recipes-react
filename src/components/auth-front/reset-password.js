import React, {Component} from 'react';
import axios from 'axios';
import {
     Button,
    Modal, Form,
    FormGroup, InputGroup
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';



export default class PasswordReset extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            cpassword: '',
            email: '',
            show: true
        }
    this.resetPassword = this.resetPassword.bind(this);
    }

    
    resetPassword = (event) => {
        const url = 'http://127.0.0.1:5000/yummy_api/v1/auth';
        let payload = { password: this.state.password}
        
        
        if (this.state.password !== this.state.cpassword) {
            toast("Password do not match", { type: toast.TYPE.ERROR });
            return 0;
        }

        axios.post( `${url}/password-reset`, payload)
        .then((response) => {
            toast.success(response.data.message)


        })
        .catch((error) => {
            if (error.response)
            {
                toast.error(error.response.data['message'])
            }
        }
        )

    }

render(){
    return (



    );
}}


