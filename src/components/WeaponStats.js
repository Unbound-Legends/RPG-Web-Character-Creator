import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class WeaponStats extends React.Component {

    handleChange = (attrib, event) => {
        const {changeData, weapons, keyID} = this.props;
        let newObj = {...weapons};
        if (!newObj[keyID]) newObj[keyID]={};
        newObj[keyID][attrib] = event.target.value;
        changeData(newObj, 'weapons');
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, weapons, keyID, carried, equipped} = this.props;
        let newObj = {...weapons};
        let newCarried = {...carried};
        let newEquipped = {...equipped};
        delete newObj[keyID];

        if (newCarried.weapons) {
            if (newCarried.weapons.includes(keyID)) {
                newCarried.weapons.forEach((item, index) => {
                    if (item === keyID) newCarried.weapons.splice(index, 1);
                });
                changeData(newCarried, 'carried');
            }
        }

        if (newEquipped.weapons) {
            if (newEquipped.weapons.includes(keyID)) {
                newEquipped.weapons.forEach((item, index) => {
                    if (item === keyID) newEquipped.weapons.splice(index, 1);
                });
                changeData(newEquipped, 'equipped');
            }
        }

        changeData(newObj, 'weapons', false);
        popup.close();
        event.preventDefault();
    };

    render() {
        const {weapons, keyID} = this.props;
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
}

function mapStateToProps(state) {
    return {
        weapons: state.weapons,
        equipped: state.equipped,
        carried: state.carried,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WeaponStats);