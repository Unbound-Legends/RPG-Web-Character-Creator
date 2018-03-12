import React from 'react';
import {
    changeCharacter,
    changeCharacterList,
    loadCharacterList,
    loadCustomDataList,
    loadCustomDataSet,
    loadData
} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row} from 'reactstrap';
import {
    About,
    Attributes,
    Buttons,
    CarriedGear,
    CharacterDescription,
    CharacterImage,
    CharacterSelect,
    Critical,
    EquipmentLog,
    Motivation,
    Notes,
    ShowCharacteristics,
    Skill,
    TalentList,
    Talents,
    XPAvailable,
    XPTotal
} from './index';

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
            <Container className='mx-2 my-1'>
                <Buttons/>
                <Row className='my-1 '>
                    <CharacterSelect/>
                    <CharacterImage/>
                </Row>
                <Attributes/>
                <ShowCharacteristics/>
                <XPTotal/>
                <XPAvailable/>
                <Skill/>
                <CarriedGear/>
                <Motivation/>
                <EquipmentLog/>
                <CharacterDescription/>
                <Notes/>
                <Critical/>
                <TalentList/>
                <Talents/>
                <About/>
            </Container>
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
    return bindActionCreators({
        changeCharacter,
        changeCharacterList,
        loadCharacterList,
        loadData,
        loadCustomDataList,
        loadCustomDataSet
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
