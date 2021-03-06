import React, { Component } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../common/AxiosInstance';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import Paginater from '../common/Paginator';

import RecipeModal from '../common/RecipeModal';
import SearchForm from '../common/SearchForm';
import DeleteComponent from '../common/DeleteComponent';
import CardComponent from '../common/CardComponent';
import BreadCrumbComponent from '../common/BreadCrumbComponent';

/**
 * Component to Handle the recipes CRUD
 */

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_name: '',
      recipe_ingredients: '',
      recipe_methods: '',
      redirect: false,
      show: false,
      recipes: [],
      nextPage: 2,
      prevPage: 1,
      id: '',
      search_text: '',
      current_page: ''
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddRecipes = this.handleAddRecipes.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  }

  /**
   * Handles modal opening when adding a recipe
   */

  handleShow() {
    this.setState({ show: true });
  }

  /**
   *Handles modal closing after adding a recipe
   */
  handleHide() {
    this.setState({ show: false });
  }

  /**
   * Handles logic for adding a recipe
   */

  handleAddRecipes(event) {
    event.preventDefault();
    const payload = {
      recipe_name: this.state.recipe_name,
      recipe_methods: this.state.recipe_methods,
      recipe_ingredients: this.state.recipe_ingredients
    };

    axiosInstance
      .post(
        `/categories/${this.props.match.params.category_id}/recipes/`,
        payload
      )
      .then(response => {
        toast.success(`Created ${response.data.recipe_name}  recipe`);
        this.getRecipes();
        this.setState({ show: false });
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        }
      });
  }

  /**
   * handles logic to  fetch recipes
   */
  getRecipes() {
    axiosInstance
      .get(`/categories/${this.props.match.params.category_id}/recipes/`)
      .then(response => {
        this.setState({
          recipes: response.data,
          nextPage: this.state.nextPage,
          prevPage: this.state.prevPage
        });
      })
      .catch(error => {
        if (error.response) {
          toast.warning(error.response.data.error);
        }
      });
  }

  /**
   * Logic to get previous recipe page for paginated recipes
   */
  getPrevPage(event) {
    event.preventDefault();
    let prevPage = this.state.prevPage;
    let nextPage = this.state.nextPage;
    const currentPage = nextPage - prevPage;

    if (prevPage < 1 || nextPage < 2) {
      prevPage = 1;
      nextPage = 2;
      toast.error('You are on the first page');
    }
    axiosInstance
      .get(
        `/categories/${
          this.props.match.params.category_id
        }/recipes/?page=${currentPage}`
      )
      .then(response => {
        this.setState({
          recipes: response.data,
          nextPage: this.state.prevPage,
          prevPage: prevPage - 1
        });
      })
      .catch(error => {
        if (error.response) {
          toast.error('Previous page not found');
        }
      });
  }

  /**
   * handles logic to get next page of paginated recipes
   */
  getNextPage(event) {
    event.preventDefault();
    let prevPage = this.state.prevPage;
    let nextPage = this.state.nextPage;

    event.preventDefault();
    if (prevPage < 1 || nextPage < 2) {
      prevPage = 1;
      nextPage = 2;
    }
    axiosInstance
      .get(
        `/categories/${
          this.props.match.params.category_id
        }/recipes/?page=${nextPage}`
      )
      .then(response => {
        this.setState({
          recipes: response.data,
          nextPage: nextPage + 1,
          prevPage: this.state.nextPage
        });
      })
      .catch(error => {
        if (error.response) {
          toast.error('Next page not found');
        }
      });
  }

  /**
   * method to check if there are any recipes in the object and the state
   */
  checkRecipes() {
    const recipes = this.state.recipes;
    if (recipes < 1) {
      return 'No recipes found in this category';
    }
    return 0;
  }

  /**
   * Handles logic to search the recipes
   */

  searchRecipes(event) {
    event.preventDefault();
    if (!this.state.search_text) {
      //   toast('No Search item provided', { type: toast.TYPE.ERROR });
      this.getRecipes();
      return 0;
    }
    axiosInstance
      .get(`/recipes/search/?q=${this.state.search_text}`)
      .then(response => {
        this.setState({
          recipes: response.data,
          nextPage: this.state.nextPage,
          prevPage: this.state.prevPage
        });
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
          this.getRecipes();
        }
      });
    return 0;
  }
  /**
   * Handles logic to edit a recipe
   */

  editRecipe(event, id) {
    id = this.state.id;
    event.preventDefault();
    const payload = {
      recipe_name: this.state.recipe_name,
      recipe_methods: this.state.recipe_methods,
      recipe_ingredients: this.state.recipe_ingredients
    };
    axiosInstance
      .put(
        `/categories/${this.props.match.params.category_id}/recipes/${id}`,
        payload
      )
      .then(response => {
        this.getRecipes();
        toast.error(response.data.message);
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  /**
   * Handles logic to delete a recipe
   */
  handleDelete(event, id) {
    id = this.state.id;
    event.preventDefault();

    axiosInstance
      .delete(
        `/categories/${this.props.match.params.category_id}/recipes/${id}`
      )
      .then(response => {
        toast.error(response.data.message);
        this.setState({ handleDelete: false });
        if (this.state.recipes.length === 1) {
          this.setState({ recipes: [] });
        } else {
          this.getRecipes();
        }
      })

      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  /**
   * Fetches all the user recipes when the recipe page loads
   */
  componentDidMount() {
    this.getRecipes();
  }
  render() {
    const redirect = this.state.redirect;
    const recipes = this.state.recipes;

    if (redirect) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    return (
      <div>
        <div
          style={{
            color: 'white',
            backgroundColor: '#EEEEEE',
            background: 'grey'
          }}
        >
          <NavigationBar />
        </div>
        <div className="empty-div" />
        <div className="categories-parent-background">
          <div className="categories-container">
            <div className="grid">
              <ToastContainer />
              {/* Component to display the breadcrumb on the page */}
              <BreadCrumbComponent
                active_item="/Recipes/"
                href="/categories"
                item_one="Categories"
              />

              {/* Form responsible for recipe search  */}
              <SearchForm
                search_event={event => this.searchRecipes(event)}
                name_change={event =>
                  this.setState({ search_text: event.target.value })
                }
                search={this.searchRecipes}
                search_placeholder="Search Recipes"
              />

              <Row>
                <Col sm={4}>
                  <Button bsStyle="info" onClick={this.handleShow}>
                    {' '}
                    <span> Add recipes </span>{' '}
                  </Button>
                </Col>
              </Row>
              <div>
                {/* Modal to add a recipe */}
                <RecipeModal
                  method_state={this.state.show}
                  hide_state={this.handleHide}
                  modal_title="Add Recipe"
                  recipe_name="Recipe Name"
                  name_change={event =>
                    this.setState({ recipe_name: event.target.value })
                  }
                  recipe_ingredients="Recipe Ingredients"
                  ingredients_change={event =>
                    this.setState({ recipe_ingredients: event.target.value })
                  }
                  recipe_methods="Recipe Methods"
                  recipe_methods_change={event =>
                    this.setState({ recipe_methods: event.target.value })
                  }
                  cancel_click_state={this.handleHide}
                  name_id="recipe_name"
                  ingredients_id="ingredients_name"
                  methods_id="methods_name"
                  actionButton={
                    <Button
                      id="recipe_btn"
                      bsStyle="success"
                      type="submit"
                      onClick={event => this.handleAddRecipes(event)}
                    >
                      {' '}
                      Add Recipe{' '}
                    </Button>
                  }
                />

                {/* Modal to delete a recipe */}
                <DeleteComponent
                  view_modal={this.state.handleDelete}
                  close_modal={this.close}
                  form_submit={event => this.handleDelete(event)}
                  modal_header={event =>
                    this.setState({ handleDelete: false, event })
                  }
                  modal_title="Are you sure you want to delete this recipe?"
                  item_state={this.state.recipe_name}
                  click_state={event =>
                    this.setState({ handleDelete: false, event })
                  }
                />

                {/* Modal to edit a recipe */}
                <RecipeModal
                  method_state={this.state.editRecipe}
                  hide_state={this.close}
                  submit_form={event => this.editRecipe(event)}
                  modal_header={event =>
                    this.setState({ editRecipe: false, event })
                  }
                  modal_title="Update Recipe"
                  recipe_name={this.state.recipe_name}
                  recipe_name_value={this.state.recipe_name}
                  name_change={event =>
                    this.setState({ recipe_name: event.target.value })
                  }
                  recipe_ingredients={this.state.recipe_ingredients}
                  recipe_ingredients_value={this.state.recipe_ingredients}
                  ingredients_change={event =>
                    this.setState({ recipe_ingredients: event.target.value })
                  }
                  recipe_methods={this.state.recipe_methods}
                  recipe_methods_value={this.state.recipe_methods}
                  recipe_methods_change={event =>
                    this.setState({ recipe_methods: event.target.value })
                  }
                  cancel_click_state={event =>
                    this.setState({ editRecipe: false, event })
                  }
                  name_id="recipe_name"
                  ingredients_id="ingredients_name"
                  methods_id="methods_name"
                  actionButton={
                    <Button
                      bsStyle="success"
                      type="submit"
                      id="recipe_modal_edit"
                      onClick={event =>
                        this.setState({ editRecipe: false, event })
                      }
                    >
                      {' '}
                      Update{' '}
                    </Button>
                  }
                />

                {/* Modal to view recipe details in readonly mode */}
                <RecipeModal
                  method_state={this.state.viewRecipe}
                  hide_state={this.close}
                  modal_header={event =>
                    this.setState({ viewRecipe: false, event })
                  }
                  modal_title="View Recipe Details"
                  recipe_name_value={this.state.recipe_name}
                  recipe_ingredients_value={this.state.recipe_ingredients}
                  recipe_methods_value={this.state.recipe_methods}
                  readonly={'readonly="'}
                  cancel_click_state={event =>
                    this.setState({ viewRecipe: false, event })
                  }
                />
              </div>
              <Row>
                {/* Show recipes in form of card after looping */}
                {recipes.map(recipes => (
                  <CardComponent
                    id={recipes.id}
                    card_title={recipes.recipe_name}
                    click_edit_event={event =>
                      this.setState({
                        editRecipe: true,
                        id: recipes.id,
                        recipe_name: recipes.recipe_name,
                        recipe_ingredients: recipes.recipe_ingredients,
                        recipe_methods: recipes.recipe_methods
                      })
                    }
                    click_delete_event={event =>
                      this.setState({
                        handleDelete: true,
                        id: recipes.id,
                        recipe_name: recipes.recipe_name
                      })
                    }
                    click={event =>
                      this.setState({
                        viewRecipe: true,
                        id: recipes.id,
                        recipe_name: recipes.recipe_name,
                        recipe_ingredients: recipes.recipe_ingredients,
                        recipe_methods: recipes.recipe_methods
                      })
                    }
                    btn_name="View Recipe \'s Details"
                  />
                ))}
              </Row>
              {this.checkRecipes() ? (
                <div className="alert alert-danger">
                  No recipes found on this land, kindly add them{' '}
                </div>
              ) : (
                <div> </div>
              )}
              <Paginater previous={this.getPrevPage} next={this.getNextPage} />
            </div>
          </div>
        </div>
        <div className="empty-div" />
        <Footer />
      </div>
    );
  }
}
