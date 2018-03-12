import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
/**
 * Footer component
 */
const Footer = () => {
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
};

export default Footer;
