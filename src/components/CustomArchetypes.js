import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../actions';

const chars = ['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'];


class CustomArchetypes extends React.Component {
    state = {
        name: '',
        Brawn: 2,
        Agility: 2,
        Intellect: 2,
        Cunning: 2,
        Willpower: 2,
        Presence: 2,
        woundThreshold: 10,
        strainThreshold: 10,
        XP: 100,
        selectedSkill: '',
        description: '',
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleClick = (event) => {
        let value = this.state[event.target.name] + +event.target.value;
        if (chars.includes(event.target.name) && (value > 5)) {
            alert(`Cannot set ${event.target.name} to ${value}`);
            return;
        }
        if (0 >= value) {
            alert(`Cannot set ${event.target.name} to ${value}`);
            return;
        }
        this.setState({[event.target.name]: value})
    };

    handleSubmit = () => {
        const {name, Brawn, Agility, Intellect, Cunning, Willpower, Presence, woundThreshold, strainThreshold, XP, selectedSkill, description} = this.state;
        const {customArchetypes, changeCustomData} = this.props;
        let Obj = {...customArchetypes};
        Obj[name.replace(/\s/g, '')] = {
            name,
            characteristics: {
                Brawn,
                Agility,
                Intellect,
                Cunning,
                Willpower,
                Presence
            },
            woundThreshold,
            strainThreshold,
            experience: XP,
            skills: {[selectedSkill]: 1},
            talents: {},
            description,
        };
        changeCustomData(Obj, 'customArchetypes');
        this.setState({
            name: '',
            Brawn: 2,
            Agility: 2,
            Intellect: 2,
            Cunning: 2,
            Willpower: 2,
            Presence: 2,
            woundThreshold: 10,
            strainThreshold: 10,
            XP: 100,
            selectedSkill: '',
            description: ''
        });
    };

    handleDelete = (event) => {
        const {customArchetypes, changeCustomData, archetype, changeData} = this.props;
        if (archetype === event.target.name) changeData('', 'archetype');
        let Obj = {...customArchetypes};
        delete Obj[event.target.name];
        changeCustomData(Obj, 'customArchetypes', false);
        event.preventDefault();
    };

    render() {
        const {customArchetypes, modal, handleClose, skills} = this.props;
        const {name, woundThreshold, strainThreshold, selectedSkill, XP, description} = this.state;
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Custom Archetypes</ModalHeader>
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
                            <b>Starting XP:</b>
                        </Col>
                        <Col>
                            <Input className='w-50 my-auto' type='number' value={XP} name='XP' maxLength='3'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <b className='text-left'>Starting Characteristics:</b>
                    </Row>
                    <Row className='justify-content-center'>
                        {chars.map((stat) =>
                            <div key={stat} className='m-2 text-center'>
                                <div className='imageBox m-auto'>
                                    <img src={'/images/png/Characteristic.png'} alt='' className='png'/>
                                    <Row className='characteristicValue'>{this.state[stat]}</Row>
                                    <Row className='characteristicTitle'>{stat}</Row>
                                </div>
                                <ButtonGroup>
                                    <Button name={stat} value='+1' onClick={this.handleClick}>↑</Button>
                                    <Button name={stat} value='-1' onClick={this.handleClick}>↓</Button>
                                </ButtonGroup>
                            </div>
                        )}
                    </Row>
                    <Row className='mt-2'>
                        <b className='text-left'>Starting Attributes:</b>
                    </Row>
                    <Row className='justify-content-center'>
                        <div className='justify-content-center text-center'>
                            <div className='imageBox attribute'>
                                <img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
                                <Row className='attributeTitle'>WOUNDS</Row>
                                <Row className='attributeValue'>{woundThreshold}</Row>
                            </div>
                            <ButtonGroup>
                                <Button name='woundThreshold' value='+1' onClick={this.handleClick}>↑</Button>
                                <Button name='woundThreshold' value='-1' onClick={this.handleClick}>↓</Button>
                            </ButtonGroup>
                        </div>
                        <div className='justify-content-center text-center'>
                            <div className='imageBox attribute'>
                                <img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
                                <Row className='attributeTitle'>STRAIN</Row>
                                <Row className='attributeValue'>{strainThreshold}</Row>
                            </div>
                            <ButtonGroup>
                                <Button name='strainThreshold' value='+1' onClick={this.handleClick}>↑</Button>
                                <Button name='strainThreshold' value='-1' onClick={this.handleClick}>↓</Button>
                            </ButtonGroup>
                        </div>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='5' className='my-auto'>
                            <b>One free rank in:</b>
                        </Col>
                        <Col>
                            <Input type='select' name='selectedSkill' value={selectedSkill}
                                   onChange={this.handleChange}>
                                <option value=''/>
                                {Object.keys(skills).map((key) =>
                                    <option value={key} key={key}>{skills[key].name}</option>
                                )}

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
                    <Row className='my-4 justify-content-end'>
                        <Button onClick={this.handleSubmit} disabled={name === '' || selectedSkill === '' || XP === ''}>Add
                            Archetype</Button>
                    </Row>
                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>XP</th>
                            <th>WOUNDS</th>
                            <th>STRAIN</th>
                            <th>SKILL</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {customArchetypes &&
                        Object.keys(customArchetypes).map(slot =>
                            <tr key={slot}>
                                <td>{customArchetypes[slot].name}</td>
                                <td>{customArchetypes[slot].experience}</td>
                                <td>{customArchetypes[slot].woundThreshold}</td>
                                <td>{customArchetypes[slot].strainThreshold}</td>
                                <td>{Object.keys(customArchetypes[slot].skills)[0]}</td>
                                <td><Button name={slot} onClick={this.handleDelete}>Delete</Button></td>
                            </tr>
                        )
                        }
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
        customArchetypes: state.customArchetypes,
        archetypes: state.archetypes,
        archetype: state.archetype,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData, changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomArchetypes)
