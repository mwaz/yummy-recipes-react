import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

/**
 * Component for showing the breadcrumbs on every file
 */
const BreadCrumbComponent = ({ href, item_one, active_item }) => {
  return (
    <Row>
      <Col sm={12}>
        <Breadcrumb>
          <Breadcrumb.Item href={href}>{item_one}</Breadcrumb.Item>
          <Breadcrumb.Item active href="#">
            {active_item}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  href: PropTypes.string,
  item_one: PropTypes.string,
  active_item: PropTypes.string
};
export default BreadCrumbComponent;
