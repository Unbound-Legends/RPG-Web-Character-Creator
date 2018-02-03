import React from 'react';
import {SkillBlock} from './index';
import {connect} from "react-redux";
import {skillRanks, archetypeSkillRank} from "../reducers";


class Skill extends React.Component {

    render() {
        return (
            <div className='module'>
                <div className='sectionheader'>SKILLS</div>
                <hr />
                <div className='table table-module' style={{width: '96vw'}}>
                    <div className='table-cell' style={{width: '50%%'}}>
                        <SkillBlock type='General'
                        />
                    </div>
                    <div className='table-cell' style={{width: '50%'}}>
                        {['Combat', 'Magic', 'Social', 'Knowledge'].map((type) =>
                            <SkillBlock key={type}
                                        type={type}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
  }

function mapStateToProps(state) {
    return {
        masterSkills: state.masterSkills,
        careerSkills: state.careerSkills,
        skillRanks: skillRanks(state),
        archetypeSkillRank: archetypeSkillRank(state),
    };
}

export default connect(mapStateToProps)(Skill);