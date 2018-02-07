import React, { Component } from 'react';
import axios from 'axios';
import { Col,  Button,
        Modal,Row, Breadcrumb, Form} from 'react-bootstrap';
import Navbar from './navbar'
import Footer from './footer'
import { Redirect } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify'

const url = 'http://127.0.0.1:5000/yummy_api/v1';
export default class Categories extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            category_name: '',
            redirect: false,
            show: false,
            categories : []
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        
    }


    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }
    handleAddCategories = () => {
        let payload = {
            'category_name': this.state.category_name
        }
        axios({
            url: `${ url }/categories/`,
            data: payload,
            method: 'post',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })
            .then((response) => {
                toast.success(`created ${ response.data['category_name']}  category`)

            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    console.log(error.response.data['message'])
                }
            })
    }

    handleViewCategories = () => {
       axios({
           url: `${url}/categories/`,
           method: 'get',
           headers: {
               Authorization: window.localStorage.getItem('token'),
               content_type: 'application/json',
           },

       })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    categories: response.data.categories,
                    // next_page: response.data.next_page,
                    // previous_page: response.data.previous_page,
                });
            })
            .catch((error) => {
                if (error.response) {
                    toast.warning(error.response.data.error);
                }
            });
    }
    
    componentWillMount() {
        this.handleViewCategories();
    }
    render() {
    const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to={{ pathname: '/login' }} />;
        }
        return (
            
            <div>
                <Navbar />
            <div className="empty-div">
            </div>
            <div className="categories-parent-background">
                <div className="categories-container">
                    <div className="grid">
                        <ToastContainer />
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
                            <Button className="add-categories-btn" onClick={this.handleShow}> <span> Add recipe category </span> </Button>
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
                                                        id="Category_nam" placeholder="Category Name" onChange={(event) => this.setState({ category_name: event.target.value })}/>
                                    </div>
                                </div>
                                </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={(event => this.handleAddCategories(event))} bsStyle="success">Add Category</Button>
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
                <div className="empty-div">
                </div>
                <Footer />
                </div>
                );
    }
}
