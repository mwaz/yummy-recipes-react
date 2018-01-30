import React, { Component } from 'react';
import { Panel, Col, FormGroup, FormControl, Button, InputGroup, Modal } from 'react-bootstrap';

const backgroundDiv = {
    width: '100%',
    height: "100vh",
    paddingRight: "12%",
    paddingLeft: "52%",
    paddingTop: "100px",
    paddingBottom: "50px",
    backgroundColor: "#EEEEEE",
    zIndex: "9999",
    filter: "opacity(.92)",
};

class Register extends Component {
    render() {
        return (
            <div style={backgroundDiv}>
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>One fine body...</Modal.Body>

                        <Modal.Footer>
                            <Button>Close</Button>
                            <Button bsStyle="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>;  
                </div>



        );
    }
}
export default Register;
