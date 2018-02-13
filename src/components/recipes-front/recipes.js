import React, { Component } from 'react';
import axios from 'axios';
import {
    Col, Button,
    Modal, Row, Breadcrumb, Form,
    FormGroup, InputGroup
} from 'react-bootstrap';
import Navbar from '../common/navbar'
import Footer from '../common/footer.js'
import Paginater from '../common/paginator'
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

const url = 'http://127.0.0.1:5000/yummy_api/v1';
export default class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe_name: '',
            recipe_ingredients: '',
            recipe_methods: '',
            redirect: false,
            show: false,
            recipes: [],
            next_page: '',
            previous_page: '',
            id: '',
            
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddRecipes = this.handleAddRecipes.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.viewRecipe = this.viewRecipe.bind(this);
       
        
        
    }

    viewRecipe = () => {

    }
    handleShow = () => {
        this.setState({ show: true });
    }

    handleHide = () => {
        this.setState({ show: false });
    }
    handleAddRecipes = () => {
        // event.preventDefault();
        let payload = {
            'recipe_name': this.state.recipe_name,
            'recipe_methods': this.state.recipe_methods,
            'recipe_ingredients': this.state.recipe_ingredients,
        }
        
        axios({
            
            url: `${url}/categories/${this.props.match.params.category_id}/recipes/`,
            data: payload,
            method: 'post',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })
            .then((response) => {
                toast.success(`created ${response.data['recipe_name']}  recipe`)
                this.getRecipes();
                this.setState({ show: false })


            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    // console.log(error.response.data['message'])
                }
            })
    }

    getRecipes = () => {
        axios({
            url: `${url}/categories/${this.props.match.params.category_id}/recipes/`,
            method: 'get',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },

        })
            .then((response) => {
                // console.log(response.data);

                this.setState({
                    recipes: response.data,

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
    
    editRecipe = (event, id) => {
        id = this.state.id,
            event.preventDefault();

        let payload = {
            'recipe_name': this.state.recipe_name,
            'recipe_methods': this.state.recipe_methods,
            'recipe_ingredients': this.state.recipe_ingredients,
        }
        axios({
            url: `${url}/categories/${this.props.match.params.category_id}/recipes/${id}`,
            method: 'PUT',
            data: payload,
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })

            .then((response) => {
                this.getRecipes();
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
            url: `${url}/categories/${this.props.match.params.category_id}/recipes/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: window.localStorage.getItem('token'),
                content_type: 'application/json',
            },
        })

            .then((response) => {
                this.getRecipes();
                toast.error(response.data['message']);
                this.setState({ handleDelete: false })

            })

            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data['message'])
                    // console.log(error.response.data['message'])
                }
            })

    }
    componentDidMount() {
        this.getRecipes();
    }
    render() {
        const redirect = this.state.redirect;
        const recipes = this.state.recipes;
        console.log(recipes)
        
      
        
        
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
                                        <Breadcrumb.Item >Categories</Breadcrumb.Item>
                                        <Breadcrumb.Item active href="#" >/Recipes/</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>
                            <Form>
                                <Row style={{ float: "right" }} >
                                    <Col sm={8} >
                                        <input id="mysearch" type="search" className="form-control" placeholder="search categories" />
                                    </Col>
                                    <Col sm={3}>
                                        <Button bsStyle="success">Search </Button>
                                    </Col>
                                </Row>
                            </Form>

                            <Row>

                                <Col sm={4}>
                                    <Button className="add-categories-btn" onClick={this.handleShow}> <span> Add recipes </span> </Button>
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
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_name">Recipe Name</label>
                                                <div className="col-md-12">
                                                    <input type="text" className="form-control"
                                                        id="new_Cat" placeholder="Recipe Name" onChange={(event) => this.setState({ recipe_name: event.target.value })} />
                                                </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_ingredients">Recipe Ingredients</label>
                                                <div className="col-md-12">
                                                    <textarea rows="4" cols="50" className="form-control"
                                                        id="new_Cat" placeholder="Recipe Ingredients" onChange={(event) => this.setState({ recipe_ingredients: event.target.value })}>
                                                    </textarea>
                                                    </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_methods">Recipe Methods</label>
                                                <div className="col-md-12">
                                                    <textarea rows="4" cols="50" className="form-control"
                                                        id="new_Cat" placeholder="Recipe Cooking Methods" onChange={(event) => this.setState({ recipe_methods: event.target.value})}>
                                                    </textarea>
                                                    </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={(event => this.handleAddRecipes(event))} bsStyle="success">Add Recipe</Button>
                                            <Button onClick={this.handleHide} bsStyle="danger">Cancel</Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                                <Modal show={this.state.handleDelete} onHide={this.close} className="modal-fade" >
                                    <form onSubmit={(event => this.handleDelete(event))}>
                                        <Modal.Header onClick={(event => this.setState({ handleDelete: false }))} >

                                            <Modal.Title> Are you sure you want to delete this recipe? </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                           <center> {this.state.recipe_name} </center>
                                            </Modal.Body>

                                        <Modal.Footer>
                                            <Button bsStyle="success" onClick={(event => this.setState({ handleDelete: false }))} >Cancel</Button>
                                            <InputGroup.Button><Button bsStyle="danger" type="submit">delete</Button></InputGroup.Button>
                                        </Modal.Footer>
                                    </form>

                                </Modal>

                                <Modal show={this.state.editRecipe} onHide={this.close} className="modal-fade" >
                                    <form onSubmit={(event => this.editRecipe(event))}>
                                        <Modal.Header onClick={(event => this.setState({ editRecipe: false }))} >
                                            <Modal.Title> Update Recipe  </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <div className="form-group">
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_name">Recipe Name</label>
                                                <div className="col-md-12">
                                                    <input type="text" className="form-control"
                                                        id="new_Cat" placeholder={this.state.recipe_name} onChange={(event) => this.setState({ recipe_name: event.target.value })} />
                                                </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_ingredients">Recipe Ingredients</label>
                                                <div className="col-md-12">
                                                    <textarea rows="4" cols="50" className="form-control"
                                                        id="new_Cat" placeholder={this.state.recipe_ingredients} onChange={(event) => this.setState({ recipe_ingredients: event.target.value })}>
                                                    </textarea>
                                                </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_methods">Recipe Methods</label>
                                                <div className="col-md-12">
                                                    <textarea rows="4" cols="50" className="form-control"
                                                        id="new_Cat" placeholder={this.state.recipe_methods} onChange={(event) => this.setState({ recipe_methods: event.target.value })}>
                                                    </textarea>
                                                </div>
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <InputGroup.Button><Button bsStyle="success" type="submit" onClick={(event => this.setState({ editRecipe: false }))}>Update</Button></InputGroup.Button>
                                            <Button bsStyle="info" onClick={(event => this.setState({ editRecipe: false }))}> Cancel</Button>

                                        </Modal.Footer>
                                    </form>

                                </Modal>

                                <Modal show={this.state.viewRecipe} onHide={this.close} className="modal-fade" >
                                   
                                        <Modal.Header onClick={(event => this.setState({ viewRecipe: false }))} >
                                            <Modal.Title> View Recipe Details </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <div className="form-group">
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_name">Recipe Name</label>
                                                <div className="col-md-12">
                                                <input type="text" className="form-control" readonly=""
                                                        id="new_Cat" value={this.state.recipe_name} />
                                                </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_ingredients">Recipe Ingredients</label>
                                                <div className="col-md-12">
                                                <textarea rows="4" cols="50" className="form-control" readonly=""
                                                        id="new_Cat" value={this.state.recipe_ingredients}>
                                                    </textarea>
                                                </div>
                                                <label className="col-md-6 control-label"
                                                    htmlFor="recipe_methods">Recipe Methods</label>
                                                <div className="col-md-12">
                                                <textarea rows="4" cols="50" className="form-control" readonly=""
                                                        id="new_Cat" value={this.state.recipe_methods} >
                                                    </textarea>
                                                </div>
                                            </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                           
                                            <Button bsStyle="info" onClick={(event => this.setState({ viewRecipe: false }))}> Close </Button>

                                        </Modal.Footer>
                                  

                                </Modal>



                               

                            </div>

                            <Row>

                                {

                                    recipes.map((recipes) => (
                                        
                                        <Col sm={4} key={recipes.id}> <i> {++x}</i>
                                            <div className="card">
                                                <div className="card-title">{recipes.recipe_name}</div>
                                                <div className="card-text">
                                                    <Button bsStyle="info" style={{ width: "70px" }} onClick={(event => this.setState({ editRecipe: true, id: recipes.id, recipe_name: recipes.recipe_name, recipe_ingredients: recipes.recipe_ingredients, recipe_methods: recipes.recipe_methods }))}>Edit</Button>
                                                    <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }} onClick={(event => this.setState({ handleDelete: true, id: recipes.id, recipe_name: recipes.recipe_name }))}>Delete</Button>
                                                </div>
                                                <Button bsStyle="success" onClick={(event => this.setState({ viewRecipe: true, id: recipes.id, recipe_name: recipes.recipe_name, recipe_ingredients: recipes.recipe_ingredients, recipe_methods: recipes.recipe_methods }))}>View Recipes Details</Button>
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
