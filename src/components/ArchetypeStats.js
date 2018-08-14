import React from 'react';
import {connect} from 'react-redux';
import {Col, Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from "../actions";
import {ArchetypeSkills, Description} from './index';

const clone = require('clone');


class ArchetypeStatsComponent extends React.Component {

	handleSelect = (event) => {
		let obj = clone(this.props.misc);
		obj.archetypeTalents = event.target.value;
		this.props.changeData(obj, 'misc');
	};

	render() {
		const {archetype, archetypes, archetypeTalents, misc} = this.props;
		const masterArchetype = archetypes[archetype];
		if (!archetype || !archetypes[archetype]) return <div/>;
		return (
			<div>
				<Row className='my-2'><Col sm='5'><b>Starting Stats: </b></Col></Row>
				<Row className='justify-content-center my-2'>
					{Object.keys(masterArchetype.characteristics).map((stat) =>
						<div className='imageBox' key={stat}>
							<img src={'/images/png/Characteristic.png'} alt='' className='png'/>
							<Row className='characteristicValue'>{masterArchetype.characteristics[stat]}</Row>
							<Row className='characteristicTitle'>{stat}</Row>
						</div>
					)}
				</Row>
				{masterArchetype &&
				<Row className='justify-content-center my-2'>
					<div className='imageBox attribute'>
						<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>WOUNDS</Row>
						<Row className='attributeValue'>{masterArchetype.woundThreshold}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>STRAIN</Row>
						<Row className='attributeValue'>{masterArchetype.strainThreshold}</Row>
					</div>
				</Row>
				}
				<Row className='my-2'>
					<Col sm='5'><b>Starting XP:</b></Col>
					<Col>{masterArchetype.experience}</Col>
				</Row>
				<Row className='my-2'>
					<Col sm='5'><b>Starting Skills:</b></Col>
					<ArchetypeSkills/>
				</Row>
				<Row className='my-2'>
					<Col sm='5'><b>Starting Talents:</b></Col>
				</Row>
				{masterArchetype.talents &&
				masterArchetype.talents.map(talent =>
					archetypeTalents[talent] &&
					<div key={talent}>
						<Row className='ml-4'>
							<Col sm='5'><b>{archetypeTalents[talent].name}:</b></Col>
							<Col><Description text={archetypeTalents[talent].description}/></Col>
						</Row>
						{archetypeTalents[talent].modifier &&
						archetypeTalents[talent].modifier.archetypeTalents &&
						<Row className='ml-4'>
							<Col sm='5'><b>Select One:</b></Col>
							<Col>
								<Input type='select' value={misc ? misc.archetypeTalents : ''}
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
					</div>
				)}
				<Row className='my-2'>
					<Col sm='5'><b>Setting:</b></Col>
					<Col>{masterArchetype.setting}</Col></Row>
				{masterArchetype.book &&
				<Row className='my-2'>
					<Col sm='5'><b>Book:</b></Col>
					<Col><Description text={`${masterArchetype.book}: Page ${masterArchetype.page}`}/></Col>
				</Row>
				}
				<Row className='my-2'>
					<Col sm='5'><b>Description:</b></Col>
					<Col> <Description text={masterArchetype.description}/></Col>
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
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const ArchetypeStats = connect(mapStateToProps, matchDispatchToProps)(ArchetypeStatsComponent);
