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
                        {Object.keys(equipmentWeapons).map((key) =>
                            <tr key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentWeapons[key].carried}
                                           readOnly/>
                                </td>
                                <td>{weapons[key].name}</td>
                                <td>{weapons[key].damage}</td>
                                <td>{weapons[key].critical}</td>
                                <td>{weapons[key].range}</td>
                                <td>{weapons[key].skill ? (skills[weapons[key].skill] ? skills[weapons[key].skill].name : '') : ''}</td>
                                <td>{weapons[key].encumbrance}</td>
                                <td>{weapons[key].qualitiesList && weapons[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
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
                        {Object.keys(equipmentArmor).map((key) =>
                            <tr className='table-row' key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentArmor[key].carried}
                                           readOnly/>
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
                        {Object.keys(equipmentGear).map((key) =>
                            <tr key={key}>
                                <td><input type='checkbox'
                                           className='text-center'
                                           checked={equipmentGear[key].carried}
                                           readOnly/>
                                </td>
                                <td>{gear[key].name}</td>
                                <td>{gear[key].amount}</td>
                                <td>{gear[key].encumbrance}</td>
                                <td>{gear[key].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
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