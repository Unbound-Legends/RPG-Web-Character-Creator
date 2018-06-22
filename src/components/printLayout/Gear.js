import React from 'react';
import {Col, Row, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {Description} from "../index";
import {gearDice, skillDice} from "../../reducers";

class Gear extends React.Component {

    render() {
        const {weapons, armor, gear, skills, qualities, gearDice, money, equipmentArmor, equipmentGear, equipmentWeapons} = this.props;
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>GEAR</h5></Row>
                <hr/>
                <Row className='my-2'>
                    <Col xs='1'><b className='my-auto'>MONEY:</b></Col>
                    <Col>{money > 0 ? money : ''}</Col>
                </Row>
                {Object.keys(equipmentWeapons).length > 0 &&
                <Row>
                    <h5 style={{textAlign: 'left'}}>Weapons:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>CARRIED</th>
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
                        {Object.keys(equipmentWeapons).map(key =>
                            weapons[equipmentWeapons[key].id] &&
                            <tr key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentWeapons[key].carried}
                                           readOnly/>
                                </td>
                                <td>{weapons[equipmentWeapons[key].id].name}</td>
                                <td>{weapons[equipmentWeapons[key].id].damage}</td>
                                <td>{weapons[equipmentWeapons[key].id].critical}</td>
                                <td>{weapons[equipmentWeapons[key].id].range}</td>
                                <td>{weapons[equipmentWeapons[key].id].skill ? (skills[weapons[equipmentWeapons[key].id].skill] ? skills[weapons[equipmentWeapons[key].id].skill].name : '') : ''}</td>
                                <td>{weapons[equipmentWeapons[key].id].encumbrance}</td>
                                <td>{weapons[equipmentWeapons[key].id].qualitiesList && weapons[equipmentWeapons[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                                <td><Description text={gearDice.weapons[key]}/></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>
                }
                {Object.keys(equipmentArmor).length > 0 &&
                <Row>
                    <h5 style={{textAlign: 'left'}}>Armor:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>CARRIED</th>
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
                            armor[equipmentArmor[key].id] &&
                            <tr className='table-row' key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentArmor[key].carried}
                                           readOnly/>
                                </td>
                                <td>{armor[equipmentArmor[key].id].name}</td>
                                <td>{armor[equipmentArmor[key].id].soak}</td>
                                <td>{armor[equipmentArmor[key].id].defense}</td>
                                <td>{armor[equipmentArmor[key].id].rangedDefense}</td>
                                <td>{armor[equipmentArmor[key].id].meleeDefense}</td>
                                <td>{armor[equipmentArmor[key].id].encumbrance}</td>
                                <td>{armor[equipmentArmor[key].id].qualitiesList && armor[equipmentArmor[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>
                }
                {Object.keys(equipmentGear).length > 0 &&
                <Row>
                    <h5 style={{textAlign: 'left'}}>Gear:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>CARRRIED</th>
                            <th>NAME</th>
                            <th>AMOUNT</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentGear).map(key =>
                            gear[equipmentGear[key].id] &&
                            <tr key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentGear[key].carried}
                                           readOnly/>
                                </td>
                                <td>{gear[equipmentGear[key].id].name}</td>
                                <td>{gear[equipmentGear[key].id].amount}</td>
                                <td>{gear[equipmentGear[key].id].encumbrance}</td>
                                <td>{gear[equipmentGear[key].id].qualitiesList && gear[equipmentGear[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Row>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        gear: state.gear,
        equipmentArmor: state.equipmentArmor,
        equipmentGear: state.equipmentGear,
        equipmentWeapons: state.equipmentWeapons,
        gearDice: gearDice(state),
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
        money: state.money,
    };
}


export default connect(mapStateToProps)(Gear);