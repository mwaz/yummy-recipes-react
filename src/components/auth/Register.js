import React, { Component } from 'react';
import { Panel, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import axiosInstance from '../common/AxiosInstance';

/**
 * Component that handles user registration
 */
class Register extends Component {
  constructor(props) {
    super(props);
    /**
     * Sets different states for variables to be used in the component
     */
    this.state = {
      username: '',
      email: '',
      password: '',
      cpassword: '',
      redirect: '',
      errors: {},
    };
  }
  /**
     * Handles the click event genereated by the registration button
     */
  handleClick() {
    const payload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      cpassword: this.state.cpassword,

    };
    if (this.state.password !== this.state.cpassword) {
      toast('Password Mismatch', { type: toast.TYPE.ERROR });
      return 0;
    }

    /**
     * Calls an axios instance to make the call to the API
     */
    axiosInstance
      .post('auth/register', payload)
      .then((response) => {
        toast.success(response.data.message);
        this.setState({ redirect: true });
        window.localStorage.setItem('login', 'False');

        console.log(JSON.stringify(response));
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data['message']);
        }
      });
    return 0;
  }

  render() {
    /**
     * Renders the login page on successful registration
     * Can only render th registration page if and only if the token
     * does not exist in the local storage
     */
    const redirect = this.state.redirect;
    const token = window.localStorage.getItem('token');
    if (redirect || token) {
      return <Redirect to={{ pathname: '/categories' }} />;
    }
    return (
      <div>
        <div className="background-div">
          <NavigationBar />
          <div className="background-container">
            <div className="background-container-form">
              <center><strong> <div style={{ fontSize: '20px', paddingBottom: '1%' }}> Register Here </div></strong></center>
              <ToastContainer />
              <div className="card">
                <div className="card-title">Registration </div>
                <div className="card-text">
                  <Panel header="Register" bsStyle="warning">
                    <FormGroup>
                      <FormControl style={{ backgroundColor: 'white', color: 'black', filter: 'opacity(1)' }} type="text" id="username" placeholder="username" name="username" onChange={event => this.setState({ username: event.target.value })} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl style={{ backgroundColor: 'white', color: 'black', filter: 'opacity(1)' }} type="email" id="email" placeholder="email" name="email" onChange={event => this.setState({ email: event.target.value })} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl style={{ backgroundColor: 'white', color: 'black', filter: 'opacity(1)' }} type="password" id="password" placeholder="Password" name="password" onChange={event => this.setState({ password: event.target.value })} />
                    </FormGroup>
                    <FormGroup>
                      <FormControl style={{ backgroundColor: 'white', color: 'black', filter: 'opacity(1)' }} type="password" id="cpassword" placeholder="confirm Password" name="cpassword" onChange={event => this.setState({ cpassword: event.target.value })} />
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
