import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Description, GearStats} from "./index";
import {gearDice, skillDice} from "../reducers";
import EquipmentList from './EquipmentList';

class EquipmentLog extends React.Component {
    state = {money: this.props.money, weaponsModal: false, armorModal: false, gearModal: false, equipmentListModal: ''};

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

    addGear = (type, event) => {
        let key = Math.random().toString(36).substr(2, 16);
        this.setState({[`${type}Modal`]: key});
        event.preventDefault();
    };

    editGear = (type, key, event) => {
        this.setState({[`${type}Modal`]: key});
        event.preventDefault();
    };

    handleStatus = (type, key, status) => {
        const {changeData, weapons, armor, gear} = this.props;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        if (status === 'equipped' && !newObj[key].equipped) newObj[key].carried = true;
        if (status === 'carried' && newObj[key].equipped) {
            alert(`${newObj[key].name} is equipped and cannot be dropped!`);
            return;
        }
        newObj[key][status] = !newObj[key][status];
        changeData(newObj, type);
    };

    handleOpenEquipmentModal = (type, e) => {
        this.setState({equipmentListModal: type});
        e.preventDefault();
    };

    render() {
        const {weapons, armor, gear, skills, gearDice, qualities} = this.props;
        const {money} = this.state;
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
                        {Object.keys(weapons).length > 0 &&
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
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(weapons).map((key) =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               className='text-center'
                                               checked={weapons[key].carried}
                                               onChange={this.handleStatus.bind(this, 'weapons', key, 'carried')}/>
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}>
                                        {weapons[key].name}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}
                                        className='text-center'>
                                        {weapons[key].damage}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}
                                        className='text-center'>
                                        {weapons[key].critical}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}>
                                        {weapons[key].range}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}>
                                        {weapons[key].skill ? (skills[weapons[key].skill] ? skills[weapons[key].skill].name : '') : ''}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}
                                        className='text-center'>
                                        {weapons[key].encumbrance}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}>
                                        {weapons[key].qualitiesList && weapons[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'weapons', key)}>
                                        <Description text={gearDice.weapons[key]}/>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'weapons')}>Add Weapon</Button>
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(armor).length > 0 &&
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
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(armor).map((key) =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               checked={armor[key].equipped}
                                               onChange={this.handleStatus.bind(this, 'armor', key, 'equipped')}/>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                               checked={armor[key].carried}
                                               onChange={this.handleStatus.bind(this, 'armor', key, 'carried')}/>
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].name}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].soak}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].defense}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].rangedDefense}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].meleeDefense}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].encumbrance}</td>
                                    <td onClick={this.editGear.bind(this, 'armor', key)}>{armor[key].qualitiesList && armor[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'armor')}>Add Armor</Button>
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(gear).length > 0 &&
                        <Table className='text-center'>
                            <thead>
                            <tr>
                                <th>CARRY</th>
                                <th>NAME</th>
                                <th>AMOUNT</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(gear).map((key) =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               checked={gear[key].carried}
                                               onChange={this.handleStatus.bind(this, 'gear', key, 'carried')}/>
                                    </td>
                                    <td onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].name}</td>
                                    <td onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].amount}</td>
                                    <td onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].encumbrance}</td>
                                    <td onClick={this.editGear.bind(this, 'gear', key)}>{gear[key].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'gear')}>Add Gear</Button>
                    </TabPanel>
                </Tabs>
                <GearStats modal={this.state.weaponsModal} keyID={this.state.weaponsModal} type='weapons'
                           handleClose={() => this.setState({weaponsModal: false})}/>
                <GearStats modal={this.state.armorModal} keyID={this.state.armorModal} type='armor'
                           handleClose={() => this.setState({armorModal: false})}/>
                <GearStats modal={this.state.gearModal} keyID={this.state.gearModal} type='gear'
                           handleClose={() => this.setState({gearModal: false})}/>
                <EquipmentList type={this.state.equipmentListModal} 
                           handleClose={() => this.setState({equipmentListModal: ''})} />
                <Button onClick={(e) => this.handleOpenEquipmentModal('weapons', e)}>View All Equipment</Button>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        gear: state.gear,
        money: state.money,
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
        gearDice: gearDice(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);