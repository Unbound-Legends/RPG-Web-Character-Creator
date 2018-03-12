import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {ArchetypeSkills, Description} from './index';

class ArchetypeStats extends React.Component {

  render() {
    const {archetype, archetypes} = this.props;
    const masterArchetype = archetypes[archetype];
    if (!archetype) return <div/>;
    return (
        <Col>
        <h2>Archetype:&nbsp;<span className='title'>{masterArchetype.name}</span></h2>
            <Row><b>Starting Stats: </b></Row>
        <div className='archetype'>
            <div className='archetypePopup-characteristicsBackground'>
                {Object.keys(masterArchetype.characteristics).map((stat)=>
                    <div key={stat} className={`characteristic`}>
                        <div className='characteristic-archetype-topText'>{masterArchetype.characteristics[stat]}</div>
                        <div className='characteristic-archetype-bottomText'>{stat}</div>
                    </div>
                )}
            </div>
        </div>
        {masterArchetype &&
            <div className='archetype'>
                <div className='singleAttribute-archetype'>
                    <div className='singleAttribute-topText-archetype'>INITIAL WOUNDS</div>
                    <div className='singleAttribute-bottomText-archetype'>{masterArchetype.woundThreshold}</div>
                </div>
                <div className='singleAttribute-archetype'>
                  <div className='singleAttribute-topText-archetype'>INITIAL STRAIN</div>
                  <div className='singleAttribute-bottomText-archetype'>{masterArchetype.strainThreshold}</div>
                </div>
            </div>
        }
        <p><b>Starting XP:</b>&nbsp;{masterArchetype.experience}&emsp;</p>
        <div>
          <b>Starting Skills:</b>
            <ArchetypeSkills />
        </div>
        <div>
          <b>Starting Talents:</b>
            {Object.keys(masterArchetype.talents) : '').map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{masterArchetype.talents[talent].name}</b></p>
              <Description text={masterArchetype.talents[talent].description}/>
            </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{masterArchetype.setting}</p>

          <p><b>Description:</b></p>
          <div style={{textIndent: '1em'}}><Description text={masterArchetype.description} /></div>
        </Col>
    );
  }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes
    };
}

export default connect(mapStateToProps)(ArchetypeStats);
