import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {CustomDataSelect, ImportExport} from './index';

const DataPage = () => {
    return (
        <Container className='mx-2'>
            <Row>
                <Col>
                    <ImportExport/>
                </Col>
                <Col>
                    <CustomDataSelect/>
                </Col>
            </Row>
        </Container>
    )
};

export default DataPage;
