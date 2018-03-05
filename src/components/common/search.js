import React from 'react'

import {Form, Row, Col, Button} from 'react-bootstrap';

const SearchForm = (props) => {
    return (
        <Form onSubmit={props.search_event}>
            <Row style={{ float: "right" }} >
                <Col sm={8} >
                    <input  type="search" name="search" className="form-control" placeholder={props.search_placeholder} onChange={props.name_change} />
                </Col>
                <Col sm={3}>
                    <Button id="mysearch" bsStyle="info" id="btn-search" type="submit" onClick={props.search}>Search </Button>
                </Col>
            </Row>
        </Form>

    );
}
export default SearchForm
