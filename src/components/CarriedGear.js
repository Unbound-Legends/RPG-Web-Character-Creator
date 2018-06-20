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
                            <tr key={key}>
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
                        {Object.keys(equipmentArmor).map((key) =>
                            equipmentArmor[key].carried &&
                            <tr className='table-row' key={key}>
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
                            <tr key={key}>
                                <td>{gear[key].name}</td>
                                <td>{gear[key].amount}</td>
                                <td>{gear[key].encumbrance}</td>
                                <td>{gear[key].qualitiesList && gear[key].qualitiesList.map((quality) => `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`).sort().join(', ')}</td>
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