import React from 'react';
import {Row, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {Description} from "../index";
import {gearDice} from "../../reducers";

class EquippedWeapons extends React.Component {

    render() {
        const {weapons, skills, qualities, gearDice} = this.props;
        return (
            <div className='w-100'>
                <Row className='justify-content-end'><h5>EQUIPPED WEAPONS</h5></Row>
                <hr/>
                {Object.keys(weapons).length > 0 &&
                <Row>
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
                        {Object.keys(weapons).map(key =>
                            weapons[key].carried &&
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
                </Row>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gearDice: gearDice(state),
        qualities: state.qualities,
        skills: state.skills,
        weapons: state.weapons,
    };
}


export default connect(mapStateToProps)(EquippedWeapons);