import React from 'react';
import {connect} from 'react-redux';
import Description from './Description';
import StatBlock from './StatBlock';
import ArchetypeSkills from './ArchetypeSkills';

class ArchetypeStats extends React.Component {

  render() {
    const {archetype, archetypes} = this.props;
    const masterArchetype = archetypes[archetype];
    if (archetype===null) return <div></div>;
    return (
      <div>
        <h2>Archetype:&nbsp;<span className='title'>{masterArchetype.name}</span></h2>
        <p><b>Starting Stats: </b></p>
        <div className='block'>
          {Object.keys(masterArchetype.characteristics).map((stat)=>
            <StatBlock  key={stat}
                        textTop={stat}
                        textBottom={masterArchetype.characteristics[stat]}
                        block='characteristic' />
            )}
        </div>
        {masterArchetype &&
          <div className='block'>
            <StatBlock  textTop='Wounds'
                        textBottom={`0 | ${masterArchetype.woundThreshold}`}
                        block='attrib' />
            <StatBlock  textTop='Strain'
                        textBottom={`0 | ${masterArchetype.strainThreshold}`}
                        block='attrib' />
          </div>
        }
        <p><b>Starting XP:</b>&nbsp;{masterArchetype.experience}&emsp;</p>
        <div>
          <b>Starting Skills:</b>
            <ArchetypeSkills />
        </div>
        <div>
          <b>Starting Talents:</b>
          {Object.keys(masterArchetype.talents : '').map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{masterArchetype.talents[talent].name}</b></p>
              <p><Description text={masterArchetype.talents[talent].description}/></p>
          </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{masterArchetype.setting}</p>
        <p><b>Description:</b>&nbsp;<Description text={masterArchetype.description} /></p>
      </div>
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
