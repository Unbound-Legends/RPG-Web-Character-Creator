import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonGroup, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {
    addCustomDataSet,
    changeCustomDataSet,
    changeCustomDataSetName,
    deleteCustomDataSet,
    loadCustomDataSet
} from '../actions';
import {ModalDeleteConfirm} from './';

class CustomDataSelectComponent extends React.Component {
    state = {
        name: this.props.customDataList ? this.props.customDataList[this.props.customDataSet] : '',
        deleteModal: false,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.customDataList) this.setState({name: this.props.customDataList[nextProps.customDataSet]});
        if (nextProps.customDataList) this.setState({name: nextProps.customDataList[nextProps.customDataSet]});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSelect = (event) => {
        const {changeCustomDataSet, loadCustomDataSet} = this.props;
        changeCustomDataSet(event.target.value);
        loadCustomDataSet();
        event.preventDefault();
    };


    confirmedDelete = (event) => {
        this.props.deleteCustomDataSet();
        this.setState({deleteModal: false});
        event.preventDefault();
    };

    handleNameChange = (event) => {
        event.preventDefault();
        this.props.changeCustomDataSetName(this.state.name);
    };

    render() {
        const {customDataSet, customDataList} = this.props;
        const {name, deleteModal} = this.state;
        return (
            <Col>
                <Row className='justify-content-end'><h5>CUSTOM DATASET</h5></Row>
                <hr/>
                <Row className='my-2'>
                    <Col className='m-auto'>
                        <InputGroup>
                            <Input type='select' value={customDataSet} onChange={this.handleSelect}>
                                {customDataList && Object.keys(customDataList).map((key) =>
                                    <option value={key}
                                            key={key}>{customDataList[key]}</option>
                                )}
                            </Input>
                            <InputGroupAddon addonType='append'>
                                <ButtonGroup>
                                    <Button onClick={() => this.props.addCustomDataSet()}>New</Button>
                                    <Button onClick={() => this.setState({deleteModal: true})}>Delete</Button>
                                </ButtonGroup>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col className='m-auto'>
                        <b>CUSTOM DATASET NAME:</b>
                        <Input type='text' value={name ? name : ''} maxLength='50' name='name'
                               onChange={this.handleChange}
                               onBlur={this.handleNameChange}/>
                    </Col>
                </Row>
                <hr/>
                <ModalDeleteConfirm deleteModal={deleteModal}
                                    confirmedDelete={this.confirmedDelete}
                                    handleClose={() => this.setState({deleteModal: false})}
                                    type='Dataset'/>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        customDataSet: state.customDataSet,
        customDataList: state.customDataList,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loadCustomDataSet,
        addCustomDataSet,
        deleteCustomDataSet,
        changeCustomDataSet,
        changeCustomDataSetName
    }, dispatch);
}

export const CustomDataSelect = connect(mapStateToProps, matchDispatchToProps)(CustomDataSelectComponent);