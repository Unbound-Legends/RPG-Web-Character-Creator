import clone from 'clone';
import {pull, startCase, upperFirst} from 'lodash-es'
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardHeader, CardText, Col, Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeCustomData} from '../../actions/index';

const types = ['archetypes', 'careers', 'skills', 'talents', 'archetypeTalents', 'armor', 'gear', 'weapons'];

class SettingBuilderComponent extends React.Component {
	state = {archetypes: [], careers: [], skills: [], talents: [], archetypeTalents: [], armor: [], gear: [], weapons: [], setting: ''};

	initState = () => this.setState({
		archetypes: [],
		careers: [],
		skills: [],
		talents: [],
		archetypeTalents: [],
		armor: [],
		gear: [],
		weapons: [],
		setting: ''
	});

	applySetting = () => {
		const {settings, changeCustomData} = this.props;
		const {setting} = this.state;
		types.forEach(type => {
			let object = clone(this.props[`custom${upperFirst(type)}`]);
			this.state[type].forEach(item => {
				if (!object[item]) object[item] = {name: startCase(item)};
				if (!object[item].setting) object[item].setting = [];
				object[item].setting.push(settings[setting])
			});
			changeCustomData(object, `custom${upperFirst(type)}`, true);
		});
		this.initState();
		alert(`${settings[setting]} setting has been applied to all selected items`)
	};

	handleChange = (event) => {
		let type = event.target.value, item = event.target.name, array = [];
		array = [...this.state[type]];
		if (item) {
			if (array.includes(item)) pull(array, item);
			else array.push(item);
		} else {
			if (array.length === Object.keys(this.props[type]).length) array = [];
			else array = [...Object.keys(this.props[type])];
		}
		this.setState({[type]: array.sort()})
	};

	render() {
		const {settings} = this.props;
		const {setting} = this.state;
		return (
			<div className='align-self-end align-self-middle'>
				<Row className='align-items-center'>
					<Col md='auto'>
						<Input type='select' value={setting} onChange={(event) => this.setState({setting: event.target.value})}>
							{settings && Object.keys(settings).map(key =>
								<option value={key} key={key}>{settings[key]}</option>
							)}
						</Input>
					</Col>
					<Col>
						<Button className='m-2 align-middle' onClick={this.applySetting}>Add Setting</Button>
					</Col>
				</Row>
				<Row>
					{types.sort().map(type =>
						<Col key={type}>
							<Card className='m-2 w-100'>
								<CardHeader>
									<CardText className='ml-2'>
										<Input type='checkbox' checked={this.state[type].length === Object.keys(this.props[type]).length}
											   value={type} onChange={this.handleChange}/>
										<strong>{startCase(type)}</strong>
									</CardText>
								</CardHeader>
								<CardBody className='py-2 ml-4'>
									{Object.keys(this.props[type]).sort().map(item =>
										<CardText key={item}>
											<Input type='checkbox' checked={this.state[type].includes(item)}
												   value={type} name={item} onChange={this.handleChange}/>
											{this.props[type][item].name ? this.props[type][item].name : item}
										</CardText>
									)}
								</CardBody>
							</Card>
						</Col>
					)}
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		archetypes: state.archetypes,
		careers: state.careers,
		skills: state.skills,
		talents: state.talents,
		archetypeTalents: state.archetypeTalents,
		armor: state.armor,
		gear: state.gear,
		weapons: state.weapons,
		settings: state.settings,
		customArchetypes: state.customArchetypes,
		customArchetypeTalents: state.customArchetypeTalents,
		customArmor: state.customArmor,
		customCareers: state.customCareers,
		customGear: state.customGear,
		customSkills: state.customSkills,
		customTalents: state.customTalents,
		customWeapons: state.customWeapons,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const SettingBuilder = connect(mapStateToProps, matchDispatchToProps)(SettingBuilderComponent);
