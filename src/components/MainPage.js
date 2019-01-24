import React from 'react';
import {Col, Row} from 'reactstrap';
import {
	About,
	Attributes,
	Buttons,
	CharacterDescription,
	CharacterImage,
	CharacterSelect,
	Critical,
	Equipment,
	ErrorBoundary,
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
		<div>
			<ErrorBoundary component='Buttons'><Buttons/></ErrorBoundary>
			<Row>
				<Col md='6'>
					<ErrorBoundary component='CharacterSelect'>
						<CharacterSelect/>
					</ErrorBoundary>
				</Col>
				<Col md='6'>
					<ErrorBoundary component='CharacterImage'>
						<CharacterImage/>
					</ErrorBoundary>
				</Col>
			</Row>
			<ErrorBoundary component='Attributes'><Attributes/></ErrorBoundary>
			<ErrorBoundary component='ShowCharacteristics'><ShowCharacteristics/></ErrorBoundary>
			<ErrorBoundary component='Critical'><Critical/></ErrorBoundary>
			<ErrorBoundary component='XPBoxes'><XPBoxes/></ErrorBoundary>
			<ErrorBoundary component='Skill'><Skill/></ErrorBoundary>
			<ErrorBoundary component='Motivation'><Motivation/></ErrorBoundary>
			<ErrorBoundary component='Equipment'><Equipment/></ErrorBoundary>
			<Row>
				<Col md='6'>
					<ErrorBoundary component='CharacterDescription'>
						<CharacterDescription/>
					</ErrorBoundary>
				</Col>
				<Col md='6'>
					<ErrorBoundary component='Notes'>
						<Notes/>
					</ErrorBoundary>
				</Col>
			</Row>
			<ErrorBoundary component='TalentList'><TalentList/></ErrorBoundary>
			<ErrorBoundary component='Talents'><Talents/></ErrorBoundary>
			<ErrorBoundary component='About'><About/></ErrorBoundary>
		</div>
	);
};
