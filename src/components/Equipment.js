import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Button, Col, Input, Row, Table} from 'reactstrap';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Description} from "./index";
import {gearDice, skillDice} from "../reducers";

class EquipmentLog extends React.Component {
    state = {money: this.props.money, weaponsModal: false, armorModal: false, gearModal: false};

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
        const {changeData, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        let newObj = {};
        if (type === 'equipmentWeapons') newObj = {...equipmentWeapons};
        if (type === 'equipmentArmor') newObj = {...equipmentArmor};
        if (type === 'equipmentGear') newObj = {...equipmentGear};
        if (status === 'equipped' && !newObj[key].equipped) newObj[key].carried = true;
        if (status === 'carried' && newObj[key].equipped) {
            alert(`${newObj[key].name} is equipped and cannot be dropped!`);
            return;
        }
        newObj[key][status] = !newObj[key][status];
        changeData(newObj, type);
    };

    render() {
        const {weapons, armor, gear, skills, gearDice, qualities, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
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
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentWeapons).map((key) =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               className='text-center'
                                               checked={equipmentWeapons[key].carried}
                                               onChange={this.handleStatus.bind(this, 'equipmentWeapons', key, 'carried')}/>
                                    </td>
                                    <td>
                                        {weapons[key].name}
                                    </td>
                                    <td className='text-center'>
                                        {weapons[key].damage}
                                    </td>
                                    <td className='text-center'>
                                        {weapons[key].critical}
                                    </td>
                                    <td> {weapons[key].range}
                                    </td>
                                    <td>
                                        {weapons[key].skill ? (skills[weapons[key].skill] ? skills[weapons[key].skill].name : '') : ''}
                                    </td>
                                    <td className='text-center'>
                                        {weapons[key].encumbrance}
                                    </td>
                                    <td>
                                        {weapons[key].qualitiesList && weapons[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}
                                    </td>
                                    <td>
                                        <Description text={gearDice.weapons[key]}/>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'equipmentWeapons')}>Add Weapon</Button>
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
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentArmor).map(key =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               checked={armor[key].equipped}
                                               onChange={this.handleStatus.bind(this, 'equipmentArmor', key, 'equipped')}/>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                               checked={armor[key].carried}
                                               onChange={this.handleStatus.bind(this, 'equipmentArmor', key, 'carried')}/>
                                    </td>
                                    <td>{armor[key].name}</td>
                                    <td>{armor[key].soak}</td>
                                    <td>{armor[key].defense}</td>
                                    <td>{armor[key].rangedDefense}</td>
                                    <td>{armor[key].meleeDefense}</td>
                                    <td>{armor[key].encumbrance}</td>
                                    <td>{armor[key].qualitiesList && armor[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'equipmentArmor')}>Add Armor</Button>
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
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(equipmentGear).map((key) =>
                                <tr key={key}>
                                    <td>
                                        <input type='checkbox'
                                               checked={equipmentGear[key].carried}
                                               onChange={this.handleStatus.bind(this, 'equipmentGear', key, 'carried')}/>
                                    </td>
                                    <td>{gear[key].name}</td>
                                    <td>{gear[key].amount}</td>
                                    <td>{gear[key].encumbrance}</td>
                                    <td>{gear[key].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        }
                        <Button onClick={this.addGear.bind(this, 'equipmentGear')}>Add Gear</Button>
                    </TabPanel>
                </Tabs>
                {/*<GearStats modal={this.state.weaponsModal} keyID={this.state.weaponsModal} type='equipmentWeapons'
                           handleClose={() => this.setState({weaponsModal: false})}/>
                <GearStats modal={this.state.armorModal} keyID={this.state.armorModal} type='equipmentArmor'
                           handleClose={() => this.setState({armorModal: false})}/>
                <GearStats modal={this.state.gearModal} keyID={this.state.gearModal} type='equipmentGear'
                           handleClose={() => this.setState({gearModal: false})}/>
                <EquipmentList type={this.state.equipmentListModal} 
                           handleClose={() => this.setState({equipmentListModal: ''})} />*/}
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

export default connect(mapStateToProps, matchDispatchToProps)(EquipmentLog);