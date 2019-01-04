import {cloneDeep, pull, startCase} from 'lodash-es'
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardHeader, CardText, Col, Input, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {addDataSet, importCharacter, importCustomData} from '../actions';
import {asyncForEach, customDataTypes as temp, dataTypes} from '../data/';
import {db} from '../firestoreDB';

const customDataTypes = [...temp, ...['customArchetypes', 'customVehicles']];

class ImportExportComponent extends React.Component {
	state = {
		characters: [],
		customArchetypes: [],
		customArchetypeTalents: [],
		customArmor: [],
		customCareers: [],
		customGear: [],
		customMotivations: [],
		customSettings: [],
		customSkills: [],
		customTalents: [],
		customVehicles: [],
		customWeapons: [],
	};

	initState = () => {
		this.setState({
			characters: [],
			customArchetypes: [],
			customArchetypeTalents: [],
			customArmor: [],
			customCareers: [],
			customGear: [],
			customMotivations: [],
			customSettings: [],
			customSkills: [],
			customTalents: [],
			customVehicles: [],
			customWeapons: [],
		})
	};

	generateFileName = () => {
		let time = new Date(Date.now())
			.toLocaleString()
			.replace(/[\s+]/g, '')
			.replace(/[\D+]/g, '_')
			.slice(0, -2);
		return `GenesysEmporiumExport_${time}.json`
	};

	generateExport = async () => {
		const {user, characterList} = this.props;
		new Promise(async resolve => {
			let final = {};
			await asyncForEach(Object.keys(this.state), async type => {
				switch (type) {
					case'characters':
						let characters = [];
						await asyncForEach(this.state[type], async character => {
							let file = {name: characterList[character]};
							await asyncForEach(dataTypes, async type => {
								await db.doc(`users/${user}/data/characters/${character}/${type}/`).get()
									.then(doc => {
										if (doc.exists) file[type] = cloneDeep(doc.data().data);
									})
							});
							characters.push(file)
						});
						if (characters.length > 0) final.characters = characters;
						break;
					case 'customMotivations':
					case 'customSettings':
						if (this.state[type].length > 0) final[type] = cloneDeep(this.props[type]);
						break;
					default:
						let data = [];
						this.state[type].forEach(key => {
							// noinspection JSUnusedLocalSymbols
							let {read, write, id, ...item} = this.props[type][key];
							data.push(item);
						});
						if (data.length > 0) final[type] = data;
				}
			});
			resolve(final);

		}).then(finalExport => {
			let element = document.createElement('a');
			let file = new Blob([JSON.stringify(finalExport)], {type: "application/json"});
			element.href = URL.createObjectURL(file);
			element.download = this.generateFileName();
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			this.initState();
		});
	};

	handleChange = (event) => {
		const {characterList} = this.props;
		const {characters} = this.state;
		let name = event.target.name;
		let value = event.target.value;

		if (name === 'characters') {
			let arr = [];
			if (value === 'all') {
				if (characters.length === Object.keys(characterList).length) arr = [];
				else arr = Object.keys(characterList);
			} else {
				arr = cloneDeep(characters);
				if (arr.includes(value)) arr.splice(arr.indexOf(value), 1);
				else arr.push(value);
			}
			this.setState({characters: arr});
		}

		else {
			let key = event.target.id;
			switch (true) {
				case value === 'all':
					if (customDataTypes.every(type => Object.keys(this.props[type]).every(key => this.state[type].includes(key)))) {
						customDataTypes.forEach(type => this.setState({[type]: []}));
					}
					else customDataTypes.forEach(type => this.props[type] && this.setState({[type]: Object.keys(this.props[type])}));
					break;
				case customDataTypes.includes(value) && !key:
					if (Object.keys(this.props[value]).every(key => this.state[value].includes(key))) this.setState({[value]: []});
					else this.setState({[value]: Object.keys(this.props[value])});
					break;
				default:
					let data = [...this.state[value]];
					if (this.state[value].includes(key)) data = pull(data, key);
					else data.push(key);
					this.setState({[value]: data});
			}
		}
	};

	handleFile = (event) => {
		let fileInput = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (event) => {
			let file = JSON.parse(event.target.result);
			//old exports Delete at some point
			if (Array.isArray(file)) {
				file.forEach(data => {
					switch (Object.keys(data)[0]) {
						case 'character':
							this.props.importCharacter(data.character, this.props.user);
							alert(`${data.character.name} Imported!`);
							break;
						case 'customData':
							this.props.importCustomData(data.customData);
							alert(`Custom Data Imported!`);
							break;
						default:
							alert('No Data Imported.');
							break;
					}
				})
			}
			//New exports
			else {
				let text = '';
				Object.keys(file).forEach(type => {
					switch (type) {
						case 'characters':
							file[type].forEach(character => {
								this.props.importCharacter(character, this.props.user);
								text += `${character.name} Imported!\n`;
							});
							break;
						case 'customArchetypeTalents':
						case 'customCareers':
						case 'customSkills':
						case 'customTalents':
						case 'customWeapons':
						case 'customArmor':
						case 'customGear':
							if (file[type].length > 0) {
								let data = {};
								file[type].forEach(item => data[item.name.replace(/\s/g, '')] = item);
								this.props.importCustomData({[type]: data});
								text += `${startCase(type)} Data Imported.\n`;
							}
							break;
						case 'customMotivations':
						case 'customSettings':
							this.props.importCustomData({[type]: file[type]});
							text += `${startCase(type)} Data Imported.\n`;
							break;
						case 'customArchetypes':
						case 'customVehicles':
							file[type].forEach(data => this.props.addDataSet(type, data));
							text += `${startCase(type)} Data Imported.\n`;
							break;
						default:
							text += `No ${startCase(type)} Data Imported.\n`;
							break;
					}
				});
				alert(text);
			}

		};
		reader.onerror = () => alert('Bad File');
		reader.readAsText(fileInput);
	};

	render() {
		const {characterList} = this.props;
		const {characters} = this.state;
		return (
			<div className='align-self-end align-self-middle'>
				<Row>
					<Button
						className='m-2 align-middle'
						onClick={this.generateExport}>Export Selected </Button>
					{' '}
					<Label for='import' className='btn-secondary py-2 px-3 m-2 align-middle rounded'>
						Import File
					</Label>
					<Input
						type='file'
						accept='.json'
						onChange={this.handleFile}
						id='import'
						hidden/>
				</Row>
				<div>
					<Row>
						<Input type="checkbox"
							   value='all'
							   name={'characters'}
							   checked={characters.length === Object.keys(characterList).length}
							   onChange={this.handleChange}
						/>{' '} <h5 className='my-auto'>All Characters</h5>
					</Row>
					<Row>
						{Object.keys(characterList).sort().map(item =>
							<Col md='4' key={item}>
								<Card className='m-2 w-100'>
									<CardHeader>
										<CardText className='ml-2'>
											<Input type='checkbox'
												   checked={characters.includes(item)}
												   value={item}
												   name={'characters'}
												   onChange={this.handleChange}
											/> {' '}<strong>{characterList[item]}</strong>
										</CardText>
									</CardHeader>
								</Card>
							</Col>
						)}
					</Row>
				</div>
				<div>
					<Row>
						<Input type="checkbox"
							   value='all'
							   name={'customData'}
							   checked={customDataTypes.every(type => this.state[type].length === (this.props[type] ? Object.keys(this.props[type]).length : 0))}
							   onChange={this.handleChange}
						/>{' '} <h5 className='my-auto'>All Custom Data</h5>
					</Row>
					<Row>
						{customDataTypes.sort().map(type =>
							this.props[type] &&
							<Col md='4' key={type} className='my-1'>
								<Card className='m-2 w-100 h-100'>
									<CardHeader>
										<CardText className='ml-2'>
											<Input type='checkbox'
												   checked={this.state[type].length > 0 && Object.keys(this.props[type]).every(key => this.state[type].includes(key))}
												   value={type}
												   onChange={this.handleChange}
											/> {' '}<strong>{type}</strong>
										</CardText>
									</CardHeader>
									<CardBody key={type} className='py-2 ml-4'>
										{Object.keys(this.props[type]).sort().map(key =>
											<CardText key={key}>
												<Input type='checkbox'
													   checked={this.state[type].includes(key)}
													   id={key}
													   value={type}
													   onChange={this.handleChange}/> {' '}{this.props[type][key].name ? this.props[type][key].name : key}
											</CardText>
										)}
									</CardBody>
								</Card>
							</Col>
						)}
					</Row>
				</div>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		characterList: state.characterList,
		user: state.user,
		customArchetypes: state.customArchetypes,
		customArchetypeTalents: state.customArchetypeTalents,
		customArmor: state.customArmor,
		customCareers: state.customCareers,
		customGear: state.customGear,
		customMotivations: state.customMotivations,
		customSettings: state.customSettings,
		customSkills: state.customSkills,
		customTalents: state.customTalents,
		customVehicles: state.customVehicles,
		customWeapons: state.customWeapons,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({importCharacter, importCustomData, addDataSet}, dispatch);

export const ImportExport = connect(mapStateToProps, matchDispatchToProps)(ImportExportComponent);
