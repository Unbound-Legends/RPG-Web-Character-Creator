import React from 'react';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {bindActionCreators} from 'redux';
import popup from 'react-popup';

class XPPopup extends React.Component {

    handleChange = (event) => {
        const {earnedXP} = this.props;
        let xp = event.target.value;
        if (event.target.value.includes('+')) xp = +xp.replace(/\D+/g, '') + +earnedXP;
        this.props.changeData(xp, 'earnedXP');
        event.preventDefault();
    };

    render() {
        const {earnedXP} = this.props;
        return(
            <div>
                <div>Earned XP:</div>
                <input type='number' value={earnedXP} onChange={this.handleChange} />
                <input type='submit' value='+5' onClick={this.handleChange}/>
                <input type='submit' value='+10' onClick={this.handleChange}/>
                <input type='submit' value='Close' onClick={popup.close}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        earnedXP: state.earnedXP,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(XPPopup);