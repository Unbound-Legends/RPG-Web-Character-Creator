import React from 'react';
import {connect} from 'react-redux';
import {usedXP, totalXP} from '../reducers';
import {changeData} from '../actions';
import {bindActionCreators} from 'redux';
import {StatBlock} from "./index";

class XPCounter extends React.Component {
    render() {
        const {usedXP} = this.props;
        return(
            <div className='module'>
                <StatBlock textTop='Used XP' textBottom={usedXP}/>
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
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(XPCounter);