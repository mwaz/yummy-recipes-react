import React from 'react';
import {
    Col, Button,
    Modal, Row, Breadcrumb, Form,
    FormGroup, InputGroup, Pagination,
} from 'react-bootstrap';

const ReusableModal = (props) => {
    return (
        <Modal show={props.method_state}  className="modal-fade">
            <form onSubmit={props.method}>
                <Modal.Header >
                    <Modal.Title> {props.category_state}  </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label className="col-md-4 control-label"
                            htmlFor="Category_name">Category Name</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control"
                                id="new_cat" placeholder={props.category_placeholder} value={props.category_value} onChange={props.onChange} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="info" type="submit" id="add-update"> {props.btn_name} </Button>
                    <Button bsStyle="danger" onClick={props.current_state} id="cancel"> Cancel</Button>

                </Modal.Footer>
            </form>

        </Modal>
    );
}
export default ReusableModal

    // (event => this.setState({ editCategory: false }))