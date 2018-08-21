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
		<div className='mx-2'>
			<ErrorBoundary>
				<Buttons/>
			</ErrorBoundary>
			<Row className='m-1'>
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
			<Row className='m-1'><ErrorBoundary><Attributes/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><ShowCharacteristics/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><Critical/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><XPBoxes/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><Skill/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><Motivation/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><Equipment/></ErrorBoundary></Row>
			<Row className='m-1'>
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
			<Row className='m-1'><ErrorBoundary><TalentList/></ErrorBoundary></Row>
			<Row className='m-1'><ErrorBoundary><Talents/></ErrorBoundary></Row>
			<Row className='m-1 justify-content-center'><ErrorBoundary><About/></ErrorBoundary></Row>
		</div>
	);
};
