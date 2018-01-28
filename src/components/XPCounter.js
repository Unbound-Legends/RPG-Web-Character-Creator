import React from 'react';
import {connect} from 'react-redux';
import {usedXP, totalXP} from '../reducers';
import {changeData} from '../actions';
import {bindActionCreators} from 'redux';

class XPCounter extends React.Component {
    render() {
        const {usedXP} = this.props;
        return(
            <div className='module'>
                <div className='singleAttribute xpBox'>
                    <div className='xpBox-topText'>{usedXP}</div>
                    <div className='xpBox-bottomText'>USED XP</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalXP: totalXP(state),
        usedXP: usedXP(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(XPCounter);