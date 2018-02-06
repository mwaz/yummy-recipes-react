import React, { Component } from 'react';
import {
    Col, Button,
    Modal, Row, Breadcrumb, Form
} from 'react-bootstrap';

export default class Recipes extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };
        this.state = {
            value: ''
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
                                    <Breadcrumb.Item active href="#">Categories</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#">/Recipes/</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Form>
                            <Row style={{ float: "right" }} >
                                <Col sm="8" >
                                    <input id="mysearch" type="search" className="form-control" placeholder="search recipes" />
                                </Col>
                                <Col sm="3">
                                    <Button bsStyle="success">Search </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col sm="4">
                                <Button className="add-categories-btn" onClick={this.handleShow}> <span> Add Recipes </span> </Button>
                            </Col>
                        </Row>
                        <div>
                            <Modal className="modal-fade" {...this.props}
                                show={this.state.show} onHide={this.handleHide}>

                                <Modal.Header >
                                    <Modal.Title id="contained-modal-title-sm" >
                                        Add Recipes
                            </Modal.Title>
                                </Modal.Header>
                                <Form className="form-horizontal" role="form">

                                    <Modal.Body>
                                        <div className="form-group">
                                            <label className="col-md-4 control-label"
                                                for="Category_name">Recipe Name</label>
                                            <div class="col-md-12">
                                                <input type="text" class="form-control"
                                                    id="Category_nam" placeholder="Recipe Name" />
                                            </div>
                                            <label className="col-md-12 control-label"
                                                for="recipe_desc" style={{ paddingTop: "10px" }}>Recipe Description</label>

                                            <div class="col-md-12" >
                                                <textarea id="recipe_desc" class="form-control" placeholder="Recipe Description" />
                                            </div>
                                            <label className="col-md-12 control-label"
                                                for="recipe_ingredients" style={{ paddingTop: "10px" }}>Recipe Ingredients</label>

                                            <div class="col-md-12">
                                                <textarea id="recipe_ingredients" class="form-control" placeholder="Recipe Ingredients"  />
                                                
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleHide} bsStyle="success">Add Recipe</Button>
                                        <Button onClick={this.handleHide} bsStyle="danger">Cancel</Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </div>

                        <Row>
                            <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Recipe One </div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipe Details</Button>
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Recipe Two</div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipe Details</Button>
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Recipe Three </div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipe Details</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
