import {startCase} from 'lodash-es';
import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {Button, Col, Input, Row} from 'reactstrap';

class FragmentComponent extends React.Component {

	buildList = (array, object, nameObj) => {
		if (!object) return array.map(key => nameObj[key] ? nameObj[key].name : key).sort().join(', ');
		let text = '';
		array.sort().forEach(key => {
			text += nameObj[key] ? nameObj[key].name : key;
			if (object[key] > 1) text += `(${object[key]}), `;
			else text += ', ';
		});
		return text.slice(0, -2);
	};

	buildField = () => {
		const {type, settings, setState, setting, mode, handleChange, value, array, nameObj, object, handleClear} = this.props;
		switch (type) {
			case 'description':
				return (<textarea onChange={handleChange}
								  name='description'
								  rows='8'
								  maxLength='1000'
								  className='w-100'
								  value={value}/>
				);
			case 'name':
				return (<Input type='text' value={value} name={type} maxLength='25'
							   onChange={handleChange} disabled={mode === 'edit'}/>);
			case 'setting':
				return (<Typeahead
					multiple={true}
					options={Object.values(settings)}
					name='setting'
					selected={setting}
					placeholder='Choose a Setting...'
					clearButton={true}
					onChange={(selected) => setState(selected.includes('All') ? ['All'] : selected)}/>);
			case 'characteristic':
			case 'type':
				return (<Input type='select' value={value} name={type} onChange={handleChange}>
					<option value=''/>
					{array.map(key =>
						<option value={key} key={key}>{key}</option>
					)}
				</Input>);
			case 'selectedSkills':
			case 'freeSkillRanks':
			case 'archetypeTalents':
				return (<Input type='select' value='' name={type} onChange={handleChange}>
					<option value=''/>
					{array.map((key) =>
						<option value={key} key={key}>{nameObj[key].name}</option>
					)}
				</Input>);
			case 'XP':
				return (<Input type='number' value={value} name='XP' maxLength='3'
							   onChange={handleChange}/>);
			case 'list':
				return (
					<div>{this.buildList(array, object, nameObj)} {array.length > 0 &&
					<Button className='btn-outline-warning' onClick={handleClear}>Clear</Button>}</div>
				);
			default:
				break;
		}
	};

	render() {
		const {type} = this.props;
		return (
			<Row className='mt-2'>
				<Col sm='2'><b>{startCase(type)}:</b></Col>
				<Col>
					{this.buildField()}
				</Col>
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return {
		settings: state.settings,
	};
}

export const Fragment = connect(mapStateToProps)(FragmentComponent);