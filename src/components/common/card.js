import React from 'react';
import {Col, Button} from 'react-bootstrap';


const CardComponent = (props) => {
    return (
        <Col sm={4} key={props.id}> <i type="hidden">  {props.increment}</i>
            <div className="card">
                <div className="card-title">{props.card_title}</div>
                <div className="card-text">
                    <Button bsStyle="success" id="edit" style={{ width: "70px" }} onClick={props.click_edit_event}>Edit</Button>
                    <Button bsStyle="danger" id="delete" style={{ marginLeft: "20px", width: "70px" }} onClick={props.click_delete_event}>Delete</Button>

                </div>
                <Button bsStyle="info" id="view" href={props.url} onClick={props.click} id={props.view_id} >{props.btn_name}  </Button>
            </div>
        </Col>
    );
}
export default CardComponent