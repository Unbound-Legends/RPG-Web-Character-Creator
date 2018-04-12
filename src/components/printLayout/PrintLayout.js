import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {
    Attributes,
    Character,
    CharacterDescription,
    CharacterImage,
    Characteristics,
    Critical,
    EquippedWeapons,
    Gear,
    Motivations,
    Notes,
    Skill,
    TalentPyramid,
    XP,
} from './index';

import {TalentList} from "../index";

export const PrintLayout = () => {
    return (
        <Container style={{fontSize: '0.8rem'}}>
            <Character/>
            <Attributes/>
            <Characteristics/>
            <Skill/>
            <EquippedWeapons/>
            <XP/>
            <Row>
                <Col sm='8'>
                    <Motivations/>
                    <Notes/>
                </Col>
                <Col sm='4'>
                    <CharacterImage/>
                    <CharacterDescription/>
                    <Critical/>
                </Col>
            </Row>
            <Gear/>
            <TalentList/>
            <TalentPyramid/>
        </Container>
    )
};
