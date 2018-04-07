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
        if (this.props.loadingCustomData || this.props.loadingData) return <h1 className='text-center mt-3'>LOADING</h1>
        return (
            <Container className='mx-2'>
                <Buttons/>
                <Row className='m-1 no-break'>
                    <CharacterSelect/>
                    <CharacterImage/>
                </Row>
                <Row className='m-1 no-break'><Attributes/></Row>
                <Row className='m-1 no-break'><ShowCharacteristics/></Row>
                <Row className='m-1 no-break'><Critical/></Row>
                <Row className='m-1 no-break'><CarriedGear/></Row>
                <Row className='m-1 no-break'><XPBoxes/></Row>
                <Row className='m-1 no-break'><Skill/></Row>
                <Row className='m-1 no-break'><Motivation/></Row>
                <Row className='m-1'><EquipmentLog/></Row>
                <Row className='m-1 justify-content-around no-break'>
                    <CharacterDescription/>
                    <Notes/>
                </Row>
                <Row className='m-1 no-break'><TalentList/></Row>
                <Row className='m-1 no-break'><Talents/></Row>
                <Row className='m-1 justify-content-center no-break'><About/></Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        character: state.character,
        loadingData: state.loadingData,
        loadingCustomData: state.loadingCustomData,
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
