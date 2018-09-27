import React from 'react';
import {Col, Container, Row} from 'reactstrap';

import {TalentList} from '../index';
import {
	Attributes,
	Character,
	CharacterDescription,
	CharacterImage,
	Characteristics,
	Critical,
	Equipment,
	Motivations,
	Notes,
	Skill,
	TalentPyramid,
	XP,
} from './index';

export const PrintLayout = () => {
	return (
		<Container style={{fontSize: '0.8rem'}}>
			<Character/>
			<Attributes/>
			<Characteristics/>
			<Skill/>
			<XP/>
			<Row>
				<Col sm='8'>
					<Motivations/>
				</Col>
				<Col sm='4'>
					<CharacterImage/>
					<CharacterDescription/>
				</Col>
			</Row>
			<Equipment/>
			<Critical/>
			<TalentPyramid/>
			<TalentList/>
			<Notes/>
		</Container>
	)
};
