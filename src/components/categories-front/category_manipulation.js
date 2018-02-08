import React, { Component } from 'react';
import axios from 'axios';


export default class CategoryManipulation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: '',
            category_name: '',
        }

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
                    categories: response.data.categories
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
 
 render() {
     return (
                 <Col sm="4" key={this.props.id}> <i> {++x}</i>
                     <div className="card">
                         <div className="card-title">{this.props.category_name}</div>
                         <div className="card-text">
                             <Button bsStyle="info" style={{ width: "70px" }}>Edit</Button>
                             <Button bsStyle="danger" style={{ marginLeft: "20px", width: "70px" }}>Delete</Button>
                         </div>
                         <Button bsStyle="success">View Recipes</Button>
                     </div>
                 </Col>
          
     );
 }
}