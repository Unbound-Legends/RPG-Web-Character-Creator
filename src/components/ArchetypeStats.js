import clone from 'clone';
import React from 'react';
import {connect} from 'react-redux';
import {Col, Input, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from "../actions";
import * as images from '../images';
import {ArchetypeSkills, Description} from './index';

class ArchetypeStatsComponent extends React.Component {

	handleSelect = (event) => {
		let obj = clone(this.props.misc);
		obj.archetypeTalents = event.target.value;
		this.props.changeData(obj, 'misc');
	};

	render() {
		const {archetype, archetypes, archetypeTalents, misc, theme} = this.props;
		const masterArchetype = archetypes[archetype];
		if (!archetype || !archetypes[archetype]) return <div/>;
		return (
			<div>
				<Row className='my-2'><Col sm='5'><b>Starting Stats</b></Col></Row>
				<Row className='justify-content-center my-2'>
					{Object.keys(masterArchetype.characteristics).map(stat =>
						<div className='imageBox' key={stat}>
							<img src={images[theme][stat]} alt='' className='svg'/>
							<Row className={`characteristicValue characteristicValue-${theme}`}>{masterArchetype.characteristics[stat]}</Row>
						</div>
					)}
				</Row>
				{masterArchetype &&
				<Row className='justify-content-center my-2'>
					<div className='imageBox attribute'>
						<img src={images[theme].WoundsThreshold} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-WoundsThreshold`}>{masterArchetype.woundThreshold}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].StrainThreshold} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-StrainThreshold`}>{masterArchetype.strainThreshold}</Row>
					</div>
				</Row>
				}
				<Row className='mb-1'>
					<Label for='XP' className='py-0' sm={5}><b>Starting XP</b></Label>
					<Col id='XP'>{masterArchetype.experience}</Col>
				</Row>
				<Row className='mb-1'>
					<Label for='startingSkills' className='py-0' sm='5'><b>Starting Skills</b></Label>
					<ArchetypeSkills id='startingSkills'/>
				</Row>
				<Row className='mb-1'>
					<Label for='startingTalents' className='py-0' sm='5'><b>Starting Talents</b></Label>
				</Row>
				{masterArchetype.talents &&
				masterArchetype.talents.map(talent =>
					archetypeTalents[talent] &&
					<Col sm={12} id='startingTalents' key={talent}>
						<Row>
							<Label for={talent} className='py-0' sm='5'><b>{archetypeTalents[talent].name}</b></Label>
							<Col id={talent}><Description text={archetypeTalents[talent].description}/></Col>
						</Row>
						{archetypeTalents[talent].modifier &&
						archetypeTalents[talent].modifier.archetypeTalents &&
						<Row>
							<Label for='selector' className='py-0' sm='5'><b>Select One</b></Label>
							<Col>
								<Input id='selector' type='select' bsSize='sm' value={misc ? misc.archetypeTalents : ''}
									   onChange={this.handleSelect}>
									<option value=''/>
									{archetypeTalents[talent].modifier.archetypeTalents &&
									archetypeTalents[talent].modifier.archetypeTalents.sort().map((key) =>
										<option value={key} key={key}>{archetypeTalents[key].name}</option>
									)}
								</Input>
							</Col>
						</Row>
						}
					</Col>
				)}
				<Row className='mb-1'>
					<Label for='setting' className='py-0' sm='5'><b>Setting</b></Label>
					<Col
						id='setting'>{Array.isArray(masterArchetype.setting) ? masterArchetype.setting.sort().join(', ') : masterArchetype.setting}</Col></Row>
				{masterArchetype.book &&
				<Row className='mb-1'>
					<Label for='book' className='py-0' sm='5'><b>Book</b></Label>
					<Col id='book'><Description text={`${masterArchetype.book}: Page ${masterArchetype.page}`}/></Col>
				</Row>
				}
				<Row className='mb-1'>
					<Label for='desc' className='py-0' sm='5'><b>Description</b></Label>
					<Col id='desc'><Description text={masterArchetype.description}/></Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		archetype: state.archetype,
		archetypes: state.archetypes,
		archetypeTalents: state.archetypeTalents,
		misc: state.misc,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const ArchetypeStats = connect(mapStateToProps, matchDispatchToProps)(ArchetypeStatsComponent);
