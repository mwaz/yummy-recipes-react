import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Col, Row } from 'reactstrap';

export default class Paginator extends React.Component {
    render() {
        return (
            <Row>
            <Col sm={12}>
            <div className="paginate">
            <Pagination>
                Previous
                <PaginationItem>
                                <PaginationLink previous href="#"/> 
                </PaginationItem>
                
         
                <PaginationItem>
                    <PaginationLink next href="#"  Next/>
                </PaginationItem>
                Next
            </Pagination>
           
            </div>
            </Col>
            </Row>
              
            
        );
    }
}