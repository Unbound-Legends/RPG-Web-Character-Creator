import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {
    encumbranceLimit, strainThreshold, totalDefense, totalEncumbrance, totalSoak,
    woundThreshold
} from "../reducers";

class Attributes extends React.Component {
    state = {currentStrain: 0, currentWound: 0};

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentStrain !== this.props.currentStrain) this.setState({currentStrain: nextProps.currentStrain});
        if (nextProps.currentWound !== this.props.currentWound)this.setState({currentWound: nextProps.currentWound});

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: +event.target.value});
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {changeData} = this.props;
        let type = event.target.name;
        let value = this.state[type];
        changeData(value, type);
    };

    render() {
        const {woundThreshold, strainThreshold, totalSoak, totalDefense, totalEncumbrance, encumbranceLimit} = this.props;
        const {currentStrain, currentWound} = this.state;
        return (
            <div className='module'>
                <div className='sectionheader'>ATTRIBUTES</div>
                <hr />
                <div className='singleAttribute Soak'>
                    <div className='AttributeText'>{totalSoak}</div>
                </div>
                <div className={`singleAttribute Wounds`}>
                    <div className='AttributeText'>
                        <div className='editableAttributeText doubleAttributeText'>{woundThreshold}</div>
                        <input type='number'
                            name='currentWound'
                            maxLength='2'
                            className='doubleAttributeText editableAttributeText '
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            placeholder={currentWound}/>
                    </div>
                </div>
                <div className={`singleAttribute Strain`}>
                    <div className='AttributeText'>
                        <div className='editableAttributeText doubleAttributeText'>{strainThreshold}</div>
                        <input type='number'
                           name='currentStrain'
                           maxLength='2'
                           className='doubleAttributeText editableAttributeText'
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}
                           placeholder={currentStrain}/>
                    </div>
                </div>
                <div className='singleAttribute Defense'>
                    <div className='AttributeText'><div className='doubleAttributeText'>{totalDefense.ranged}</div><div className='doubleAttributeText'>{totalDefense.melee}</div> </div>
                </div>
                <div className='singleAttribute DoubleAttribute'>
                    <div className='singleAttribute-topText'>ENCUMBRANCE</div>
                    <div className='singleAttribute-bottomText'><div className='doubleAttributeText'>{encumbranceLimit}</div><div className='doubleAttributeText'>{totalEncumbrance}</div></div>
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
        totalDefense: totalDefense(state),
        totalEncumbrance: totalEncumbrance(state),
        encumbranceLimit: encumbranceLimit(state),
        currentWound: state.currentWound,
        currentStrain: state.currentStrain,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Attributes);