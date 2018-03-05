import React from 'react';
import { Modal, InputGroup, Button} from 'react-bootstrap';

const DeleteComponent = (props) => {
    return (
        <Modal show={props.view_modal} onHide={props.close_modal} className="modal-fade" >
            <form onSubmit={props.form_submit}>
                <Modal.Header onClick={props.modal_header} >

                    <Modal.Title> {props.modal_title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center> {props.item_state} </center>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="info" onClick={props.click_state} id="cancel" >Cancel</Button>
                    <Button bsStyle="danger" type="submit" id="delete" >delete</Button>
                </Modal.Footer>
            </form>

        </Modal> 
    );
}
export default DeleteComponent