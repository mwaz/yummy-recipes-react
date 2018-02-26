import React, { Component } from 'react';
import axios from 'axios';
import { Col,  Button,
        Modal,Row, Breadcrumb, Form,
        FormGroup, InputGroup, Pagination,
    } from 'react-bootstrap';
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
            id: '',
            search_text: '',
            prev_page: 1,
            next_page: 2,
        }

        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddCategories = this.handleAddCategories.bind(this);
        this.editCategory = this.editCategory.bind(this);
        
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
            this.setState({show:false})
            

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
            
            this.setState({
                categories: response.data,
                
            });
        })
        .catch((error) => {
            if (error.response) {
                toast.warning(error.response.data.error);
            }
        });
}

    getPrevPage(event) {
        let prev_page = this.state.prev_page
        let next_page = this.state.next_page

        if(prev_page < 1 || next_page < 1){

            prev_page = 1;
            next_page = 2;
        } 
        console.log(prev_page)
        event.preventDefault();
        axios({
            url: `${url}/categories/?page=${prev_page}`,
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })
            .then((response) => {
                this.setState({
                    categories: response.data,
                    next_page: next_page - 1,
                    prev_page: prev_page - 1 ,

                    // prev_page: response.data.previous_page,
                    // next_page: response.data.next_Page,

                });
            })
            .catch(error =>
                console.log(JSON.stringify(error)));
    }

    getNextPage(event) {
        let next_page = this.state.next_page
        let prev_page = this.state.prev_page
        if (prev_page < 1 || next_page < 1) {

            prev_page = 1;
            next_page = 2;
        } 
        event.preventDefault();
        axios({
            url: `${url}/categories/?page=${next_page}`,
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })
            .then((response) => {
                this.setState({
                    categories: response.data,
                    next_page: next_page  + 1,
                    prev_page: this.state.next_page

                });
            })
            .catch(error =>
                console.log(JSON.stringify(error)));
    }

    editCategory = (event, id) => {
            id = this.state.id,
            event.preventDefault();

            const payload = {
                'category_name': this.state.category_name
            }
            axios({
            url: `${url}/categories/${id}`,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })

            .then((response) => {
                this.getCategories();
                toast.error(response.data['message']);
               

            })

            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    // console.log(error.response.data['message'])
                }
            })

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
                toast.error(response.data['message']);
                this.setState({handleDelete:false})
                if (this.state.categories.length === 1) {
                    this.setState({categories: []})
                }
                else {
                    this.getCategories();
                }
            

            })

            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    this.getCategories();
                }
            })

    }
    
    searchCategories = (event) => {
        if (this.state.search_text === "") {
            toast("No Search item provided", { type: toast.TYPE.ERROR });
            this.getCategories()
            return 0;
        }
        event.preventDefault();
        axios({
            url: `${url}/categories/search/?q=${this.state.search_text}`,
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
                    next_page: response.data.next_Page,
                    prev_page: response.data.prev_page,
                });
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    this.getCategories()
                }
            });

        

    }
    checkCategories = () => {
        const categories = this.state.categories;
        if (categories < 1) {
            return('You currently do not have any recipe categories');
        }
    }
    
   
    componentDidMount() {
        this.getCategories();
    }
    
    render() {
    const redirect = this.state.redirect;
    const categories = this.state.categories;
    const prev_page = this.state.prev_page
    const next_page = this.state.next_page
    console.log(categories.length)
    // console.log(next_page)
    // console.log(prev_page)
    // console.log(categories)
    let x = 0;
        if (redirect) {
            return <Redirect to={{ pathname: '/login' }} />;
        }
        
        return (
            
            <div>
                <div style={{ color: 'white', backgroundColor: '#EEEEEE', background:"grey"}}>
                <Navbar />
                </div>
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
                            <Form onSubmit={(event => this.searchCategories(event))}>
                        <Row style={{float:"right"}} >
                                   
                            <Col sm={8} >
                                        <input id="mysearch" type="search" className="form-control" placeholder="search recipes" onChange={(event) => this.setState({ search_text: event.target.value })}/>
                            </Col>
                            <Col sm={3}>
                                        <Button bsStyle="info" onClick={this.searchCategories} >Search </Button>
                            </Col>
                            
                        </Row>
                    </Form>

                        <Row>
                            
                        <Col sm={4}>
                            <Button bsStyle="info" className="add-categories-btn" onClick={this.handleShow}> <span> Add recipe category </span> </Button>
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
                                            <Button onClick={(event => this.handleAddCategories(event))} bsStyle="info">Add Category</Button>
                                <Button onClick={this.handleHide} bsStyle="danger">Cancel</Button>
                            </Modal.Footer>
                           </Form>
                         </Modal>
                                <Modal show={this.state.handleDelete} onHide={this.close} className="modal-fade" >
                                    <form onSubmit={(event => this.handleDelete(event))}>
                                    <Modal.Header onClick={(event => this.setState({ handleDelete: false }))} >
                                       
                                        <Modal.Title> Are you sure you want to delete this category? </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <center> {this.state.category_name}</center>
                                        </Modal.Body>
                                
                                    <Modal.Footer>
                                            <Button bsStyle="info" onClick={(event => this.setState({ handleDelete: false }))} >Cancel</Button>
                                        <InputGroup.Button><Button bsStyle="danger" type="submit">delete</Button></InputGroup.Button>
                                    </Modal.Footer>
                                     </form>

                                </Modal>

                                <Modal show={this.state.editCategory} onHide={this.close} className="modal-fade" >
                                    <form onSubmit={(event => this.editCategory(event))}>
                                    <Modal.Header onClick={(event => this.setState({ editCategory: false }))} >
                                        <Modal.Title> Update Category  </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        
                                            <div className="form-group">
                                                <label className="col-md-4 control-label"
                                                    htmlFor="Category_name">Category Name</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control"
                                                        id="new_Cat" placeholder="Category Name" onChange={(event) => this.setState({ category_name: event.target.value})} />
                                                </div>
                                            </div>
                                       
                                    </Modal.Body>
                                    <Modal.Footer>
                                            <InputGroup.Button><Button bsStyle="success" type="submit" onClick={(event => this.setState({ editCategory: false }))}>Update</Button></InputGroup.Button>
                                            <Button bsStyle="info" onClick={(event => this.setState({ editCategory: false }))}> Cancel</Button>

                                    </Modal.Footer>
                                    </form>

                                </Modal>

                        </div>
                        
                    <Row>
                        
                        {       
                            categories.map((categories) => (
                                        <Col sm={4} key={categories.id}> <i type="hidden"> {++x}</i>
                                <div className="card">
                                    <div className="card-title">{categories.category_name}</div>
                                    <div className="card-text">
                                        <Button bsStyle="success" style={{ width: "70px" }} onClick={(event => this.setState({ editCategory: true, id: categories.id }))}>Edit</Button>
                                        <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }} onClick={(event => this.setState({handleDelete:true, id: categories.id, category_name: categories.category_name  }))}>Delete</Button>
                                        
                                    </div>
                                        <Button bsStyle="info" href={`/categories/${categories.id}/recipes/`}>View Recipes </Button>
                                </div>
                        </Col>
                            ))    
                    }  
                    </Row>
                            {
                                this.checkCategories() ? <div className="alert alert-danger">No categories on this land, kindly add them </div> : <div> </div>
                            }

                            <Row >
                                <Col md={5}> </Col>
                                <center>
                                    <div>
                                        <Pagination>
                                            
                                            <Button bsStyle='info' onClick={this.getPrevPage}>Previous </Button>
                                             
                                            { <div style={{paddingRight: '10px'}}> </div> } 
                                               
                                            <Button bsStyle='info' onClick={this.getNextPage} >Next </Button>                           
                                        </Pagination>
                                       
                                    </div>
                                </center>
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
