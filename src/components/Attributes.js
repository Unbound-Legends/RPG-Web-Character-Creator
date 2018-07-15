import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Col, Input, Row} from 'reactstrap';
import * as selectors from '../selectors';


class AttributesComponent extends React.Component {
    state = {currentStrain: this.props.currentStrain, currentWound: this.props.currentWound};

    componentWillReceiveProps(nextProps) {
        this.setState({currentStrain: nextProps.currentStrain});
        this.setState({currentWound: nextProps.currentWound});
    }

    handleChange = (event) => {
        if (+event.target.value > 99) return;
        this.setState({[event.target.name]: +event.target.value.replace(/\D+/g, '')});
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {changeData} = this.props;
        let type = event.target.name;
        let value = this.state[type];
        changeData(value, type);
    };

    render() {
        const {woundThreshold, strainThreshold, totalSoak, totalDefense, totalEncumbrance, encumbranceLimit} = this.props;
        const {currentStrain, currentWound} = this.state;
        return (
            <Col lg='12'>
                <Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
                <hr/>
                <Row className='my-2 justify-content-center'>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>WOUNDS</Row>
                        <Row className='attributeValue' style={{left: '65%'}}>
                            {woundThreshold} {' | '}
                            <Input type='number'
                                   style={{fontSize: '20px', width: '35px'}}
                                   name='currentWound'
                                   maxLength='2'
                                   className='py-0 px-1 mx-1'
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   value={currentWound > 0 ? currentWound : ''}/>
                        </Row>
                    </div>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>STRAIN</Row>
                        <Row className='attributeValue' style={{left: '65%'}}>
                            {strainThreshold} {' | '}
                            <Input type='number'
                                   style={{fontSize: '20px', width: '35px'}}
                                   name='currentStrain'
                                   maxLength='2'
                                   className='py-0 px-1 mx-1'
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   value={currentStrain > 0 ? currentStrain : ''}/>
                        </Row>
                    </div>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>SOAK</Row>
                        <Row className='attributeValue'>{totalSoak}</Row>
                    </div>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/Defense.png'} alt='' className='png'/>
                        <Row className='attributeValue'>{`${totalDefense.ranged}  |  ${totalDefense.melee}`}</Row>
                    </div>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>ENCUMBRANCE</Row>
                        <Row className='attributeValue'>{`${encumbranceLimit}  |   ${totalEncumbrance}`}</Row>
                    </div>
                </Row>
            </Col>
        )
    }

}

function mapStateToProps(state) {
    return {
        woundThreshold: selectors.woundThreshold(state),
        strainThreshold: selectors.strainThreshold(state),
        totalSoak: selectors.totalSoak(state),
        totalDefense: selectors.totalDefense(state),
        totalEncumbrance: selectors.totalEncumbrance(state),
        encumbranceLimit: selectors.encumbranceLimit(state),
        currentWound: state.currentWound,
        currentStrain: state.currentStrain,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export const Attributes = connect(mapStateToProps, matchDispatchToProps)(AttributesComponent);