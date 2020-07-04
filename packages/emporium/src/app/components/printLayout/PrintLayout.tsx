import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { TalentList } from '../TalentList';
import { Attributes } from './Attributes';
import { Character } from './Character';
import { CharacterDescription } from './CharacterDescription';
import { CharacterImage } from './CharacterImage';
import { Characteristics } from './Characteristics';
import { Critical } from './Critical';
import { Equipment } from './Equipment';
import { Motivations } from './Motivations';
import { Notes } from './Notes';
import { Skill } from './Skill';
import { TalentPyramid } from './TalentPyramid';
import { XP } from './XP';

export const PrintLayout = (): any => {
    return (
        <Container style={{ fontSize: '0.8rem' }}>
            <Character />
            <Attributes />
            <Characteristics />
            <Skill />
            <XP />
            <Row>
                <Col sm="8">
                    <Motivations />
                </Col>
                <Col sm="4">
                    <CharacterImage />
                    <CharacterDescription />
                </Col>
            </Row>
            <Equipment />
            <Critical />
            <TalentPyramid />
            <TalentList />
            <Notes />
        </Container>
    );
};
