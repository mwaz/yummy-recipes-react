import React from 'react';
import { Pagination, Col, Row, Button } from 'reactstrap';

const Paginator = (props) => {
        return (
            <Row >
                <Col md={5}> </Col>
                <center>
                    <div>
                        <Pagination>

                            <Button bsStyle='info' id="previous" onClick={props.previous}>Previous </Button>

                            {<div style={{ paddingRight: '10px' }}> </div>}

                            <Button bsStyle='info' id="next" onClick={props.next} >Next </Button>
                        </Pagination>

                    </div>
                </center>
            </Row>
        );
      
}
export default Paginator   