import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
/**
 * Component for showing the breadcrumbs on every file
 */
const BreadCrumbComponent = (props) => {
  return (
    <Row >
      <Col sm={12}>
        <Breadcrumb>
          <Breadcrumb.Item href={props.href} >{props.item_one}</Breadcrumb.Item>
          <Breadcrumb.Item active href="#" >{props.active_item}</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row >
  );
};

export default BreadCrumbComponent