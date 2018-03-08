import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {
    Button,
    Modal, Form,
    FormGroup, InputGroup,
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../common/axios-calls'

/**
 * Navbar component with logout
 */
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            redirect: false,
            password_reset_click: false,
            password: '',
            cpassword: '',
            email: '',
            show: false

        };
        this.resetPassword = this.resetPassword.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handle_password_reset = this.handle_password_reset.bind(this);
    }

/**
 * Method to handle modal for password reset 
 */
    handle_password_reset = () => {
        this.setState({ password_reset_click: true });
    }

/**
 * Toggling the navbar buttons
 */
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

/**
 * Method to handle logging out a user
 */
    handleLogout = () => {
        axiosInstance
            .post(`/auth/logout`)
            .then((response) => {
                toast.success(response.data.message)
                window.localStorage.setItem('login', 'false');
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                this.setState({
                    redirect: true,
                });
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                }
            })
       
    }


    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }

/**
 * Method to handle reset password
 */

    resetPassword = (event) => {
        let payload = {
            reset_password: this.state.password,
            confirm_password: this.state.cpassword
        }
        if (this.state.password !== this.state.cpassword) {
            toast("Password do not match", { type: toast.TYPE.ERROR });
            return 0;
        }

        axiosInstance
            .put(`/password-reset`, payload)
            .then((response) => {
                toast.success(response.data.message);
                this.setState({ show: false });

            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message']);
                }
            });
    }

    render() {
    
    /**
     * Renders the navbar page depending on whether the user is logged in or not
     */
        const redirect = this.state.redirect;
        const username = window.localStorage.getItem('name');

        if (redirect) {
            return <Redirect to={{ pathname: '/login' }} />
        }
        return (
            <div className="navigation-bar">

                <Navbar background-color="transparent" background="transparent" border-color="transparent" dark expand="md" >
                    <NavbarBrand href="#">Yummy Recipes</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem color="white">
                                <NavLink style={{ color: 'white' }} href="/categories">{username ?
                                    `Welcome ${username}` : `Welcome Guest`}</NavLink>
                            </NavItem>
                            <NavItem>
                                {/** Will only display the login if user is not logged in **/}
                                {username ?
                                    "" :
                                    <NavLink style={{ color: 'white' }} href="/login/">
                                        Login
                                    </NavLink>}
                            </NavItem>
                            <NavItem>
                                {/** Will only display the Categories on navbar  if user  is logged in **/}
                                {username ?
                                    <NavLink href="/categories" style={{ color: 'white' }}>Categories</NavLink> :
                                    ""}
                            </NavItem>
                            <UncontrolledDropdown nav innavbar="true">


                                <DropdownToggle nav caret style={{ color: 'white' }}>
                                    Account
                                </DropdownToggle>

                                <DropdownMenu >
                                    <DropdownItem divider />
                                    {/** Will only display the logout if user is logged in else register **/}
                                    {username ?
                                        <DropdownItem id="logout" onClick={(event => this.handleLogout(event))} >
                                            Logout
                                    </DropdownItem> :
                                        <DropdownItem href="/" >
                                            Register
                                    </DropdownItem>
                                    }

                                    <DropdownItem onClick={this.handle_password_reset} onClick={(event => this.handleShow())}>
                                        {this.password_reset_click ? this.h : null}

                                        Reset Password

                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>

                </Navbar>
                <ToastContainer />
                <Modal className="modal-fade" {...this.props}
                    show={this.state.show} onHide={this.handleHide} >
                    <Modal.Header >
                        <Modal.Title> Reset Password </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">

                            <label className="col-md-6 control-label"
                                htmlFor="reset_password">reset password</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                    id="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                            </div>
                            <label className="col-md-6 control-label"
                                htmlFor="confirm_password">Confirm Password</label>
                            <div className="col-md-12">
                                <input type="text" className="form-control"
                                    id="cpassword" placeholder="Confirm Password" onChange={(event) => this.setState({ cpassword: event.target.value })} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" type="submit" id="reset" onClick={(event => this.resetPassword(event))} >Reset Password</Button>
                        <Button bsStyle="info" onClick={this.handleHide}> Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}