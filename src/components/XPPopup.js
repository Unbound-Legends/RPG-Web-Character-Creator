import React from 'react';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {bindActionCreators} from 'redux';
import popup from 'react-popup';

class XPPopup extends React.Component {
    state = {earnedXP: this.props.earnedXP};

    componentWillReceiveProps(nextProps) {
        this.setState({earnedXP: nextProps.earnedXP});
    }

    handleChange = (event) => {
        let xp = event.target.value;
        if (xp > 9999) return;
        if (xp.includes('+')) xp = +xp.replace(/\D+/g, '') + +this.state.earnedXP;
        this.setState({earnedXP: +xp});
        event.preventDefault();
    };

    handleSubmit = (event) => {
        const {earnedXP} = this.state;
        this.props.changeData(earnedXP, 'earnedXP');
        popup.close();
        event.preventDefault();
    };

    render() {
        const {earnedXP} = this.state;
        return(
            <div>
                <div>Earned XP:</div>
                <input type='number' value={earnedXP} onChange={this.handleChange} />
                <input type='submit' value='+5' onClick={this.handleChange}/>
                <input type='submit' value='+10' onClick={this.handleChange}/>
                <input type='submit' value='Submit' onClick={this.handleSubmit}/>
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