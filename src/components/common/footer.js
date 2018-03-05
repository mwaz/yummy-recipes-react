import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
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