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
    XPBoxes,
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
        if (this.props.loading) return <h1 style={{textAlign: 'center', marginTop: '2rem'}}>LOADING</h1>;
        return (
            <Container className='mx-2'>
                <Buttons/>
                <Row className='m-1'>
                    <CharacterSelect/>
                    <CharacterImage/>
                </Row>
                <Row className='m-1'><Attributes/></Row>
                <Row className='m-1'><ShowCharacteristics/></Row>
                <Row className='m-1'><Critical/></Row>
                <Row className='m-1'><CarriedGear/></Row>
                <Row className='m-1 '><XPBoxes/></Row>
                <Row className='m-1 breakBefore'><Skill/></Row>
                <Row className='m-1 breakBefore'><Motivation/></Row>
                <Row className='m-1'><EquipmentLog/></Row>
                <Row className='m-1 justify-content-around'>
                    <CharacterDescription/>
                    <Notes/>
                </Row>
                <Row className='m-1 '><TalentList/></Row>
                <Row className='m-1 breakBefore'><Talents/></Row>
                <Row className='m-1 justify-content-center'><About/></Row>
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
