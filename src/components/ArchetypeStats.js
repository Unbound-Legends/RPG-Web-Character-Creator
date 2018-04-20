import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {ArchetypeSkills, Description} from './index';

class ArchetypeStats extends React.Component {

    render() {
        const {archetype, archetypes, archetypeTalents} = this.props;
        const masterArchetype = archetypes[archetype];
        if (!archetype || !archetypes[archetype]) return <div/>;
        return (
            <div>
                <Row className='my-2'><Col sm='5'><b>Starting Stats: </b></Col></Row>
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
                <Row className='my-2'>
                    <Col sm='5'><b>Starting XP:</b></Col>
                    <Col>{masterArchetype.experience}</Col>
                </Row>
                <Row className='my-2'>
                    <Col sm='5'><b>Starting Skills:</b></Col>
                    <ArchetypeSkills/>
                </Row>
                <Row className='my-2'>
                    <Col sm='5'><b>Starting Talents:</b></Col>
                </Row>
                {masterArchetype.talents &&
                masterArchetype.talents.map((talent) =>
                    <Row key={talent} className='ml-4'>
                        <Col sm='5'><b>{archetypeTalents[talent].name}:</b></Col>
                        <Col><Description text={archetypeTalents[talent].description}/></Col>
                    </Row>
                )}
                <Row className='my-2'>
                    <Col sm='5'><b>Setting:</b></Col>
                    <Col>{masterArchetype.setting}</Col></Row>
                {masterArchetype.book &&
                <Row className='my-2'>
                    <Col sm='5'><b>Book:</b></Col>
                    <Col><Description text={`${masterArchetype.book}: Page ${masterArchetype.page}`}/></Col>
                </Row>
                }
                <Row className='my-2'>
                    <Col sm='5'><b>Description:</b></Col>
                    <Col> <Description text={masterArchetype.description}/></Col>
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
