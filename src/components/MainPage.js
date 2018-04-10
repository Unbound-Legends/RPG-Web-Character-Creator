import React from 'react';
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

const MainPage = () => {
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
    );
};

export default MainPage;

