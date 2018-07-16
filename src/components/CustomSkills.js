import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData} from '../actions';
import {ControlButtonSet, DeleteButton} from './';
import {omit} from 'lodash-es';

const clone = require('clone');


class CustomSkillsComponent extends React.Component {
    state = {name: '', type: '', characteristic: '', setting: 'All', mode: 'add'};

    initState = () => {
        this.setState({name: '', type: '', characteristic: '', setting: 'All', mode: 'add'});
    };

    handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSubmit = (event) => {
        const {customSkills, changeCustomData} = this.props;
        const {name, type, characteristic, setting} = this.state;
        let obj = clone(customSkills);
        obj[name.replace(/\s/g, '')] = {name, type, characteristic, setting};
        changeCustomData(obj, 'customSkills');
        this.initState();
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {customSkills, changeCustomData} = this.props;
        changeCustomData(omit(customSkills, event.target.name), 'customSkills', false);
        event.preventDefault();
    };

    handleEdit = (event) => {
        const {customSkills} = this.props;
        const skill = customSkills[event.target.name];
        this.setState({
            name: skill.name,
            type: skill.type,
            characteristic: skill.characteristic,
            mode: 'edit',
            setting: skill.setting ? skill.setting : 'All'
        });
    };

    render() {
        const {customSkills, handleClose, modal} = this.props;
        const {name, type, characteristic, setting} = this.state;
        return (
            <Modal isOpen={modal} toggle={this.handleClose}>
                <ModalHeader toggle={handleClose}>Custom Skills</ModalHeader>
                <ModalBody className='m-1 text-left'>
                    <Row className='m-1 align-items-center'>
                        <Col sm='3'><b>NAME:</b></Col>
                        <Col>
                            <Input type='text' value={name} name='name' maxLength='25'
                                   onChange={this.handleChange} disabled={this.state.mode === 'edit'}/>
                        </Col>
                    </Row>
                    <Row className='m-1 align-items-center'>
                        <Col sm='3'><b>TYPE:</b></Col>
                        <Col>
                            <Input type='select' value={type} name='type' onChange={this.handleChange}>
                                <option value=''/>
                                {['General', 'Combat', 'Social', 'Magic', 'Knowledge'].map((key) =>
                                    <option value={key} key={key}>{key}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='m-1 align-items-center'>
                        <Col sm='3'><b>CHAR:</b></Col>
                        <Col>
                            <Input type='select' value={characteristic} name='characteristic'
                                   onChange={this.handleChange}>
                                <option value=''/>
                                {['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'].map((key) =>
                                    <option value={key} key={key}>{key}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='m-1 align-items-center'>
                        <Col sm='3'><b>SETTING:</b></Col>
                        <Col>
                            <Input type='text' value={setting} name='setting' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className='m-1 justify-content-end'>
                        <ControlButtonSet
                            mode={this.state.mode}
                            type={'Skill'}
                            handleSubmit={this.handleSubmit}
                            onEditSubmit={this.handleSubmit}
                            onEditCancel={this.initState}
                            disabled={name === '' || type === '' || characteristic === ''}/>
                    </Row>

                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>CHAR</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(customSkills).map((key) =>
                            <tr key={key}>
                                <td>
                                    {customSkills[key].name}
                                </td>
                                <td>
                                    {customSkills[key].type}
                                </td>
                                <td>
                                    {customSkills[key].characteristic}
                                </td>
                                <td>
                                    <Button name={key} onClick={this.handleEdit}>Edit</Button>
                                </td>
                                <td>
                                    <DeleteButton name={key} onClick={this.handleDelete}/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData}, dispatch);
}


export const CustomSkills = connect(mapStateToProps, matchDispatchToProps)(CustomSkillsComponent);
