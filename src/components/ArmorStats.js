import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class ArmorStats extends React.Component {

    handleChange = (attrib, event) => {
        const {changeData, armor, keyID} = this.props;
        let newObj = {...armor};
        if (!newObj[keyID]) newObj[keyID]={};
        newObj[keyID][attrib] = event.target.value;
        changeData(newObj, 'armor');
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {changeData, armor, keyID} = this.props;
        let newObj = {...armor};
        delete newObj[keyID];
        changeData(newObj, 'armor', false);
        popup.close();
        event.preventDefault();
    };

    render() {
        const {armor, keyID} = this.props;
        const item = armor[keyID] ? armor[keyID] : {};
        return (
            <div>
                <div>Name:</div>
                    <input type='text' value={item.name ? item.name : ''} onChange={this.handleChange.bind(this, 'name')} />
                <div>Soak:</div>
                    <input type='number' value={item.soak ? item.soak : ''} onChange={this.handleChange.bind(this, 'soak')} />
                <div>Defense:</div>
                    <input type='number' value={item.defense ? item.defense : ''} onChange={this.handleChange.bind(this, 'defense')} />
                <div>Ranged Defense:</div>
                    <input type='number' value={item.rangedDefense ? item.rangedDefense : ''} onChange={this.handleChange.bind(this, 'rangedDefense')} />
                <div>Melee Defense:</div>
                    <input type='number' value={item.meleeDefense ? item.meleeDefense : ''} onChange={this.handleChange.bind(this, 'meleeDefense')} />
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
        armor: state.armor,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ArmorStats);