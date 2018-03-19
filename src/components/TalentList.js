import React from 'react';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'reactstrap';
import {talentCount} from '../reducers';
import {Description} from './index'

class TalentList extends React.Component {

    render() {
        const {archetype, archetypes, talents, talentCount} = this.props;
        return (
            <Col lg='12'>
                <Row className='justify-content-end'><h5>TALENT LIST</h5></Row>
                <hr/>
                <Table>
                    <thead>
                    <tr className='text-center'>
                        {['Talent', 'Rank', 'Activation', 'Type', 'Description'].map((heading) =>
                            <th key={heading}>{heading}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {(archetypes[archetype] && archetypes[archetype].talents) &&
                    Object.keys(archetypes[archetype].talents).sort().map((key) =>
                        <tr key={key}>
                            <td>{archetypes[archetype].talents[key].name}</td>
                            <td/>
                            <td className='text-center'>{archetypes[archetype].talents[key].activation ? 'Active' : 'Passive'}</td>
                            <td className='text-center'>{archetypes[archetype].talents[key].turn}</td>
                            <td><Description text={archetypes[archetype].talents[key].description}/></td>
                        </tr>
                    )}
                    {Object.keys(talentCount).sort().map((key) =>
                        <tr key={key}>
                            <td>{talents[key].name}</td>
                            <td className='text-center'>{talentCount[key]}</td>
                            <td className='text-center'>{talents[key].activation ? 'Active' : 'Passive'}</td>
                            <td className='text-center'>{talents[key].turn}</td>
                            <td><Description text={talents[key].description}/></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Col>
        )
    };
}

function mapStateToProps(state) {
    return {
        talents: state.talents,
        archetype: state.archetype,
        archetypes: state.archetypes,
        talentCount: talentCount(state),
    };
}

export default connect(mapStateToProps)(TalentList);
