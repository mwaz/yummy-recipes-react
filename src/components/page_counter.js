import React, { Component } from 'react';
import "../styles/index.css"
import { Button, MenuItem, ButtonGroup, DropdownButton} from 'react-bootstrap';

export default class PageCounter extends Component {
    render() {
        return (
            <center>
            <ButtonGroup>
                <Button>1</Button>
                <Button>2</Button>
                <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                    <MenuItem eventKey="1">Page 1</MenuItem>
                    <MenuItem eventKey="2">Page 2</MenuItem>
                </DropdownButton>
            </ButtonGroup>
            </center>
        );
    }
}
