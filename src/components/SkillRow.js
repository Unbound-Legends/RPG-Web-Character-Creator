import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {archetypeSkillRank, skillDice, skillRanks, careerCheck} from '../reducers';
import {Description} from './index';

class SkillRow extends React.Component {

    handleRankChange = (event) => {
        const {masterSkills, skillKey, changeData, careerSkillsRank, archetypeSkillRank, careerCheck} = this.props;
        let newObj = {...masterSkills};
        let rankType = careerCheck[skillKey] ? 'careerRank' : 'rank';
        if (!newObj[skillKey]) newObj[skillKey] = {};
        newObj[skillKey][rankType] = +event.target.value - (careerSkillsRank.includes(skillKey) ? 1 : 0) - (archetypeSkillRank[skillKey] ? archetypeSkillRank[skillKey].rank : 0) - (careerCheck[skillKey] && masterSkills[skillKey].rank>0 ? careerCheck[skillKey] : 0);
        changeData(newObj, 'masterSkills');
    };

    shortCharacteristics = () => {
        const {skillKey, skills} = this.props;
        switch (skills[skillKey].characteristic) {
            case 'Agility':
                return 'AG';
            case 'Brawn':
                return 'BR';
            case 'Intellect':
                return 'INT';
            case 'Cunning':
                return 'CUN';
            case 'Willpower':
                return 'WILL';
            case 'Presence':
                return 'PR';
            default:
                return '';
        }
    };

    render() {
        const {masterSkills, skills, skillKey, careerSkillsRank, skillDice, skillRanks, archetypeSkillRank, careerCheck} = this.props;
        const skill = skills[skillKey];
        let ranks = [0, 1, 2, 3, 4, 5];
        if (careerSkillsRank.includes(skillKey)) ranks.shift();
        if (archetypeSkillRank[skillKey]) {
            for (let i = 0; archetypeSkillRank[skillKey].rank > i; i++) {
                ranks.shift();
            }
        }
        return (
            <div
                className={masterSkills[skillKey] ? (masterSkills[skillKey].hide ? 'table-row-hide' : 'table-row') : 'table-row'}>
                <div className='table-cell' style={{textAlign: 'left'}}>
                    {`${skill.name} (${this.shortCharacteristics()})`}
                </div>
                <div className='table-cell'>
                    <input type='checkbox' checked={!!careerCheck[skillKey]}
                           readOnly/>
                </div>
                <div className='table-cell'>
                    <select defaultValue={skillRanks[skillKey]} onChange={this.handleRankChange} style={{margin: '0'}}>
                        {ranks.map((key) => <option key={key} value={key}>{key}</option>)}
                    </select>
                </div>
                <div className='table-cell'>
                    <Description text={skillDice[skillKey]}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        masterSkills: state.masterSkills,
        skills: state.skills,
        careerSkillsRank: state.careerSkillsRank,
        career: state.career,
        careers: state.careers,
        skillDice: skillDice(state),
        skillRanks: skillRanks(state),
        archetypeSkillRank: archetypeSkillRank(state),
        careerCheck: careerCheck(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SkillRow);
