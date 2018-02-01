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
        const {changeData, gear, keyID} = this.props;
        let newObj = {...gear};
        delete newObj[keyID];
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
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GearStats);