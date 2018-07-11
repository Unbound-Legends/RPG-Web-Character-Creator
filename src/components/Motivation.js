import React from 'react';
import {Col, Row} from 'reactstrap';
import {MotivationBlock} from './index';

export const Motivation = () => {
    return (
        <Col xl='12'>
            <Row className='justify-content-end'><h5>MOTIVATIONS</h5></Row>
            <hr/>
            <Row className='justify-content-center'>
                {['Strength', 'Flaw', 'Desire', 'Fear'].map(type =>
                    <MotivationBlock key={type} type={type}/>
                )}
            </Row>
        </Col>
    )
};

