import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {MotivationBlock} from './index';

class Motivation extends React.Component {

    render() {
        const {masterMotivations} = this.props;
        return (
            <Col xl='12'>
                <Row className='justify-content-end'><h5>MOTIVATIONS</h5></Row>
                <hr/>
                <Row className='justify-content-center'>
                    {Object.keys(masterMotivations).map((type) =>
                            <MotivationBlock key={type} type={type}/>
                    )}
                </Row>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        masterMotivations: state.masterMotivations
    };
}

export default connect(mapStateToProps)(Motivation);
