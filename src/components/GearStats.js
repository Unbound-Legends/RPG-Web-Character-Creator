import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class GearStats extends React.Component {

    handleChange = (attrib, event) => {
        const {changeData, gear, keyID} = this.props;
        let newObj = {...gear};
        if (!newObj[keyID]) newObj[keyID]={};
        newObj[keyID][attrib] = event.target.value;
        changeData(newObj, 'gear');
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, gear, keyID, carried, equipped} = this.props;
        let newObj = {...gear};
        let newCarried = {...carried};
        let newEquipped = {...equipped};
        delete newObj[keyID];

        if (newCarried.gear) {
            if (newCarried.gear.includes(keyID)) {
                newCarried.gear.forEach((item, index) => {
                    if (item === keyID) newCarried.gear.splice(index, 1);
                });
                changeData(newCarried, 'carried');
            }
        }
        if (newEquipped.gear) {
            if (newEquipped.gear.includes(keyID)) {
                newEquipped.gear.forEach((item, index) => {
                    if (item === keyID) newEquipped.gear.splice(index, 1);
                });
                changeData(newEquipped, 'equipped');
            }
        }
        changeData(newObj, 'gear', false);
        popup.close();
        event.preventDefault();
    };

    render() {
        const {gear, keyID} = this.props;
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

function mapStateToProps(state) {
    return {
        gear: state.gear,
        equipped: state.equipped,
        carried: state.carried,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GearStats);