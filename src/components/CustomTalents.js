import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../actions';

const modifiableAttributes = ['woundThreshold', 'strainThreshold', 'soak', 'meleeDefense', 'rangedDefense', 'defense', 'careerSkills'];

class CustomTalents extends React.Component {
    state = {
        name: '',
        tier: '',
        activation: '',
        turn: '',
        ranked: '',
        description: '',
        setting: '',
        modifier: false,
        modifierValue: '',
        prerequisite: '',
        antirequisite: ''
    };

    initState = () => {
        this.setState({
            name: '',
            tier: '',
            activation: '',
            turn: '',
            ranked: '',
            description: '',
            setting: '',
            modifier: false,
            modifierValue: '',
            prerequisite: '',
            antirequisite: ''
        });
    };

    handleChange = (event) => {
        let value = event.target.value;
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (event.target.name === 'tier') value = +value;
        if (modifiableAttributes.includes(this.state.modifier) && event.target.name === 'modifierValue') value = +value;
        this.setState({[event.target.name]: value});
        if (event.target.name === 'modifier') this.setState({modifierValue: ''});
        event.preventDefault();
    };

    handleCareerSkill = (event) => {
        const {modifierValue} = this.state;
        let arr = [];
        if (Array.isArray(modifierValue)) arr = [...modifierValue];
        arr.push(event.target.value);
        this.setState({modifierValue: arr});
        event.preventDefault();

    };

    handleSubmit = () => {
        const {name, modifier, modifierValue} = this.state;
        const {customTalents, changeCustomData} = this.props;
        let Obj = {...customTalents};
        let key = name.replace(/\s/g, '').replace(/[{()}]/g, '');
        Obj[key] = {};
        ['name', 'tier', 'activation', 'turn', 'ranked', 'description', 'setting', 'prerequisite', 'antirequisite'].forEach(stat => {
            if (this.state[stat] !== '') Obj[key][stat] = this.state[stat];
        });
        if (modifier) Obj[key].modifier = {[modifier]: modifierValue};
        changeCustomData(Obj, 'customTalents', false);
        this.initState();
    };

    handleDelete = (event) => {
        const {customTalents, changeCustomData} = this.props;
        let Obj = {...customTalents};
        delete Obj[event.target.name];
        changeCustomData(Obj, 'customTalents', false);
        event.preventDefault();
    };

    handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    handleEdit = (event) => {
        const {customTalents} = this.props;
        const talent = customTalents[event.target.name];
        this.setState({
            name: talent.name ? talent.name : '',
            tier: talent.tier ? talent.tier : '',
            activation: talent.activation !== undefined ? talent.activation : '',
            turn: talent.turn !== undefined ? talent.turn : '',
            ranked: talent.ranked !== undefined ? talent.ranked : '',
            description: talent.description !== undefined ? talent.description : '',
            setting: talent.setting !== undefined ? talent.setting : '',
            prerequisite: talent.prerequisite ? talent.prerequisite : '',
            antirequisite: talent.antirequisite ? talent.antirequisite : '',
            modifier: talent.modifier !== undefined ? Object.keys(talent.modifier)[0] : false,
            modifierValue: talent.modifier !== undefined ? Object.values(talent.modifier)[0] : '',
        });
    };

    render() {
        const {customTalents, modal, skills, talents} = this.props;
        const {name, tier, ranked, activation, turn, description, setting, modifier, modifierValue, prerequisite, antirequisite} = this.state;
        return (
            <Modal isOpen={modal} toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>Custom Talents</ModalHeader>
                <ModalBody className='m-3 text-left'>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Name:</b>
                        </Col>
                        <Col>
                            <Input className='my-auto' type='text' value={name} name='name' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Setting:</b>
                        </Col>
                        <Col>
                            <Input className='my-auto' type='text' value={setting} name='setting' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Tier:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={tier} name='tier'
                                   onChange={this.handleChange}>
                                {['', 1, 2, 3, 4, 5].map(number =>
                                    <option key={number} value={number}>{number}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Activation:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={activation} name='activation'
                                   onChange={this.handleChange}>
                                <option value=''/>
                                <option value={true}>Active</option>
                                <option value={false}>Passive</option>
                            </Input>
                        </Col>
                    </Row>
                    {activation &&
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Slot:</b>
                        </Col>
                        <Col>
                            <Input className='my-auto' type='text' value={turn} name='turn' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    }
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Ranked:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={ranked} name='ranked'
                                   onChange={this.handleChange}>
                                <option value=''/>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4'>
                            <b>Description:</b>
                        </Col>
                        <Col>
                            <textarea onChange={this.handleChange}
                                      name='description'
                                      rows='8'
                                      maxLength='200'
                                      className='w-100'
                                      value={description}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Prerequisite Talent:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={prerequisite} name='prerequisite'
                                   onChange={this.handleChange}>
                                <option value=''>None</option>
                                {Object.keys(talents).map(talentKey =>
                                    <option key={talentKey} value={talentKey}>{talents[talentKey].name}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Antirequisite Talent:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={antirequisite} name='antirequisite'
                                   onChange={this.handleChange}>
                                <option value=''>None</option>
                                {Object.keys(talents).map(talentKey =>
                                    <option key={talentKey} value={talentKey}>{talents[talentKey].name}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Modifier:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={!!modifier} name='modifier'
                                   onChange={this.handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Input>
                        </Col>
                    </Row>
                    {modifier &&
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Attribute:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={modifier} name='modifier'
                                   onChange={this.handleChange}>
                                <option value=''/>
                                <option value='careerSkills'>Career Skills</option>
                                <option value='defense'>Defense</option>
                                <option value='meleeDefense'>Melee Defense</option>
                                <option value='strainThreshold'>Strain Threshold</option>
                                <option value='soak'>Soak</option>
                                <option value='rangedDefense'>Ranged Defense</option>
                                <option value='woundThreshold'>Wound Threshold</option>
                                {Object.keys(skills).sort().map(key =>
                                    <option key={key} value={key}>{skills[key].name}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    }
                    {(modifiableAttributes.includes(modifier) || Object.keys(skills).includes(modifier)) &&
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Modifier Value:</b>
                        </Col>
                        <Col>
                            {modifier === 'careerSkills' ?
                                <div>
                                    <Input type='select' className='my-auto' value='' name='modifierValue'
                                           onChange={this.handleCareerSkill}>
                                        <option value=''/>
                                        {Object.keys(skills).filter(skill => !modifierValue.includes(skill)).sort().map(skillKey =>
                                            <option key={skillKey} value={skillKey}>{skills[skillKey].name}</option>
                                        )}
                                    </Input>
                                </div>
                                : (modifiableAttributes.includes(modifier) ?
                                        <Input type='number' className='my-auto' value={modifierValue}
                                               name='modifierValue'
                                               maxLength='25'
                                               onChange={this.handleChange}>
                                        </Input>
                                        :
                                        <Input type='select' className='my-auto' value={modifierValue}
                                               name='modifierValue'
                                               onChange={this.handleChange}>
                                            <option value=''/>
                                            <option value='[blue]'>Bonus Die</option>
                                            <option value='[black]'>Setback Die</option>
                                            <option value='[success]'>Success</option>
                                            <option value='[advantage]'>Advantage</option>
                                        </Input>
                                )
                            }
                        </Col>
                    </Row>
                    }
                    {Array.isArray(modifierValue) &&
                    <Row>
                        <Col sm='4'>
                            <Button onClick={() => this.setState({modifierValue: []})}>Clear</Button>
                        </Col>
                        <Col>
                            {modifierValue.map(skill => skills[skill] ? skills[skill].name : skill).sort().join(', ')}
                        </Col>
                    </Row>
                    }
                    <hr/>
                    <Row className='my-4 justify-content-end'>
                        <Button onClick={() => this.initState()} className='mx-1'>Clear</Button>
                        <Button onClick={this.handleSubmit} disabled={name === ''}>Add Talent</Button>
                    </Row>
                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TIER</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {customTalents &&
                        Object.keys(customTalents).map(key =>
                            <tr key={key}>
                                <td>{customTalents[key].name}</td>
                                <td>{customTalents[key].tier}</td>
                                <td><Button name={key} onClick={this.handleEdit}>Edit</Button></td>
                                <td><Button name={key} onClick={this.handleDelete}>Delete</Button></td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        customTalents: state.customTalents,
        talents: state.talents,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData, changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomTalents)
