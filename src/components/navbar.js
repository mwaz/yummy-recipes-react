import React from 'react';
import "../styles/index.css"
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

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
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
                            <UncontrolledDropdown nav innavbar="true">
                                <DropdownToggle nav caret>
                                    Account
                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem>
                                        Register
                  </DropdownItem>
                                    <DropdownItem href="/auth/login/">
                                        Login
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/auth/logout/"> 
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