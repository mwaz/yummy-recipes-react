import React from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';


/**
 * Component to handle search for both categeries and recipes
 */

const SearchForm = (props) => {
  return (
    <Form onSubmit={props.search_event}>
      <Row style={{ float: 'right' }} >
        <Col sm={8} >
          <input name="search" className="form-control" placeholder={props.search_placeholder} onKeyDown={props.name_change} onKeyPress={props.name_change} onChange={props.search} />
        </Col>
        <Col sm={3}>
          <Button id="mysearch" bsStyle="info" type="submit" onClick={props.clear}> Clear Search </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default SearchForm;
