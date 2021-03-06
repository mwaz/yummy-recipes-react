import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Panel, FormGroup, FormControl, Button } from 'react-bootstrap';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import axiosInstance from '../common/AxiosInstance';

/**
 * Component is responsible for user login
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: '',
      username: ''
    };
  }

  handleClick() {
    /**
     * Takes care of loging functionality when user clicks the login button
     */
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    /**
     * uses an instance of axios when calling the API
     */
    axiosInstance
      .post('/auth/login', payload)
      .then(response => {
        window.localStorage.setItem('token', response.data.access_token);
        window.localStorage.setItem('name', response.data.user);
        window.localStorage.setItem('login', 'true');

        toast.success(response.data.message);
        this.setState({ redirect: true, username: response.data.user });
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  render() {
    /**
     * Renders the login page and redirects if at all the login details are correct
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
              <center>
                <strong>
                  {' '}
                  <div style={{ fontSize: '20px', paddingBottom: '1%' }}>
                    Login Here{' '}
                  </div>
                </strong>
              </center>
              <ToastContainer />
              <div className="card">
                <div className="card-title">Login </div>
                <div className="card-text">
                  <Panel header="&quot;Login&quot;">
                    <FormGroup>
                      <FormControl
                        style={{
                          backgroundColor: 'white',
                          color: 'black',
                          filter: 'opacity(1)'
                        }}
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        style={{
                          backgroundColor: 'white',
                          color: 'black',
                          filter: 'opacity(1)'
                        }}
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={event =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </FormGroup>
                    <Button
                      bsStyle="success"
                      type="submit"
                      id="login"
                      onClick={event => this.handleClick(event)}
                    >
                      Login
                    </Button>
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
