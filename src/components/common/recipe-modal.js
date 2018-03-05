import React from 'react';

import {
    Col, Button,
    Modal, Row, Breadcrumb, Form,
    FormGroup, InputGroup, Pagination
} from 'react-bootstrap';

const RecipeModal = (props) => {
return(
    <Modal show={props.method_state} onHide={props.hide_state} className="modal-fade" >
        <form onSubmit={props.submit_form}>
            <Modal.Header onClick={props.modal_header} >
                <Modal.Title> {props.modal_title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="form-group">
                    <label className="col-md-6 control-label"
                        htmlFor="recipe_name">Recipe Name</label>
                    <div className="col-md-12">
                        <input type="text" className="form-control"
                            id="recipe_name" placeholder={props.recipe_name} value={props.recipe_name_value} onChange={props.name_change} readonly={props.readonly}/>
                    </div>
                    <label className="col-md-6 control-label"
                        htmlFor="recipe_ingredients">Recipe Ingredients</label>
                    <div className="col-md-12">
                        <textarea rows="4" cols="50" className="form-control"
                            id="recipe_ingredients" placeholder={props.recipe_ingredients} value={props.recipe_ingredients_value} onChange={props.ingredients_change} readonly={props.readonly}>
                        </textarea>
                    </div>
                    <label className="col-md-6 control-label"
                        htmlFor="recipe_methods">Recipe Methods</label>
                    <div className="col-md-12">
                        <textarea rows="4" cols="50" className="form-control"
                            id="recipe_methods" placeholder={props.recipe_methods} value={props.recipe_methods_value} onChange={props.recipe_methods_change} readonly={props.readonly}>
                        </textarea>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" type="submit" id="recipe_modal_button" onClick={props.submit_click_state}> {props.submit_button } </Button>
                <Button bsStyle="info" onClick={props.cancel_click_state} id="cancel" > Cancel</Button>

            </Modal.Footer>
        </form>

    </Modal>
    );}

    export default RecipeModal

