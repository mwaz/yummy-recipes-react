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
import { Redirect } from 'react-router-dom';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            redirect:  false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = () => {
        window.localStorage.setItem('login', 'false');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
       

       

        this.setState({
            redirect: true,
        });
    }
   
    render() {
        const redirect = this.state.redirect;
        const username = window.localStorage.getItem('name');
        if (redirect) {
           return  <Redirect to  {...'/login'} />;

        }

        return (
            <div className="navigation-bar">
                <Navbar  background-color="transparent" background="transparent" border-color="transparent" dark expand="md" >
                    <NavbarBrand href="/">Yummy Recipes</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem color="white">
                                <NavLink style={{ color: 'white' }} href="/categories">{username ?
                                `Welcome ${username}` : `Welcome Guest`}</NavLink>
                            </NavItem>
                            <NavItem>
                            {username ?
                                "" :
                                    <NavLink style={{ color: 'white' }} href="/login/">
                                    Login
                                    </NavLink>}
                                </NavItem>
                            <NavItem>
                                {username ? 
                                    <NavLink href="/categories" style={{ color: 'white' }}>Categories</NavLink> :
                                    "" }
                            </NavItem>
                            <UncontrolledDropdown nav innavbar="true">
                                
                                    
                                <DropdownToggle nav caret style={{ color: 'white' }}>
                                    Account
                                </DropdownToggle>
                                    
                                <DropdownMenu >
                                    <DropdownItem divider />
                                    {username ?
                                    <DropdownItem onClick={(event => this.handleLogout(event))} > 
                                            Logout
                                    </DropdownItem>:
                                        <DropdownItem href="/" >
                                            Register
                                    </DropdownItem>
                                         }

                                    <DropdownItem onClick={(event => this.handleLogout(event))} >
                                        Reset Password

                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}