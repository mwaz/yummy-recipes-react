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

export default class Footer extends React.Component {
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
            <div className="footer">
                <Navbar color="white" light expand="md">
                  
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>All rights reserved (c) 2018</NavLink>
                            </NavItem>
                        </Nav>
                    
                </Navbar>
            </div>
        );
    }
}