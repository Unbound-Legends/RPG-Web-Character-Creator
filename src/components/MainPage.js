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
			<ErrorBoundary><Buttons/></ErrorBoundary>
			<Row>
				<Col md='6'>
					<ErrorBoundary>
						<CharacterSelect/>
					</ErrorBoundary>
				</Col>
				<Col md='6'>
					<ErrorBoundary>
						<CharacterImage/>
					</ErrorBoundary>
				</Col>
			</Row>
			<ErrorBoundary><Attributes/></ErrorBoundary>
			<ErrorBoundary><ShowCharacteristics/></ErrorBoundary>
			<ErrorBoundary><Critical/></ErrorBoundary>
			<ErrorBoundary><XPBoxes/></ErrorBoundary>
			<ErrorBoundary><Skill/></ErrorBoundary>
			<ErrorBoundary><Motivation/></ErrorBoundary>
			<ErrorBoundary><Equipment/></ErrorBoundary>
			<Row>
				<Col md='6'>
					<ErrorBoundary>
						<CharacterDescription/>
					</ErrorBoundary>
				</Col>
				<Col md='6'>
					<ErrorBoundary>
						<Notes/>
					</ErrorBoundary>
				</Col>
			</Row>
			<ErrorBoundary><TalentList/></ErrorBoundary>
			<ErrorBoundary><Talents/></ErrorBoundary>
			<ErrorBoundary><About/></ErrorBoundary>
		</div>
	);
};
