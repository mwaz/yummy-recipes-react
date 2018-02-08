import React, { Component } from 'react';
import axios from 'axios';
import { Col,  Button,
        Modal,Row, Breadcrumb, Form,
        FormGroup, InputGroup} from 'react-bootstrap';
import Navbar from '../common/navbar'
import Footer from '../common/footer.js'
import Paginater from '../common/paginator'
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
            categories : [],
            next_page: '',
            previous_page: '',
            id: '',
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddCategories = this.handleAddCategories.bind(this);

       

        
    }


    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }
    handleAddCategories = () => {
        // event.preventDefault();
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
            this.getCategories();
            this.setState({handleAddCategories:false})

        })
        .catch((error) => {
            if (error.response) {
                toast.error(error.response.data['message'])
                // console.log(error.response.data['message'])
            }
        })
}

    getCategories = () => {
       axios({
           url: `${url}/categories/`,
           method: 'get',
           headers: {
               Authorization: window.localStorage.getItem('token'),
               content_type: 'application/json',
           },

       })
        .then((response) => {
            // console.log(response.data);
            
            this.setState({
                categories: response.data,
                
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

    handleDelete = (event, id) => {
        id = this.state.id,
        event.preventDefault();
        axios({
            url: `${url}/categories/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })

            .then((response) => {
                this.getCategories();
                toast.error(response.data['message']);
                this.setState({handleDelete:false})

            })

            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    // console.log(error.response.data['message'])
                }
            })

    }
    componentDidMount() {
        this.getCategories();
    }
    render() {
    const redirect = this.state.redirect;
    const categories = this.state.categories;

    let x = 0;
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
                            <Col sm={12}>
                        <Breadcrumb>
                            <Breadcrumb.Item active href="#">Categories/</Breadcrumb.Item>
                        </Breadcrumb>
                        </Col>
                        </Row>
                    <Form>
                        <Row style={{float:"right"}} >
                            <Col sm={8} >
                                <input id="mysearch" type="search" className="form-control" placeholder="search categories"/>
                            </Col>
                            <Col sm={3}>
                                <Button bsStyle="success">Search </Button>
                            </Col>
                        </Row>
                    </Form>

                        <Row>
                        
                        <Col sm={4}>
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
                                                    htmlFor="Category_name">Category Name</label>
                                    <div className="col-md-8">
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
                                <Modal show={this.state.handleDelete} onHide={this.close} className="modal-fade" >
                                    <Modal.Header onClick={(event => this.setState({ handleDelete: false }))} >
                                        <Modal.Title> delete this Category  </Modal.Title>
                                    </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={(event => this.handleDelete(event))}>
                                        <FormGroup>
                                            <InputGroup>
                                                <h5>Delete this category? </h5>
                                                <InputGroup.Button><Button bsStyle="danger" type="submit">delete</Button></InputGroup.Button>
                                            </InputGroup>
                                        </FormGroup>
                                    </form>
                                </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={(event => this.setState({ handleDelete: false }))} >Close</Button>
                                        
                                    </Modal.Footer>

                                </Modal>
                        </div>
                        
                    <Row>
                        
                        {
                                   
                            categories.map((categories) => (
                                        <Col sm={4} key={categories.id}> <i> {++x}</i>
                                <div className="card">
                                    <div className="card-title">{categories.category_name}</div>
                                    <div className="card-text">
                                        <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                                                    <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }} onClick={(event => this.setState({handleDelete:true, id: categories.id }))}>Delete</Button>
                                    </div>
                                    <Button bsStyle="success">View Recipes</Button>
                                </div>
                        </Col>
                            ))    
                    }  
                    </Row>
                 </div>
                 <Paginater />
                </div>
                </div>
                <div className="empty-div">
                </div>
                <Footer />
                </div>
                );
    }
}
