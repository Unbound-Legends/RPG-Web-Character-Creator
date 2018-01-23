import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {strainThreshold, totalSoak, woundThreshold} from "../reducers";

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
                <div className='singleAttribute Soak'>
                    <div className='AttributeText'>{totalSoak}</div>
                </div>
                <div className={`singleAttribute Wounds`}>
                    <div className='AttributeText'>
                        <input type='text'
                            maxLength='2'
                            className='textEdit editableAttributeText'
                            onChange={this.handleTextChange}
                            onBlur={this.handleTextChange}
                            placeholder={currentWound ? currentWound : 0}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className='editableAttributeText'>{woundThreshold}</div>
                    </div>
                </div>
                <div className={`singleAttribute Strain`}>
                    <div className='AttributeText'>
                        <input type='text'
                           maxLength='2'
                           className='textEdit editableAttributeText'
                           onChange={this.handleTextChange}
                           onBlur={this.handleTextChange}
                           placeholder={currentStrain ? currentStrain : 0}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className='editableAttributeText'>{strainThreshold}</div>
                    </div>                </div>

                <div className='singleAttribute Defense'>
                    <div className='AttributeText'>{'0 | 0'}</div>
                </div>
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