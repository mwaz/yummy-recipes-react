import React from 'react';
import { Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Component responsible for displaying both recipes and categories
 */
const CardComponent = props => {
  return (
    <Col sm={4} key={props.index}>
      {' '}
      <i type="hidden"> {props.increment}</i>
      <div className="card">
        <div className="card-title">{props.card_title}</div>
        <div className="card-text">
          <Button
            bsStyle="success"
            id="edit"
            style={{ width: '70px' }}
            onClick={props.click_edit_event}
          >
            Edit
          </Button>
          <Button
            bsStyle="danger"
            id="delete"
            style={{ marginLeft: '20px', width: '70px' }}
            onClick={props.click_delete_event}
          >
            Delete
          </Button>
        </div>
        <Button bsStyle="info" id="view" href={props.url} onClick={props.click}>
          {props.btn_name}
        </Button>
      </div>
    </Col>
  );
};

CardComponent.propTypes = {
  card_title: PropTypes.string.isRequired,
  click_delete_event: PropTypes.func.isRequired,
  click_edit_event: PropTypes.func.isRequired
};

export default CardComponent;
