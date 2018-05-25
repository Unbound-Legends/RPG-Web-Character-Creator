import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class GearStats extends React.Component {
    state = {
        [this.props.type]:
            this.props[this.props.type][this.props.keyID] ?
                this.props[this.props.type][this.props.keyID]
                : {equipped: false, carried: true}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.modal !== false) {
            this.setState({
                [nextProps.type]:
                    nextProps[nextProps.type][nextProps.keyID] ?
                        nextProps[nextProps.type][nextProps.keyID]
                        : {equipped: false, carried: true}
            });
        }
    }

    handleChange = (event) => {
        const {type} = this.props;
        const {armor, gear, weapons} = this.state;
        let value = event.target.value;
        if (event.target.type === 'number') {
            value = +value.replace(/(?!^-+)[^0-9]/g, '');
            if (value > 99 && event.target.name !== 'price') return;
            if (value < -20) return;
        }
        let obj = {};
        if (type === 'weapons') obj = {...weapons};
        if (type === 'armor') obj = {...armor};
        if (type === 'gear') obj = {...gear};
        obj[event.target.name] = value;
        this.setState({[type]: obj});
        event.preventDefault();
    };

    handleAddQuality = () => {
        const {type} = this.props;
        const {armor, gear, weapons} = this.state;
        let obj = {};
        if (type === 'weapons') obj = {...weapons};
        if (type === 'armor') obj = {...armor};
        if (type === 'gear') obj = {...gear};
        if (!obj.qualitiesList) obj.qualitiesList = [];
        if (!obj.qualityRank) obj.qualityRank = '';
        obj.qualitiesList.push({[obj.qualities]: obj.qualityRank});
        delete obj.qualities;
        delete obj.qualityRank;
        this.setState({[type]: obj});
    };


    handleSubmit = (event) => {
        const {type, changeData, armor, gear, weapons, keyID, handleClose} = this.props;
        let obj = {};
        if (type === 'weapons') obj = {...weapons};
        if (type === 'armor') obj = {...armor};
        if (type === 'gear') obj = {...gear};
        obj[keyID] = this.state[type];
        changeData(obj, `${type}`);
        handleClose();
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, armor, gear, weapons, type, keyID, handleClose} = this.props;
        let obj = {};
        if (type === 'weapons') obj = {...weapons};
        if (type === 'armor') obj = {...armor};
        if (type === 'gear') obj = {...gear};
        changeData('', type);
        delete obj[keyID];
        changeData(obj, type);
        handleClose();
        event.preventDefault();
    };

    render() {
        const {type, qualities, skills, modal, handleClose} = this.props;
        const {armor, gear, weapons} = this.state;
        if (type === 'weapons') {
            return (
                <Modal isOpen={modal !== false} toggle={handleClose}>
                    <ModalHeader toggle={handleClose}>Weapons</ModalHeader>
                    <ModalBody className='m-4'>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Name:</Col>
                            <Col>
                                <Input type='text' value={weapons.name ? weapons.name : ''} name='name'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Damage:</Col>
                            <Col>
                                <Input value={weapons.damage ? weapons.damage : ''}
                                       name='damage'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Critical Rating:</Col>
                            <Col>
                                <Input type='number' value={weapons.critical ? weapons.critical : ''}
                                       name='critical'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Range:</Col>
                            <Col>
                                <Input type='select' value={weapons.range ? weapons.range : ''}
                                       name='range'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    <option value='Engaged'>Engaged</option>
                                    <option value='Short'>Short</option>
                                    <option value='Medium'>Medium</option>
                                    <option value='Long'>Long</option>
                                    <option value='Extreme'>Extreme</option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Skill:</Col>
                            <Col>
                                <Input type='select' value={weapons.skill ? weapons.skill : ''}
                                       name='skill'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {Object.keys(skills).sort().map((skillKey) =>
                                        skills[skillKey].type === 'Combat' &&
                                        <option value={skillKey} key={skillKey}>{skills[skillKey].name}</option>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Encumbrance:</Col>
                            <Col>
                                <Input type='number'
                                       value={weapons.encumbrance ? weapons.encumbrance : ''}
                                       name='encumbrance'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Price:</Col>
                            <Col>
                                <Input type='number' value={weapons.price ? weapons.price : ''}
                                       name='price'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Special Qualities:</Col>
                            <Col>
                                <Input type='select'
                                       value={weapons.qualities ? weapons.qualities : ''}
                                       name='qualities'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {Object.keys(qualities).map((quality) =>
                                        qualities[quality].type.includes(type) &&
                                        <option key={quality} value={quality}>{qualities[quality].name}</option>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                        {weapons.qualities &&
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'/>
                            <Col>
                                {qualities[weapons.qualities] &&
                                qualities[weapons.qualities].ranked &&
                                <Input type='number' maxLength='2'
                                       value={weapons.qualityRank ? weapons.qualityRank : ''}
                                       name='qualityRank'
                                       onChange={this.handleChange}/>
                                }
                            </Col>
                            <Col className='text-right'>
                                {weapons.qualities &&
                                <Button onClick={this.handleAddQuality}>Add</Button>
                                }
                            </Col>
                        </Row>
                        }
                        <Row className='my-2'>
                            {weapons.qualitiesList && weapons.qualitiesList.map((quality) =>
                                `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                            ).sort().join(', ')
                            }
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4'>Description:</Col>
                            <Col>
                                <textarea onChange={this.handleChange}
                                          name='description'
                                          rows='8'
                                          maxLength='1000'
                                          className='w-100'
                                          value={weapons.description ? weapons.description : ''}/>
                            </Col>
                        </Row>

                    </ModalBody>
                    < ModalFooter>
                        <Button onClick={this.handleSubmit}>Enter </Button>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            );
        }
        if (type === 'armor') {
            return (
                <Modal isOpen={modal !== false} toggle={handleClose}>
                    <ModalHeader toggle={handleClose}>Armor</ModalHeader>
                    <ModalBody className='m-4'>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Name:</Col>
                            <Col>
                                <Input type='text' maxLength='20' value={armor.name ? armor.name : ''} name='name'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Soak:</Col>
                            <Col>
                                <Input type='number' value={armor.soak ? armor.soak : ''} name='soak'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Defense:</Col>
                            <Col>
                                <Input type='number' value={armor.defense ? armor.defense : ''} name='defense'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Ranged Defense:</Col>
                            <Col>
                                <Input type='number' value={armor.rangedDefense ? armor.rangedDefense : ''}
                                       name='rangedDefense'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Melee Defense:</Col>
                            <Col>
                                <Input type='number' value={armor.meleeDefense ? armor.meleeDefense : ''}
                                       name='meleeDefense'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Encumbrance:</Col>
                            <Col>
                                <Input type='number' value={armor.encumbrance ? armor.encumbrance : ''}
                                       name='encumbrance'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Price:</Col>
                            <Col>
                                <Input type='number' value={armor.price ? armor.price : ''}
                                       name='price'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Special Qualities:</Col>
                            <Col>
                                <Input type='select' value={armor.qualities ? armor.qualities : ''}
                                       name='qualities'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {Object.keys(qualities).map((quality) =>
                                        qualities[quality].type.includes(type) &&
                                        <option key={quality}
                                                value={quality}>{qualities[quality].name}</option>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                        {armor.qualities &&
                        <Row className='my-2'>
                            <Col sm='4'/>
                            <Col>
                                {qualities[armor.qualities] &&
                                qualities[armor.qualities].ranked &&
                                <Input type='number' maxLength='2'
                                       value={armor.qualityRank ? armor.qualityRank : ''}
                                       name='qualityRank'
                                       onChange={this.handleChange}/>
                                }
                            </Col>
                            <Col>
                                <Button onClick={this.handleAddQuality}>Add</Button>
                            </Col>
                        </Row>
                        }
                        <Row className='my-2'>
                            {armor.qualitiesList && armor.qualitiesList.map((quality) =>
                                `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                            ).sort().join(', ')}
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4'>Description:</Col>
                            <Col>
                                <textarea onChange={this.handleChange}
                                          name='description'
                                          rows='8'
                                          maxLength='1000'
                                          className='w-100'
                                          value={armor.description ? armor.description : ''}/>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit}>
                            Enter </Button>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            );
        }
        if (type === 'gear') {
            return (
                <Modal isOpen={modal !== false} toggle={handleClose}>
                    <ModalHeader toggle={handleClose}>Gear</ModalHeader>
                    <ModalBody className='m-4'>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Name:</Col>
                            <Col>
                                <Input type='text' value={gear.name ? gear.name : ''} name='name'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Amount:</Col>
                            <Col>
                                <Input type='number' value={gear.amount ? gear.amount : ''}
                                       name='amount'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Encumbrance:</Col>
                            <Col>
                                <Input type='number' value={gear.encumbrance ? gear.encumbrance : ''}
                                       name='encumbrance'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Price:</Col>
                            <Col>
                                <Input type='number' value={gear.price ? gear.price : ''}
                                       name='price'
                                       onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'>Special Qualities:</Col>
                            <Col>
                                <Input type='select' value={gear.qualities ? gear.qualities : ''}
                                       name='qualities'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {Object.keys(qualities).map((quality) =>
                                        qualities[quality].type.includes(type) &&
                                        <option key={quality} value={quality}>{qualities[quality].name}</option>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                        {gear.qualities &&
                        <Row className='my-2'>
                            <Col sm='4'/>
                            <Col>
                                {qualities[gear.qualities] &&
                                qualities[gear.qualities].ranked &&
                                <Input type='number' maxLength='2'
                                       value={gear.qualityRank ? gear.qualityRank : ''} name='qualityRank'
                                       onChange={this.handleChange}/>
                                }
                            </Col>
                            {gear.qualities &&
                            <Col>
                                <Button onClick={this.handleAddQuality}>Add</Button>
                            </Col>
                            }
                        </Row>
                        }
                        <Row className='my-2'>
                            {gear.qualitiesList && gear.qualitiesList.map((quality) =>
                                `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                            ).sort().join(', ')}
                        </Row>
                        <Row className='my-2'>
                            <Col sm='4'>Description:</Col>
                            <Col>
                                <textarea onChange={this.handleChange}
                                          name='description'
                                          rows='8'
                                          maxLength='1000'
                                          className='w-100'
                                          value={gear.description ? gear.description : ''}/>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit}>Enter</Button>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        weapons: state.weapons,
        gear: state.gear,
        qualities: state.qualities,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GearStats);