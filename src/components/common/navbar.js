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
        localStorage.removeItem('token');
        this.setState({
            redirect: true,
        });
    }
    render() {
        const redirect = this.state.redirect;
        if (redirect) {
           return  <Redirect to  {...'/login'} />;

        }

        return (
            <div className="navigation-bar">
                <Navbar color="faded" light expand="md" >
                    <NavbarBrand href="/">Yummy Recipes</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/categories">Categories</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav innavbar="true">
                                <DropdownToggle nav caret>
                                    Account
                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem>
                                        Register
                  </DropdownItem>
                                    <DropdownItem href="/login/">
                                        Login
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={(event => this.handleLogout(event))} > 
                                        Logout
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