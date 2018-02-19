import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class GearStats extends React.Component {
    state = {
        armor: this.props.armor[this.props.keyID] ? this.props.armor[this.props.keyID] : {
            equipped: false,
            carried: true
        },
        weapons: this.props.weapons[this.props.keyID] ? this.props.weapons[this.props.keyID] : {
            equipped: false,
            carried: true
        },
        gear: this.props.gear[this.props.keyID] ? this.props.gear[this.props.keyID] : {equipped: false, carried: true}
    };

    handleChange = (event) => {
        const {type} = this.props;
        const {armor, gear, weapons} = this.state;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        newObj[event.target.name] = event.target.value;
        this.setState({[type]: newObj});
        event.preventDefault();
    };

    handleAddQuality = () => {
        const {type} = this.props;
        const {armor, gear, weapons} = this.state;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        if (!newObj.qualitiesList) newObj.qualitiesList = [];
        if (!newObj.qualityRank) newObj.qualityRank = '';
        newObj.qualitiesList.push({[newObj.qualities]: newObj.qualityRank});
        delete newObj.qualities;
        delete newObj.qualityRank;
        this.setState({[type]: newObj});
    };


    handleSubmit = (event) => {
        const {type, changeData, armor, gear, weapons, keyID} = this.props;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        newObj[keyID] = this.state[type];
        changeData(newObj, `${type}`);
        popup.close();
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, armor, gear, weapons, type, keyID} = this.props;
        let newObj = {};
        if (type === 'weapons') newObj = {...weapons};
        if (type === 'armor') newObj = {...armor};
        if (type === 'gear') newObj = {...gear};
        changeData('', type);
        delete newObj[keyID];
        changeData(newObj, type);
        popup.close();
        event.preventDefault();
    };

    render() {
        const {type, qualities, skills} = this.props;
        const {armor, gear, weapons} = this.state;
        if (type === 'weapons') {
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={weapons.name ? weapons.name : ''} name='name' onChange={this.handleChange}/>
                    <div>Damage:</div>
                    <input type='number' value={weapons.damage ? weapons.damage : ''} name='damage'
                           onChange={this.handleChange}/>
                    <div>Critical Rating:</div>
                    <input type='number' value={weapons.critical ? weapons.critical : ''} name='critical'
                           onChange={this.handleChange}/>
                    <div>Range:</div>
                    <select value={weapons.range ? weapons.range : ''} name='range' onChange={this.handleChange}>
                        <option value=''/>
                        <option value='Engaged'>Engaged</option>
                        <option value='Short'>Short</option>
                        <option value='Medium'>Medium</option>
                        <option value='Long'>Long</option>
                        <option value='Extreme'>Extreme</option>
                    </select>
                    <div>Skill:</div>
                    <select value={weapons.skill ? weapons.skill : ''} name='skill' onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(skills).sort().map((skillKey)=>
                            skills[skillKey].type === 'Combat' &&
                            <option value={skillKey} key={skillKey}>{skills[skillKey].name}</option>
                        )}
                    </select>
                    <div>Encumbrance:</div>
                    <input type='number' value={weapons.encumbrance ? weapons.encumbrance : ''} name='encumbrance'
                           onChange={this.handleChange}/>
                    <div>Special Qualities:</div>
                    <select value={weapons.qualities ? weapons.qualities : ''} name='qualities'
                            onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(qualities).map((quality) =>
                            qualities[quality].type.includes(type) &&
                            <option key={quality} value={quality}>{qualities[quality].name}</option>
                        )}
                    </select>
                    {weapons.qualities &&
                    qualities[weapons.qualities].ranked &&
                    <input type='number' className='shortTextBox' maxLength='2'
                           value={weapons.qualityRank ? weapons.qualityRank : ''} name='qualityRank'
                           onChange={this.handleChange}/>
                    }
                    <input type='button' value='Add' onClick={this.handleAddQuality}/>
                    <div>
                        {weapons.qualitiesList && weapons.qualitiesList.map((quality) =>
                            `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                        ).sort().join(', ')}
                    </div>

                    <div>
                        <input type='submit' value='Enter' onClick={this.handleSubmit}/>
                        <input type='submit' value='Delete' onClick={this.handleDelete}/>
                    </div>
                </div>
            );
        }
        if (type === 'armor') {
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={armor.name} name='name'
                           onChange={this.handleChange}/>
                    <div>Soak:</div>
                    <input type='number' value={armor.soak} name='soak'
                           onChange={this.handleChange}/>
                    <div>Defense:</div>
                    <input type='number' value={armor.defense} name='defense'
                           onChange={this.handleChange}/>
                    <div>Ranged Defense:</div>
                    <input type='number' value={armor.rangedDefense} name='rangedDefense'
                           onChange={this.handleChange}/>
                    <div>Melee Defense:</div>
                    <input type='number' value={armor.meleeDefense} name='meleeDefense'
                           onChange={this.handleChange}/>
                    <div>Encumbrance:</div>
                    <input type='number' value={armor.encumbrance} name='encumbrance'
                           onChange={this.handleChange}/>
                    <div>Special Qualities:</div>
                    <select value={armor.qualities ? armor.qualities : ''} name='qualities'
                            onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(qualities).map((quality) =>
                            qualities[quality].type.includes(type) &&
                            <option key={quality} value={quality}>{qualities[quality].name}</option>
                        )}
                    </select>
                    {armor.qualities &&
                    qualities[armor.qualities].ranked &&
                    <input type='number' className='shortTextBox' maxLength='2'
                           value={armor.qualityRank ? armor.qualityRank : ''} name='qualityRank'
                           onChange={this.handleChange}/>
                    }
                    <input type='button' value='Add' onClick={this.handleAddQuality}/>
                    <div>
                        {armor.qualitiesList && armor.qualitiesList.map((quality) =>
                            `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                        ).sort().join(', ')}
                    </div>
                    <input type='submit' value='Enter' onClick={this.handleSubmit}/>
                    <input type='submit' value='Delete' onClick={this.handleDelete}/>
                </div>
            );
        }
        if (type === 'gear') {
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={gear.name ? gear.name : ''} name='name' onChange={this.handleChange}/>
                    <div>Amount:</div>
                    <input type='number' value={gear.amount ? gear.amount : ''} name='amount'
                           onChange={this.handleChange}/>
                    <div>Encumbrance:</div>
                    <input type='number' value={gear.encumbrance ? gear.encumbrance : ''} name='encumbrance'
                           onChange={this.handleChange}/>
                    <div>Special Qualities:</div>
                    <select value={gear.qualities ? gear.qualities : ''} name='qualities'
                            onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(qualities).map((quality) =>
                            qualities[quality].type.includes(type) &&
                            <option key={quality} value={quality}>{qualities[quality].name}</option>
                        )}
                    </select>
                    {gear.qualities &&
                    qualities[gear.qualities].ranked &&
                    <input type='number' className='shortTextBox' maxLength='2'
                           value={gear.qualityRank ? gear.qualityRank : ''} name='qualityRank'
                           onChange={this.handleChange}/>
                    }
                    <input type='button' value='Add' onClick={this.handleAddQuality}/>
                    <div>
                        {gear.qualitiesList && gear.qualitiesList.map((quality) =>
                            `${qualities[Object.keys(quality)[0]].name} ${Object.values(quality)[0]}`
                        ).sort().join(', ')}
                    </div>
                    <input type='submit' value='Enter' onClick={this.handleSubmit}/>
                    <input type='submit' value='Delete' onClick={this.handleDelete}/>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        armor: state.armor,
        weapons: state.weapons,
        gear: state.gear,
        qualities: state.qualities,
        skills: state.skills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GearStats);