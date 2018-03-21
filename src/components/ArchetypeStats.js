import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {ArchetypeSkills, Description} from './index';

class ArchetypeStats extends React.Component {

    render() {
        const {archetype, archetypes, archetypeTalents} = this.props;
        const masterArchetype = archetypes[archetype];
        if (!archetype || !archetypes[archetype]) return <div/>;
        return (
            <div>
                <Row><b>Starting Stats: </b></Row>
                <Row className='justify-content-center my-2'>
                    {Object.keys(masterArchetype.characteristics).map((stat) =>
                        <div className='imageBox' key={stat}>
                            <img src={'/images/png/Characteristic.png'} alt='' className='png'/>
                            <Row className='characteristicValue'>{masterArchetype.characteristics[stat]}</Row>
                            <Row className='characteristicTitle'>{stat}</Row>
                        </div>
                    )}
                </Row>
                {masterArchetype &&
                <Row className='justify-content-center my-2'>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>WOUNDS</Row>
                        <Row className='attributeValue'>{masterArchetype.woundThreshold}</Row>
                    </div>
                    <div className='imageBox attribute'>
                        <img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
                        <Row className='attributeTitle'>STRAIN</Row>
                        <Row className='attributeValue'>{masterArchetype.strainThreshold}</Row>
                    </div>
                </Row>
                }
                <Row><b>Starting XP:</b>&emsp;{masterArchetype.experience}</Row>
                <Row>
                    <b>Starting Skills:</b>
                </Row>
                <Row>
                    <ArchetypeSkills/>
                </Row>
                <Row>
                    <b>Starting Talents:</b>
                </Row>
                {masterArchetype.talents &&
                masterArchetype.talents.map((talent) =>
                    <Row key={talent} className='ml-3'>
                        <b>{archetypeTalents[talent].name}:</b>&emsp;
                        <Description text={archetypeTalents[talent].description}/>
                    </Row>
                    )}
                <Row><b>Setting:</b>&emsp;{masterArchetype.setting}</Row>

                <Row>
                    <b>Description:</b>&emsp;
                    <Description text={masterArchetype.description}/>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        archetypeTalents: state.archetypeTalents,
    };
}

export default connect(mapStateToProps)(ArchetypeStats);
