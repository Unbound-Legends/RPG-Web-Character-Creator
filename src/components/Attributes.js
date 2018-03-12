import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {
    encumbranceLimit,
    strainThreshold,
    totalDefense,
    totalEncumbrance,
    totalSoak,
    woundThreshold
} from "../reducers";

class Attributes extends React.Component {
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
                <Row className='justify-content-end'><b>ATTRIBUTES</b></Row>
                <hr/>
                <Row className='my-2'>
                    <Col>
                        <Card className='text-center h-100'>
                            <CardHeader>SOAK</CardHeader>
                            <CardBody>{totalSoak}</CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='text-center h-100'>
                            <CardHeader>WOUNDS</CardHeader>
                            <CardBody>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>{woundThreshold} {' | '} </InputGroupAddon>

                                    <Input type='number'
                                           name='currentWound'
                                           maxLength='2'
                                           className='p-0'
                                           onChange={this.handleChange}
                                           onBlur={this.handleBlur}
                                           placeholder={currentWound}
                                           value={currentWound > 0 ? currentWound : ''}/>
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='text-center h-100'>
                            <CardHeader>STRAIN</CardHeader>
                            <CardBody>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>{strainThreshold} {' | '} </InputGroupAddon>
                                    <Input type='number'
                                           name='currentStrain'
                                           maxLength='2'
                                           className='p-0'
                                           onChange={this.handleChange}
                                           onBlur={this.handleBlur}
                                           placeholder={currentStrain}
                                           value={currentStrain > 0 ? currentStrain : ''}/>
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='text-center h-100'>
                            <CardHeader>DEFENSE</CardHeader>
                            <CardBody>{totalDefense.ranged} {' | '} {totalDefense.melee}</CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='text-center h-100'>
                            <CardHeader>ENCUMBRANCE</CardHeader>
                            <CardBody>{encumbranceLimit} {' | '} {totalEncumbrance}</CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        )
    }

}


function mapStateToProps(state) {
    return {
        woundThreshold: woundThreshold(state),
        strainThreshold: strainThreshold(state),
        totalSoak: totalSoak(state),
        totalDefense: totalDefense(state),
        totalEncumbrance: totalEncumbrance(state),
        encumbranceLimit: encumbranceLimit(state),
        currentWound: state.currentWound,
        currentStrain: state.currentStrain,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Attributes);