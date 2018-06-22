import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Table} from 'reactstrap';
import {changeData} from '../actions';
import {Description} from "./index";
import {gearDice, skillDice} from "../reducers";

class CarriedGear extends React.Component {

    render() {
        const {weapons, armor, gear, skills, qualities, gearDice, equipmentWeapons, equipmentArmor, equipmentGear} = this.props;
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>CARRIED GEAR</h5></Row>
                <hr/>
                {Object.keys(equipmentWeapons).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Weapons:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
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
                            equipmentWeapons[key].carried &&
                            weapons[equipmentWeapons[key].id] &&
                            <tr key={key}>
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
                </div>
                }
                {Object.keys(equipmentArmor).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Armor:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
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
                            equipmentArmor[key].carried &&
                            armor[equipmentArmor[key].id] &&
                            <tr className='table-row' key={key}>
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
                </div>
                }
                {Object.keys(equipmentGear).length > 0 &&
                <div>
                    <h5 style={{textAlign: 'left'}}>Gear:</h5>
                    <Table className='text-center'>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>AMOUNT</th>
                            <th>ENCUM</th>
                            <th>QUAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(equipmentGear).map((key) =>
                            equipmentGear[key].carried &&
                            gear[equipmentGear[key].id] &&
                            <tr key={key}>
                                <td>{gear[equipmentGear[key].id].name}</td>
                                <td>{gear[equipmentGear[key].id].amount}</td>
                                <td>{gear[equipmentGear[key].id].encumbrance}</td>
                                <td>{gear[equipmentGear[key].id].qualitiesList && gear[equipmentGear[key].id].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        gear: state.gear,
        gearDice: gearDice(state),
        qualities: state.qualities,
        skillDice: skillDice(state),
        skills: state.skills,
        weapons: state.weapons,
        equipmentArmor: state.equipmentArmor,
        equipmentGear: state.equipmentGear,
        equipmentWeapons: state.equipmentWeapons,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CarriedGear);