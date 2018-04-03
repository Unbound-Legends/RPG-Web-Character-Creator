import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {characteristics} from '../reducers'
import {Characteristics} from './index';
import {chars} from '../data/lists';

class ShowCharacteristics extends React.Component {
    state = {modal: false};

    render() {
        const {characteristics} = this.props;
        return (
            <Col lg='12' onClick={() => this.setState({modal: true})}>
                <Row className='justify-content-end'><h5>CHARACTERISTICS</h5></Row>
                <hr/>
                <Row className='justify-content-center'>

                    {chars.map((stat) =>
                        <div className='imageBox' key={stat}>
                            <img src={'/images/png/Characteristic.png'} alt='' className='png'/>

                            <Row className='characteristicValue'>{characteristics[stat]}</Row>
                            <Row className='characteristicTitle'>{stat}</Row>
                        </div>
                    )}
                </Row>
                <Characteristics modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        characteristics: characteristics(state),
    };
}

export default connect(mapStateToProps)(ShowCharacteristics);
