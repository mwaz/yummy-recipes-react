import React, { Component } from 'react';
import { Col,  Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Breadcrumb, Form} from 'react-bootstrap';

export default class Categories extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }


    render() {
        return (
            <div className="categories-parent-background">
                <div className="categories-container">
                    <div className="grid">
                        <Row>
                            <Col sm="12">
                        <Breadcrumb>
                            <Breadcrumb.Item active href="#">Categories/</Breadcrumb.Item>
                        </Breadcrumb>
                        </Col>
                        </Row>
                    <Form>
                        <Row style={{float:"right"}} >
                            <Col sm="8" >
                                <input id="mysearch" type="search" className="form-control" placeholder="search categories"/>
                            </Col>
                            <Col sm="3">
                                <Button bsStyle="success">Search </Button>
                            </Col>
                        </Row>
                    </Form>

                        <Row>
                        
                        <Col sm="4">
                            <Button className="add-categories-btn" onClick={this.handleShow}> <span> Add categories </span> </Button>
                        </Col>
                        </Row>
                        <div>
                            <Modal className="modal-fade" {...this.props}
                                show={this.state.show} onHide={this.handleHide}>
                           
                                <Modal.Header >
                                    <Modal.Title id="contained-modal-title-sm" >
                                       Add Category
                            </Modal.Title>
                                </Modal.Header>
                                <Form className="form-horizontal" role="form">
            
                                <Modal.Body>
                                <div className="form-group">
                                    <label className="col-md-4 control-label"
                                        for="Category_name">Category Name</label>
                                    <div class="col-md-8">
                                        <input type="text" className="form-control"
                                            id="Category_nam" placeholder="Category Name" />
                                    </div>
                                </div>
                                </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleHide} bsStyle="success">Add Category</Button>
                                <Button onClick={this.handleHide} bsStyle="danger">Cancel</Button>
                            </Modal.Footer>
                           </Form>
                         </Modal>
                        </div>
                        
                    <Row>
                        <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Category One </div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipes</Button>
                                </div>
                        </Col>
                            <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Category Two</div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipes</Button>
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Category Three </div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipes</Button>
                                </div>
                            </Col>
                    </Row>
                 </div>
                </div>
                </div>
                );
    }
}
