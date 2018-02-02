import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class RealGearStats extends React.Component {

    handleChange = (attrib, event) => {
        const {changeData, armor, gear, weapons, type, keyID} = this.props;
        let newObj = {};
        if (type==='weapons') newObj = {...weapons};
        if (type==='armor') newObj = {...armor};
        if (type==='gear') newObj = {...gear};
        if (!newObj[keyID]) newObj[keyID]={equipped: false, carried: true};
        newObj[keyID][attrib] = event.target.value;
        changeData(newObj, type);
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, armor, gear, weapons, type, keyID} = this.props;
        let newObj = {};
        if (type==='weapons') newObj = {...weapons};
        if (type==='armor') newObj = {...armor};
        if (type==='gear') newObj = {...gear};
        delete newObj[keyID];
        changeData(newObj, type, false);
        popup.close();
        event.preventDefault();
    };

    render() {
        const {armor, weapons, gear, type, keyID} = this.props;
        if (type==='weapons') {
            const weapon = weapons[keyID] ? weapons[keyID] : {};
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={weapon.name ? weapon.name : ''} onChange={this.handleChange.bind(this, 'name')} />
                    <div>Damage:</div>
                    <input type='number' value={weapon.damage ? weapon.damage : ''} onChange={this.handleChange.bind(this, 'damage')} />
                    <div>Critical Rating:</div>
                    <input type='number' value={weapon.critical ? weapon.critical : ''} onChange={this.handleChange.bind(this, 'critical')} />
                    <div>Range:</div>
                    <select value={weapon.range ? weapon.range : ''} onChange={this.handleChange.bind(this, 'range')}>
                        <option value=''/>
                        <option value='Engaged'>Engaged</option>
                        <option value='Short'>Short</option>
                        <option value='Medium'>Medium</option>
                        <option value='Long'>Long</option>
                        <option value='Extreme'>Extreme</option>
                    </select>
                    <div>Skill:</div>
                    <select value={weapon.skill ? weapon.skill : ''} onChange={this.handleChange.bind(this, 'skill')}>
                        <option value=''/>
                        <option value='Brawl'>Brawl</option>
                        <option value='Gunnery'>Gunnery</option>
                        <option value='Melee'>Melee</option>
                        <option value='MeleeHeavy'>Melee (Heavy)</option>
                        <option value='MeleeLight'>Melee (Light)</option>
                        <option value='Ranged'>Ranged</option>
                        <option value='RangedHeavy'>Ranged (Heavy)</option>
                        <option value='RangedLight'>Ranged (Light)</option>
                    </select>
                    <div>Encumbrance:</div>
                    <input type='number' value={weapon.encumbrance ? weapon.encumbrance : ''} onChange={this.handleChange.bind(this, 'encumbrance')} />
                    <div>Special Qualities:</div>
                    <input type='text' value={weapon.qualities ? weapon.qualities : ''} onChange={this.handleChange.bind(this, 'qualities')} />
                    <input type='submit' value='Enter' onClick={popup.close}/>
                    <input type='submit' value='Delete' onClick={this.handleDelete}/>
                </div>
            );
        }
        if (type==='armor') {
            const item = armor[keyID] ? armor[keyID] : {};
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={item.name ? item.name : ''}
                           onChange={this.handleChange.bind(this, 'name')}/>
                    <div>Soak:</div>
                    <input type='number' value={item.soak ? item.soak : ''}
                           onChange={this.handleChange.bind(this, 'soak')}/>
                    <div>Defense:</div>
                    <input type='number' value={item.defense ? item.defense : ''}
                           onChange={this.handleChange.bind(this, 'defense')}/>
                    <div>Ranged Defense:</div>
                    <input type='number' value={item.rangedDefense ? item.rangedDefense : ''}
                           onChange={this.handleChange.bind(this, 'rangedDefense')}/>
                    <div>Melee Defense:</div>
                    <input type='number' value={item.meleeDefense ? item.meleeDefense : ''}
                           onChange={this.handleChange.bind(this, 'meleeDefense')}/>
                    <div>Encumbrance:</div>
                    <input type='number' value={item.encumbrance ? item.encumbrance : ''}
                           onChange={this.handleChange.bind(this, 'encumbrance')}/>
                    <div>Special Qualities:</div>
                    <input type='text' value={item.qualities ? item.qualities : ''}
                           onChange={this.handleChange.bind(this, 'qualities')}/>
                    <input type='submit' value='Enter' onClick={popup.close}/>
                    <input type='submit' value='Delete' onClick={this.handleDelete}/>
                </div>
            );
        }
        if (type==='gear') {
            const item = gear[keyID] ? gear[keyID] : {};
            return (
                <div>
                    <div>Name:</div>
                    <input type='text' value={item.name ? item.name : ''} onChange={this.handleChange.bind(this, 'name')} />
                    <div>Amount:</div>
                    <input type='number' value={item.amount ? item.amount : ''} onChange={this.handleChange.bind(this, 'amount')} />
                    <div>Encumbrance:</div>
                    <input type='number' value={item.encumbrance ? item.encumbrance : ''} onChange={this.handleChange.bind(this, 'encumbrance')} />
                    <div>Special Qualities:</div>
                    <input type='text' value={item.qualities ? item.qualities : ''} onChange={this.handleChange.bind(this, 'qualities')} />
                    <input type='submit' value='Enter' onClick={popup.close}/>
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RealGearStats);