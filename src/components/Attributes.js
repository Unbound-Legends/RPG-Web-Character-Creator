import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {strainThreshold, totalSoak, woundThreshold} from "../reducers";
import {StatBlock} from './index';

class Attributes extends React.Component {

    handleChange = (current, type) => {
        const {currentWound, currentStrain, changeData} = this.props;
        if (current==='') current = 0;
        let newObj= type==='Wounds' ? {...currentWound} : {...currentStrain};
        newObj=current;
        changeData(newObj, type==='Wounds' ? 'currentWound' : 'currentStrain');
    }

    render() {
        const {currentWound, woundThreshold, currentStrain, strainThreshold, totalSoak} = this.props;
        return (
            <div>
                <StatBlock  textTop={'Soak'}
                            textBottom={totalSoak}
                            block='attrib' />
            { ['Wounds', 'Strain'].map((type) =>
                <StatBlock  textTop={type}
                            type={type}
                            textEdit={type ==='Wounds' ? currentWound : currentStrain}
                            textBottom={type === 'Wounds' ? woundThreshold : strainThreshold}
                            handleChange={this.handleChange}
                            block='attrib'
                            key={type}/>
                )}
                <StatBlock  textTop={'Defense'}
                            textBottom={'0 | 0'}
                            block='attrib' />
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        woundThreshold: woundThreshold(state),
        strainThreshold: strainThreshold(state),
        totalSoak: totalSoak(state),
        currentWound: state.currentWound,
        currentStrain: state.currentStrain,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData: changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Attributes);