import {cloneDeep, startCase} from 'lodash-es'
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardHeader, CardText, Col, Input, Label, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {importCharacter, importCustomData} from '../actions';
import {customDataTypes, dataTypes} from '../data/lists';
import {db} from '../firestoreDB';

class ImportExportComponent extends React.Component {
	state = {characters: [], customData: {}};

	generateFileName = () => {
		let time = new Date(Date.now())
			.toLocaleString()
			.replace(/[\s+]/g, '')
			.replace(/[\D+]/g, '_')
			.slice(0, -2);
		return `GenesysEmporiumExport_${time}.json`
	};

	generateExport = () => {
		const {characterList, user} = this.props;
		const {characters, customData} = this.state;
		new Promise(resolve => {
			let final = [];
			characters.forEach(character => {
				let file = {};
				file.name = characterList[character];
				dataTypes.forEach((type, index) => {
					db.doc(`users/${user}/data/characters/${character}/${type}/`).get()
						.then(doc => {
							if (doc.exists) file[type] = cloneDeep(doc.data().data);
							if (index + 1 >= dataTypes.length) final.push({character: file});
							if (final.length === characters.length + (Object.keys(customData).length > 0 ? 1 : 0)) resolve(final);
						}, err => console.log(`Encountered error: ${err}`));
				});
			});
			let file = {};
			Object.keys(customData).forEach((type, index) => {
				file[type] = {};
				db.doc(`users/${user}/customData/${type}/`).get()
					.then(doc => {
						if (doc.exists) {
							let data = cloneDeep(doc.data().data);
							customData[type].forEach(item => {
								if (data[item]) {
									file[type][item] = data[item]
								}
							})
						}
						if (index + 1 >= Object.keys(customData).length) final.push({customData: file});
						if (final.length === characters.length + (Object.keys(customData).length > 0 ? 1 : 0)) resolve(final);
					}, err => console.log(`Encountered error: ${err}`));

			});

		}).then(finalExport => {
			let element = document.createElement('a');
			let file = new Blob([JSON.stringify(finalExport)], {type: "application/json"});
			element.href = URL.createObjectURL(file);
			element.download = this.generateFileName();
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		});
	};

	handleChange = (event) => {
		const {characterList} = this.props;
		const {characters, customData} = this.state;
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

		if (name === 'customData') {
			let key = event.target.id;
			let obj = cloneDeep(customData);
			switch (true) {
				case value === 'all':
					if (customDataTypes.every(type => Object.keys(this.props[type]).every(key => customData[type] ? customData[type].includes(key) : false))) obj = {};
					else customDataTypes.forEach(type => obj[type] = Object.keys(this.props[type]));
					break;
				case customDataTypes.includes(value) && !key:
					if (Object.keys(this.props[value]).every(key => obj[value] ? obj[value].includes(key) : false)) obj[value] = [];
					else obj[value] = Object.keys(this.props[value]);
					break;
				default:
					if (!obj[value]) obj[value] = [];
					if (obj[value].includes(key)) obj[value].splice(customData[value].indexOf(key), 1);
					else obj[value].push(key);
			}
			this.setState({customData: obj})
		}
	};

	handleFile = (event) => {
		let fileInput = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (event) => {
			try {
				let file = JSON.parse(event.target.result);
				if (!Array.isArray(file)) file = [file];
				file.forEach(data => {
					switch (Object.keys(data)[0]) {
						case 'character':
							this.props.importCharacter(data.character);
							alert(`${data.character.name} Imported!`);
							break;
						case 'customDataSet':
							this.props.importCustomData(data.customDataSet);
							alert(`${data.customDataSet.name} Imported!`);
							break;
						case 'customData':
							this.props.importCustomData(data.customData);
							alert(`Custom Data Imported!`);
							break;
						default:
							alert('No Data Imported.');
							break;
					}
				});

			} catch (e) {
				alert(e);
			}
		};
		reader.onerror = () => alert('Bad File');
		reader.readAsText(fileInput);
	};

	render() {
		const {characterList} = this.props;
		const {characters, customData} = this.state;
		return (
			<div className='align-self-end align-self-middle'>
				<Row>
					<Button
						className='m-2 align-middle'
						onClick={this.generateExport}>Export Selected </Button>
					{' '}
					<Label for='import' className='btn-secondary py-2 px-3 m-2 align-middle rounded'>Import
						File</Label>
					<Input
						type='file'
						accept='.json'
						onChange={this.handleFile}
						id='import'
						hidden/>
				</Row>
				{['characters', 'customData'].map(type => {
					let list = {};
					if (type === 'characters') list = {...characterList};
					if (type === 'customData') customDataTypes.forEach(key => list[key] = startCase(key));
					return (
						<div key={type}>
							<Row>
								<Input type="checkbox"
									   value='all'
									   name={type}
									   checked={type === 'characters' ? characters.length === Object.keys(list).length : customDataTypes.every(type => Object.keys(this.props[type]).every(key => customData[type] ? customData[type].includes(key) : false))}
									   onChange={this.handleChange}
								/>{' '} <h5 className='my-auto'>All {startCase(type)}</h5>
							</Row>
							<Row>
								{Object.keys(list).sort().map(item =>
									type === 'customData' && 0 >= Object.keys(this.props[item]).length ? '' :
										<Col md='4' key={item}>
											<Card className='m-2 w-100'>
												<CardHeader>
													<CardText className='ml-2'>
														<Input type='checkbox'
															   checked={type === 'characters' ? characters.includes(item) : customData[item] ? Object.keys(this.props[item]).every(key => customData[item].includes(key)) : false}
															   value={item}
															   name={type}
															   onChange={this.handleChange}
														/> {' '}<strong>{list[item]}</strong>
													</CardText>
												</CardHeader>

												{type === 'customData' && this.props[item] && Object.keys(this.props[item]).length > 0 &&
												<CardBody key={item} className='py-2 ml-4'>
													{Object.keys(this.props[item]).sort().map(key =>
														<CardText key={key}>
															<Input type='checkbox'
																   checked={customData[item] ? customData[item].includes(key) : false}
																   id={key}
																   value={item}
																   name={type}
																   onChange={this.handleChange}/> {' '}{this.props[item][key].name ? this.props[item][key].name : key}
														</CardText>
													)}
												</CardBody>
												}
											</Card>
										</Col>
								)}
							</Row>
						</div>
					)
				})}
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
		customSkills: state.customSkills,
		customTalents: state.customTalents,
		customWeapons: state.customWeapons,
		customSettings: state.customSettings,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({importCharacter, importCustomData}, dispatch);

export const ImportExport = connect(mapStateToProps, matchDispatchToProps)(ImportExportComponent);
