import React, { Component } from 'react';
import { Panel, Col, FormGroup, FormControl, Button, InputGroup,
         Modal, Grid, Row, Badge, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

class Register extends Component {
    render() {
        return (
            <div className="categories-parent-background">
                <div className="categories-container">
                    <div className="grid">
                        <Breadcrumb>
                            <Breadcrumb.Item active href="#">Categories/</Breadcrumb.Item>
                        </Breadcrumb>
                    
                    
                        
                    <Row>
                        <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Category One </div>
                                    <div className="card-text"></div>
                                    <Button bsStyle="btn btn-success btn-sm">View Recipes</Button>
                                </div>
                        </Col>
                        <Col sm="4">
                                <div className="card">
                                    <div className="card-title">Another Category Two </div>
                                    <div className="card-text"></div>
                                    <Button bsStyle="btn btn-success btn-sm">View Recipes</Button>
                                </div>
                        </Col>
                        <Col sm="4">
                            <div className="card">
                                <div className="card-title">SAnother Category 3 </div>
                                <div className="card-text"></div>
                                <Button bsStyle="btn btn-success btn-sm">View Recipes</Button>
                            </div>
                        </Col>
                    </Row>
                 </div>
                </div>
                </div>
                );
    }
}
export default Register;
