import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {
    Attributes,
    Character,
    CharacterDescription,
    CharacterImage,
    Characteristics,
    Critical,
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
            <Row>
                <Col sm='7'>
                    <Attributes/>
                </Col>
                <Col sm='5'>
                    <Characteristics/>
                </Col>
            </Row>
            <Skill/>
            <XP/>
            <Row>
                <Col sm='8'>
                    <Motivations/>
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
            <Notes/>
        </Container>
    )
};
