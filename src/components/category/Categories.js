import React, { Component } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../common/AxiosInstance';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import Paginater from '../common/Paginator';
import ReusableModal from '../common/ReusableModal';
import SearchForm from '../common/SearchForm';
import DeleteComponent from '../common/DeleteComponent';
import CardComponent from '../common/CardComponent';
import BreadCrumbComponent from '../common/BreadCrumbComponent';

/**
 * Component hold the category functionality
 */
export default class Categories extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      category_name: '',
      redirect: false,
      show: false,
      categories: [],
      id: '',
      search_text: '',
      prevPage: 1,
      nextPage: 2,
      update_category: 'Update Category',
      create_category: 'Create Category',
      current_page: '',
    };

    this.getPrevPage = this.getPrevPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.searchCategories = this.searchCategories.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddCategories = this.handleAddCategories.bind(this);
    this.editCategory = this.editCategory.bind(this);
  }


  /**
   * handles showing modal of adding a category
   */

  handleShow() {
    this.setState({ show: true });
  }

  // hides modal after category has been added
  handleHide() {
    this.setState({ show: false });
  }

  /**
   * handles functinality for adding a category
   */

  handleAddCategories(event) {
    event.preventDefault();
    const payload = {
      category_name: this.state.category_name,
    };
    axiosInstance
      .post('/categories/', payload)
      .then((response) => {
        toast.success(`Created ${response.data['category_name']}  category`);
        this.getCategories();
        this.setState({ show: false });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data['message']);
        }
      });
  }


  /**
   * Gets all the categories for a given user
   */
  getCategories() {
    axiosInstance
      .get('/categories/')
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data['message']);
          if (error.response.data['message'] === 'Token is expired') {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('name');
            window.localStorage.setItem('login', 'false');
          }
        }
      });
  }

  /**
 * Gets the previous page for a list of paginated categories
 */
  getPrevPage(event) {
    let prevPage = this.state.prevPage;
    let nextPage = this.state.nextPage;
    const currentPage = nextPage - prevPage;

    if (prevPage < 1 || nextPage < 2) {
      prevPage = 1;
      nextPage = 2;
      toast.error('You are on the first page');
    }
    
    event.preventDefault();
    axiosInstance
      .get(`/categories/?page=${currentPage}`)
      .then((response) => {
        this.setState({
          categories: response.data,
          nextPage: this.state.prevPage,
          prevPage: prevPage - 1,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error('Previous page not found');
        }
      });
  }

  /**
     * Gets the previous page for a list of paginated categories
     */
  getNextPage(event) {
    let nextPage = this.state.nextPage;
    let prevPage = this.state.prevPage;
    if (prevPage < 1 || nextPage < 2) {
      prevPage = 1;
      nextPage = 2;
    }
    event.preventDefault();
    axiosInstance
      .get(`/categories/?page=${nextPage}`)
      .then((response) => {
        this.setState({
          categories: response.data,
          nextPage: nextPage + 1,
          prevPage: this.state.nextPage,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error('Next page not found');
        }
      });
  }

  /**
     *handles editing of a category
     */

  editCategory(event, id) {
    id = this.state.id;
    event.preventDefault();

    const payload = {
      category_name: this.state.category_name,
    };
    axiosInstance
      .put(`/categories/${id}`, payload)
      .then((response) => {
        toast.success(`Successfully edited ${this.state.category_name} category`);
        this.getCategories();
        this.setState({ editCategory: false });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ editCategory: true });
          toast.error(error.response.data.message);
        }
      });
  }

  /**
     * Handles deleting a category
     */
  handleDelete(event, id) {
    id = this.state.id;
    event.preventDefault();

    axiosInstance
      .delete(`/categories/${id}`)
      .then((response) => {
        toast.error(response.data.message);
        this.setState({ handleDelete: false });
        this.getCategories();
        if (this.state.categories.length === 1) {
          this.setState({ categories: [] });
        }
        else {
          this.getCategories();
        }
      })

      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
          this.getCategories();
        }
      });
  }

  /**
     * Handles logic for searching a category
     */
  searchCategories(event) {
    event.preventDefault();
    if (!this.state.search_text) {
      //   toast('No Search item provided', { type: toast.TYPE.ERROR });
      this.getCategories();
      return 0;
    }
    axiosInstance
      .get(`/categories/search/?q=${this.state.search_text}`)
      .then((response) => {
        this.setState({
          categories: response.data,
          nextPage: this.state.nextPage,
          prevPage: this.state.prevPage,
        });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
          this.getCategories();
        }
      });
    return 0;
  }

  /**
    * checks if there are any categories before rendering the page
    */
  checkCategories() {
    const categories = this.state.categories;
    if (categories < 1) {
      return ('You currently do not have any recipe categories');
    }
    return 0;
  }


  /**
     * On page load all the categories for a particular user are shown
     */
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const redirect = this.state.redirect;
    const categories = this.state.categories;
    const search = this.state.search_text;
    console.log(search);
    const next = this.state.nextPage;
    const prev = this.state.prevPage;
    console.log(`${next} + next page  + Prev page + ${prev}`);

    /**
     * page will only render categories if the user is logged in else redirect to login
     */
    if (redirect) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return (

      <div>
        <div style={{ color: 'white', backgroundColor: '#EEEEEE', background: 'grey' }}>
          <NavigationBar />
        </div>
        <div className="empty-div">
        </div>
        <div className="categories-parent-background">
          <div className="categories-container">
            <div className="grid">
              <ToastContainer />
              { /* Displays the breadcrumb on top of the container */ }
              <BreadCrumbComponent active_item="Categories/" />
              {/* Searching for a category or categories */}
                    
              <SearchForm
                search_event={(event => this.searchCategories(event))}
                name_change={(event => this.setState({ search_text: event.target.value }))}
                search={this.searchCategories}
                clear={this.getCategories}
                search_placeholder="Search Categories"
              />

              <Row>
                <Col sm={4}>
                  <Button bsStyle="info" onClick={this.handleShow}> <span> Add recipe category </span> </Button>
                </Col>
              </Row>
              <div>
                {/*  modal to  add a category  */}
                <ReusableModal
                  method_state={this.state.show}
                  method={this.handleAddCategories}
                  category_state="Add Category"
                  category_placeholder="Category Name"
                  onChange={event => this.setState({ category_name: event.target.value })}
                  current_state={this.handleHide}
                  btn_name="Add Category"
                />

                {/* modal to delete a category  */}
                <DeleteComponent
                  view_modal={this.state.handleDelete}
                  form_submit={this.handleDelete}
                  modal_header={(event => this.setState({ handleDelete: false, event }))}
                  modal_title="Are you sure you want to delete this category?"
                  item_state={this.state.category_name}
                  click_state={(event => this.setState({ handleDelete: false, event }))}
                />

                {/* modal to update a category  */}
                <ReusableModal
                  method_state={this.state.editCategory}
                  method={this.editCategory}
                  category_state="Edit Category"
                  onChange={event => this.setState({ category_name: event.target.value })}
                  category_placeholder={this.state.category_name}
                  category_value={this.state.category_name}
                  current_state={(event => this.setState({ editCategory: false, event }))}
                  btn_name="Update"
                />

              </div>
              <Row>
                {/* Loops over the category objects and displays each as a card */}
                {
                    categories.map((categories) => (
                      <CardComponent
                        id={categories.id}
                        card_title={categories.category_name}
                        click_edit_event={(event => this.setState({ editCategory: true, id: categories.id, category_name: categories.category_name, event }))}
                        click_delete_event={(event => this.setState({ handleDelete: true, id: categories.id, category_name: categories.category_name, event }))}
                        url={`/categories/${categories.id}/recipes/`}
                        btn_name="View Recipes"
                      />
                    ))
                }
              </Row>
              {
                this.checkCategories() ? <div className="alert alert-danger">No categories on this land, kindly add them </div> : <div> </div>
              }

              <Paginater previous={this.getPrevPage} next={this.getNextPage} />
            </div>


          </div>
        </div>
        {/* Hanldes the margin  between the category cards and the footer :-) */}
        <div className="empty-div">
        </div>
        <Footer />
      </div>
    );
  }
}
