import React from 'react';
import {Container, Row} from 'reactstrap';
import {
    About,
    Attributes,
    Buttons,
    CharacterDescription,
    CharacterImage,
    CharacterSelect,
    Critical,
    Equipment,
    Motivation,
    Notes,
    ShowCharacteristics,
    Skill,
    TalentList,
    Talents,
    XPBoxes,
} from './index';

export const MainPage = () => {
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
            <Row className='m-1'><XPBoxes/></Row>
            <Row className='m-1'><Skill/></Row>
            <Row className='m-1'><Motivation/></Row>
            <Row className='m-1'><Equipment/></Row>
            <Row className='m-1 justify-content-around'>
                <CharacterDescription/>
                <Notes/>
            </Row>
            <Row className='m-1'><TalentList/></Row>
            <Row className='m-1'><Talents/></Row>
            <Row className='m-1 justify-content-center'><About/></Row>
        </Container>
    );
};
