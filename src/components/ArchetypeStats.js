import React from 'react';
import {connect} from 'react-redux';
import {Description, ArchetypeSkills} from './index';

class ArchetypeStats extends React.Component {

  render() {
    const {archetype, archetypes} = this.props;
    const masterArchetype = archetypes[archetype];
    if (!archetype) return <div/>;
    return (
      <div>
        <h2>Archetype:&nbsp;<span className='title'>{masterArchetype.name}</span></h2>
        <p><b>Starting Stats: </b></p>
        <div className='block'>
          {Object.keys(masterArchetype.characteristics).map((stat)=>
              <div key={stat} className={`characteristic`}>
                  <div className='characteristic-topText'>{masterArchetype.characteristics[stat]}</div>
                  <div className='characteristic-bottomText'>{stat}</div>
              </div>
          )}
        </div>
        {masterArchetype &&
            <div className='block'>
                <div className='singleAttribute'>
                    <div className='singleAttribute-topText'>INITIAL WOUNDS</div>
                    <div className='singleAttribute-bottomText'>{masterArchetype.woundThreshold}</div>
                </div>
                <div className='singleAttribute'>
                  <div className='singleAttribute-topText'>INITIAL STRAIN</div>
                  <div className='singleAttribute-bottomText'>{masterArchetype.strainThreshold}</div>
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
          {Object.keys(masterArchetype.talents : '').map((talent)=>
            <div key={talent} style={{textIndent: '1em'}}>
              <p><b>{masterArchetype.talents[talent].name}</b></p>
              <Description text={masterArchetype.talents[talent].description}/>
            </div>
          )}
        </div>
        <p><b>Setting:</b>&nbsp;{masterArchetype.setting}</p>

          <p><b>Description:</b></p>
          <div style={{textIndent: '1em'}}><Description text={masterArchetype.description} /></div>
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
