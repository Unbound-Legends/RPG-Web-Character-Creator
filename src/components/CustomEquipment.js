import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeCustomData} from '../actions';

class CustomEquipment extends React.Component {
    state = {
        name: '',
        damage: '',
        range: '',
        skill: '',
        critical: '',
        encumbrance: '',
        price: '',
        soak: '',
        defense: '',
        setting: '',
        meleeDefense: '',
        rangedDefense: '',
        qualitiesList: '',
        qualityRank: '',
        description: '',
        amount: '',
        specialQualities: '',
        qualityList: {},
    };

    initState = () => {
        this.setState({
            name: '',
            damage: '',
            range: '',
            skill: '',
            critical: '',
            encumbrance: '',
            price: '',
            soak: '',
            defense: '',
            setting: '',
            meleeDefense: '',
            rangedDefense: '',
            qualityRank: '',
            description: '',
            specialQualities: '',
            qualityList: {},
        });
    };

    handleClose = () => {
        this.initState();
        this.props.handleClose();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleAddQuality = () => {
        let obj = {...this.state.qualityList};
        obj[this.state.specialQualities] = this.state.qualityRank ? +this.state.qualityRank : '';
        this.setState({qualityList: obj, specialQualities: '', qualityRank: ''});

    };

    handleSubmit = (event) => {
        const {type, changeCustomData} = this.props;
        const {name, range, damage, skill, critical, encumbrance, price, soak, defense, meleeDefense, rangedDefense, description, qualityList, setting} = this.state;
        let obj = {...this.props[type]};
        let key = name.replace(/\s/g, '').replace(/[{()}]/g, '');
        if (type === 'customWeapons') obj[key] = {
            name,
            damage,
            range,
            skill,
            critical,
            setting,
            encumbrance,
            price,
            description,
            qualities: qualityList
        };
        if (type === 'customArmor') obj[key] = {
            name,
            soak,
            defense,
            meleeDefense,
            rangedDefense,
            encumbrance,
            price,
            setting,
            description,
            qualities: qualityList
        };
        if (type === 'customGear') obj[key] = {name, encumbrance, price, description, setting, qualities: qualityList};
        changeCustomData(obj, type);
        this.initState();
        event.preventDefault();
    };

    handleDelete = (event) => {
        this.handleClose();
        event.preventDefault();
    };

    buildField = (field) => {
        const {type, skills, qualities} = this.props;
        switch (field) {
            case 'name':
            case 'damage':
                return (
                    <Input type='text' value={this.state[field]} name={field}
                           onChange={this.handleChange}/>
                );
            case 'critical':
            case 'encumbrance':
            case 'price':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
                return (
                    <Input type='number' value={this.state[field]} name={field}
                           onChange={this.handleChange}/>
                );
            case 'range':
                return (
                    <Input type='select' value={this.state[field]}
                           name='range'
                           onChange={this.handleChange}>
                        <option value=''/>
                        <option value='Engaged'>Engaged</option>
                        <option value='Short'>Short</option>
                        <option value='Medium'>Medium</option>
                        <option value='Long'>Long</option>
                        <option value='Extreme'>Extreme</option>
                    </Input>
                );
            case 'skill':
                return (
                    <Input type='select' value={this.state[field]}
                           name={field}
                           onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(skills).sort().map(skillKey =>
                            skills[skillKey].type === 'Combat' &&
                            <option value={skillKey} key={skillKey}>{skills[skillKey].name}</option>
                        )}
                    </Input>
                );
            case 'specialQualities':
                return (
                    <div>
                        <Row className='mt-2'>
                            <Col sm='4' className='my-auto'>Special Qualities:</Col>
                            <Col>
                                <Input type='select'
                                       value={this.state[field]}
                                       name={field}
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {Object.keys(qualities).map(quality =>
                                        qualities[quality].type.includes(type.toLowerCase().slice(6)) &&
                                        <option key={quality} value={quality}>{qualities[quality].name}</option>
                                    )}
                                </Input>
                            </Col>
                        </Row>
                        {this.state.specialQualities &&
                        <Row className='my-2'>
                            <Col sm='4' className='my-auto'/>
                            <Col>
                                {qualities[this.state.specialQualities] &&
                                qualities[this.state.specialQualities].ranked &&
                                <Input type='number' maxLength='2'
                                       value={this.state.qualityRank}
                                       name='qualityRank'
                                       onChange={this.handleChange}/>
                                }
                            </Col>
                            <Col className='text-right'>
                                {this.state.specialQualities &&
                                <Button onClick={this.handleAddQuality}>Add</Button>
                                }
                            </Col>
                        </Row>
                        }
                        <Row className='my-2'>
                            {Object.keys(this.state.qualityList).map(quality =>
                                `${qualities[quality].name} ${this.state.qualityList[quality]}`
                            ).sort().join(', ')
                            }
                        </Row>
                    </div>
                );
            case 'description':
                return (
                    <textarea onChange={this.handleChange}
                              name={field}
                              rows='8'
                              maxLength='1000'
                              className='w-100'
                              value={this.state[field]}/>
                );
            default:
                return <div/>
        }
    };

    render() {
        const {type, modal} = this.props;
        let fields = [];
        if (type === 'customWeapons') fields = ['name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'price', 'description'];
        if (type === 'customArmor') fields = ['name', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'price', 'description'];
        if (type === 'customGear') fields = ['name', 'encumbrance', 'price', 'description'];

        if (!type) return <div/>;
        return (
            <Modal isOpen={!!modal} toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>{`Custom ${type.toString().slice(6)}`}</ModalHeader>
                <ModalBody className='m-4'>
                    {fields.map(field =>
                        <Row className='mt-2' key={field}>
                            <Col sm='4' className='my-auto'>{field.charAt(0).toUpperCase() + field.slice(1)}:</Col>
                            <Col>
                                {this.buildField(field)}
                            </Col>
                        </Row>
                    )}
                    {this.buildField('specialQualities')}
                    <Button onClick={this.handleSubmit}>Add</Button>

                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        weapons: state.weapons,
        gear: state.gear,
        qualities: state.qualities,
        skills: state.skills,
        customWeapons: state.customWeapons,
        customGear: state.customGear,
        customArmor: state.customArmor,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CustomEquipment);