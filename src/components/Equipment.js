import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Button, ButtonGroup, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {CustomEquipment, Description, Gear} from "./index";
import {gearDice, skillDice} from "../reducers";

class Equipment extends React.Component {

    state = {
        money: this.props.money,
        equipModal: false,
        deleteModal: false,
        customEquipmentModal: false,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({money: nextProps.money});
    }

    handleChangeMoney = (event) => {
        let number = +event.target.value.replace(/\D+/g, '');
        if (!(number > 9999999999)) this.setState({money: number});
        event.preventDefault();
    };

    handleBlurChangeMoney = (event) => {
        const {changeData} = this.props;
        changeData(event.target.value, 'money');
        event.preventDefault();
    };

    handleStatus = (type, key, status) => {
        const {changeData, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        let obj = {};
        if (type === 'equipmentWeapons') obj = {...equipmentWeapons};
        if (type === 'equipmentArmor') obj = {...equipmentArmor};
        if (type === 'equipmentGear') obj = {...equipmentGear};
        if (status === 'equipped' && !obj[key].equipped) obj[key].carried = true;
        if (status === 'carried' && obj[key].equipped) {
            alert(`${obj[key].name} is equipped and cannot be dropped!`);
            return;
        }
        obj[key][status] = !obj[key][status];
        changeData(obj, type);
    };

    confirmedDelete = () => {
        const {changeData, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        const {deleteModal} = this.state;
        const type = deleteModal.type;
        const key = deleteModal.key;
        let obj = {};
        if (type === 'equipmentWeapons') obj = {...equipmentWeapons};
        if (type === 'equipmentArmor') obj = {...equipmentArmor};
        if (type === 'equipmentGear') obj = {...equipmentGear};
        delete obj[key];
        changeData(obj, type, false);
        this.setState({deleteModal: false});
    };

    buttons = (type) => {
        return (
            <ButtonGroup>
                <Button onClick={() => this.setState({equipModal: type})}>Add {type.toString().slice(9)}</Button>
                <Button
                    onClick={() => this.setState({customEquipmentModal: `custom${type.toString().slice(9)}`})}>Custom {type.toString().slice(9)}</Button>
            </ButtonGroup>
        )
    };

    getLabel = (type, block, key) => {
        const {equipmentArmor, equipmentWeapons, equipmentGear, weapons, armor, gear, skills, qualities, gearDice} = this.props;
        let data, equipment;
        if (type === 'equipmentWeapons') {
            equipment = {...equipmentWeapons};
            data = {...weapons};
        }
        if (type === 'equipmentArmor') {
            equipment = {...equipmentArmor};
            data = {...armor};
        }
        if (type === 'equipmentGear') {
            equipment = {...equipmentGear};
            data = {...gear};
        }
        let item = data[equipment[key].id];
        if (!item && block !== 'deleteButton') return <td key={type + key + block}>MissingData</td>;
        switch (block) {
            case 'carried':
            case 'equipped':
                return (
                    <td key={type + key + block}>
                        <input type='checkbox'
                               className='text-center'
                               checked={equipment[key][block]}
                               onChange={this.handleStatus.bind(this, type, key, block)}/>
                    </td>
                );
            case 'name':
            case 'damage':
            case 'critical':
            case 'range':
            case 'encumbrance':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
            case 'amount':
                return (
                    <td key={type + key + block}>
                        {item[block]}
                    </td>
                );
            case 'skill':
                return (
                    <td key={type + key + block}>
                        {item.skill ? (skills[item.skill] ? skills[item.skill].name : '') : ''}
                    </td>
                );
            case 'qualities':
                return (
                    <td key={type + key + block}>
                        {item[block] && Object.keys(item[block]).map(quality => `${qualities[quality].name} ${item[block][quality]}`).sort().join(', ')}
                    </td>
                );
            case 'gearDice':
                return (
                    <td key={type + key + block}>
                        <Description text={gearDice.weapons[key]}/>
                    </td>
                );
            case 'deleteButton':
                return (
                    <td key={type + key + block}>
                        <Button onClick={() => this.setState({
                            deleteModal: {
                                type: type,
                                key: key
                            }
                        })}>X</Button></td>
                );
            default:
                return <td key={type + key}/>;
        }
    };

    render() {
        const {equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        const {money, deleteModal, equipModal, customEquipmentModal} = this.state;
        return (
            <Col lg='12' onClick={this.handleClick}>
                <Row className='justify-content-end'><h5>EQUIPMENT LOG</h5></Row>
                <hr/>
                <Row className='my-2'>
                    <b className='my-auto'>MONEY:&nbsp;</b>
                    <Input type='number' value={money > 0 ? money : ''}
                           onBlur={this.handleBlurChangeMoney}
                           onChange={this.handleChangeMoney}
                           className='w-25'/>
                </Row>
                <Tabs defaultIndex={0} className='d-print-none'>
                    <TabList>
                        <Tab>WEAPONS</Tab>
                        <Tab>ARMOR</Tab>
                        <Tab>GEAR</Tab>
                    </TabList>
                    <TabPanel>
                        {Object.keys(equipmentWeapons).length > 0 &&
                        <Table className='text-center'>
                            <thead>
                            <tr>
                                <th>CARRY</th>
                                <th>NAME</th>
                                <th>DAM</th>
                                <th>CRIT</th>
                                <th>RANGE</th>
                                <th>SKILL</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                                <th>DICE</th>
                                <th>REMOVE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentWeapons).map(key =>
                                <tr key={key}>
                                    {['carried', 'name', 'damage', 'critical', 'range', 'skill', 'encumbrance', 'qualities', 'gearDice', 'deleteButton'].map(block =>
                                        this.getLabel('equipmentWeapons', block, key)
                                    )}
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        {this.buttons('equipmentWeapons')}
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(equipmentArmor).length > 0 &&
                        <Table className='text-center'>
                            <thead>
                            <tr>
                                <th>EQUIP</th>
                                <th>CARRY</th>
                                <th>NAME</th>
                                <th>SOAK</th>
                                <th>DEF</th>
                                <th>RANGED DEF</th>
                                <th>MELEE DEF</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                                <th>REMOVE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentArmor).map(key =>
                                <tr key={key}>
                                    {['equipped', 'carried', 'name', 'soak', 'defense', 'rangedDefense', 'meleeDefense', 'encumbrance', 'qualities', 'deleteButton'].map(block =>
                                        this.getLabel('equipmentArmor', block, key)
                                    )}
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        {this.buttons('equipmentArmor')}
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(equipmentGear).length > 0 &&
                        <Table className='text-center'>
                            <thead>
                            <tr>
                                <th>CARRY</th>
                                <th>NAME</th>
                                <th>AMOUNT</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                                <th>REMOVE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentGear).map(key =>
                                    <tr key={key}>
                                        {['carried', 'name', 'amount', 'encumbrance', 'qualities', 'deleteButton'].map(block =>
                                            this.getLabel('equipmentGear', block, key)
                                        )}
                                    </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        {this.buttons('equipmentGear')}
                    </TabPanel>
                </Tabs>
                <Gear modal={!!equipModal} type={equipModal}
                      handleClose={() => this.setState({equipModal: false})}/>
                <CustomEquipment modal={!!customEquipmentModal} type={customEquipmentModal}
                                 handleClose={() => this.setState({customEquipmentModal: false})}/>
                <Modal isOpen={!!deleteModal} toggle={() => this.setState({deleteModal: false})}>
                    <ModalHeader toggle={() => this.setState({deleteModal: false})}>BALETED WARNING</ModalHeader>
                    <ModalBody>
                        <div>Are you super serious? This cannot be undone</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.setState({deleteModal: false})}>NO!</Button>
                        <Button color='danger' onClick={this.confirmedDelete}>YES! I no longer want this item!</Button>
                    </ModalFooter>
                </Modal>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        equipmentArmor: state.equipmentArmor,
        equipmentGear: state.equipmentGear,
        equipmentWeapons: state.equipmentWeapons,
        gear: state.gear,
        gearDice: gearDice(state),
        money: state.money,
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Equipment);