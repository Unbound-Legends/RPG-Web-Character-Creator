import React from 'react';
import { Col, Row } from 'reactstrap';
import { Buttons } from './Buttons';
import {About} from './About';
import {Attributes} from './Attributes';
import {CharacterDescription} from './CharacterDescription';
import {CharacterImage} from './CharacterImage';
import {CharacterSelect} from './CharacterSelect';
import {Critical} from './Critical';
import {Equipment} from './Equipment';
import {ErrorBoundary} from './ErrorBoundary';
import {Motivation} from './Motivation';
import {Notes} from './Notes';
import {ShowCharacteristics} from './ShowCharacteristics';
import {Skill} from './Skill';
import {TalentList} from './TalentList';
import {Talents} from './Talents';
import {XPBoxes} from './XPBoxes';

export const MainPage = (): any => {
    return (
        <div>
            <ErrorBoundary component="Buttons">
                <Buttons />
            </ErrorBoundary>
            <Row>
                <Col md="6">
                    <ErrorBoundary component="CharacterSelect">
                        <CharacterSelect />
                    </ErrorBoundary>
                </Col>
                <Col md="6">
                    <ErrorBoundary component="CharacterImage">
                        <CharacterImage />
                    </ErrorBoundary>
                </Col>
            </Row>
            <ErrorBoundary component="Attributes">
                <Attributes />
            </ErrorBoundary>
            <ErrorBoundary component="ShowCharacteristics">
                <ShowCharacteristics />
            </ErrorBoundary>
            <ErrorBoundary component="Critical">
                <Critical />
            </ErrorBoundary>
            <ErrorBoundary component="XPBoxes">
                <XPBoxes />
            </ErrorBoundary>
            <ErrorBoundary component="Skill">
                <Skill />
            </ErrorBoundary>
            <ErrorBoundary component="Motivation">
                <Motivation />
            </ErrorBoundary>
            <ErrorBoundary component="Equipment">
                <Equipment />
            </ErrorBoundary>
            <Row>
                <Col md="6">
                    <ErrorBoundary component="CharacterDescription">
                        <CharacterDescription />
                    </ErrorBoundary>
                </Col>
                <Col md="6">
                    <ErrorBoundary component="Notes">
                        <Notes />
                    </ErrorBoundary>
                </Col>
            </Row>
            <ErrorBoundary component="TalentList">
                <TalentList />
            </ErrorBoundary>
            <ErrorBoundary component="Talents">
                <Talents />
            </ErrorBoundary>
            <ErrorBoundary component="About">
                <About />
            </ErrorBoundary>
        </div>
    );
};
