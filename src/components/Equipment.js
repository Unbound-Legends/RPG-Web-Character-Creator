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

    render() {
        const {weapons, armor, gear, skills, gearDice, qualities, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
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
                                weapons[equipmentWeapons[key].id] ?
                                    <tr key={key}>
                                        <td>
                                            <input type='checkbox'
                                                   className='text-center'
                                                   checked={equipmentWeapons[key].carried}
                                                   onChange={this.handleStatus.bind(this, 'equipmentWeapons', key, 'carried')}/>
                                        </td>
                                        <td>
                                            {weapons[equipmentWeapons[key].id].name}
                                        </td>
                                        <td className='text-center'>
                                            {weapons[equipmentWeapons[key].id].damage}
                                        </td>
                                        <td className='text-center'>
                                            {weapons[equipmentWeapons[key].id].critical}
                                        </td>
                                        <td> {weapons[equipmentWeapons[key].id].range}
                                        </td>
                                        <td>
                                            {weapons[equipmentWeapons[key].id].skill ? (skills[weapons[equipmentWeapons[key].id].skill] ? skills[weapons[equipmentWeapons[key].id].skill].name : '') : ''}
                                        </td>
                                        <td className='text-center'>
                                            {weapons[equipmentWeapons[key].id].encumbrance}
                                        </td>
                                        <td>
                                            {weapons[equipmentWeapons[key].id].qualitiesList && weapons[equipmentWeapons[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}
                                        </td>
                                        <td>
                                            <Description text={gearDice.weapons[key]}/>
                                        </td>
                                        <td><Button onClick={() => this.setState({
                                            deleteModal: {
                                                type: 'equipmentWeapons',
                                                key: key
                                            }
                                        })}>X</Button></td>
                                    </tr> :
                                    <tr key={key}>
                                        <td/>
                                        <td>Missing Custom Data</td>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td><Button onClick={() => this.setState({
                                            deleteModal: {
                                                type: 'equipmentWeapons',
                                                key: key
                                            }
                                        })}>X</Button></td>
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
                                armor[equipmentArmor[key].id] ?
                                    <tr key={key}>
                                        <td>
                                            <input type='checkbox'
                                                   checked={equipmentArmor[key].equipped}
                                                   onChange={this.handleStatus.bind(this, 'equipmentArmor', key, 'equipped')}/>
                                        </td>
                                        <td>
                                            <input type='checkbox'
                                                   checked={equipmentArmor[key].carried}
                                                   onChange={this.handleStatus.bind(this, 'equipmentArmor', key, 'carried')}/>
                                        </td>
                                        <td>{armor[equipmentArmor[key].id].name}</td>
                                        <td>{armor[equipmentArmor[key].id].soak}</td>
                                        <td>{armor[equipmentArmor[key].id].defense}</td>
                                        <td>{armor[equipmentArmor[key].id].rangedDefense}</td>
                                        <td>{armor[equipmentArmor[key].id].meleeDefense}</td>
                                        <td>{armor[equipmentArmor[key].id].encumbrance}</td>
                                        <td>{armor[equipmentArmor[key].id].qualitiesList && armor[equipmentArmor[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                        <td><Button onClick={() => this.setState({
                                            deleteModal: {
                                                type: 'equipmentArmor',
                                                key: key
                                            }
                                        })}>X</Button></td>
                                    </tr> :
                                    <tr key={key}>
                                        <td/>
                                        <td>Missing Custom Data</td>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td><Button onClick={() => this.setState({
                                            deleteModal: {
                                                type: 'equipmentWeapons',
                                                key: key
                                            }
                                        })}>X</Button></td>
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
                                gear[equipmentGear[key].id] ?
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               checked={equipmentGear[key].carried}
                                               onChange={this.handleStatus.bind(this, 'equipmentGear', key, 'carried')}/>
                                    </td>
                                    <td>{gear[equipmentGear[key].id].name}</td>
                                    <td>{gear[equipmentGear[key].id].amount}</td>
                                    <td>{gear[equipmentGear[key].id].encumbrance}</td>
                                    <td>{gear[equipmentGear[key].id].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                    <td><Button onClick={() => this.setState({
                                        deleteModal: {
                                            type: 'equipmentGear',
                                            key: key
                                        }
                                    })}>X</Button></td>

                                </tr> :
                                    <tr key={key}>
                                        <td/>
                                        <td>Missing Custom Data</td>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td><Button onClick={() => this.setState({
                                            deleteModal: {
                                                type: 'equipmentWeapons',
                                                key: key
                                            }
                                        })}>X</Button></td>
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