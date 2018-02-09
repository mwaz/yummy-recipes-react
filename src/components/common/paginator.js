import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Col, Row } from 'reactstrap';

export default class Paginator extends React.Component {
    render() {
        return (
            <Row>
            <Col sm={12}>
            <div className="paginate">
            <Pagination>
               
                <PaginationItem>
                                <PaginationLink previous href="#"/> 
                </PaginationItem>
                
         
                <PaginationItem>
                    <PaginationLink next href="#"  Next/>
                </PaginationItem>
              
            </Pagination>
           
            </div>
            </Col>
            </Row>
              
            
        );
    }
}