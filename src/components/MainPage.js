import React from 'react';
import {changeCharacter, changeCharacterList, loadCharacterList, loadData, loadCustomDataList, loadCustomDataSet} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Component from './index';

class MainPage extends React.Component {

    componentWillMount() {
        const {loadCustomDataList, loadCharacterList} = this.props;
        loadCharacterList();
        loadCustomDataList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.character && nextProps.character !== this.props.character) this.props.loadData();
        if (nextProps.customDataSet && nextProps.customDataSet !== this.props.customDataSet) this.props.loadCustomDataSet();
    }

    render() {
        if (this.props.loading) return <h1>LOADING</h1>;
        return (
            <div>
                <Component.Buttons/>
                <div className='module mobileModule'>
                    <Component.CharacterSelect/>
                    <Component.CharacterImage/>
                </div>
                <Component.Attributes/>
                <Component.ShowCharacteristics/>
                <div className='module floatingXP'>
                    <Component.XPTotal/>
                    <Component.XPAvailable/>
                </div>

                <Component.Skill/>

                <Component.CarriedGear/>

                <Component.Motivation/>
                <Component.EquipmentLog/>
                <div className='module'>
                    <Component.CharacterDescription/>
                    <Component.Notes/>
                </div>
                <Component.Critical/>
                <Component.TalentList/>

                <Component.Talents/>
                <Component.About/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
        loading: state.loading,
        customDataSet: state.customDataSet,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCharacter, changeCharacterList, loadCharacterList, loadData, loadCustomDataList, loadCustomDataSet}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
