import React from 'react';
import {SkillBlock} from './index';
import {connect} from "react-redux";
import {skillRanks, archetypeSkillRank} from "../reducers";


class Skill extends React.Component {
    countXP = () => {
        const {masterSkills, careerSkills, skillRanks, archetypeSkillRank} = this.props;
        let xp = 0;
        Object.keys(masterSkills).forEach((skill)=>{
            let rank = skillRanks[skill];
            for(let i=(careerSkills.includes(skill) ? 1 : 0)+(archetypeSkillRank[skill] ? archetypeSkillRank[skill].rank : 0); rank>i; i++){
                xp += (((i + 1) * 5) + (careerSkills.includes(skill) ? 0 : 5));
            }
        })
        return xp;
    };
    render() {
        return (
            <div>
                <div><span>Total XP: {this.countXP()}</span></div>

                <div className='table table-module module' style={{width: '98vw'}}>
                    <div className='table-cell'>
                        <SkillBlock type='General'
                        />
                    </div>
                    <div className='table-cell'>
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