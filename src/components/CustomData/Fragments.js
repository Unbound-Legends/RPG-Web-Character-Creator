import {startCase} from 'lodash-es';
import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {Button, Col, Input, Label, Row} from 'reactstrap';
import {Description} from '../Description';

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
		const {type, settings, setState, setting, mode, handleChange, value = '', array, nameObj, object, handleClear, blankText = '', blankOption = true, name,} = this.props;
		switch (type) {
			case 'name':
				return <Input type='text' bsSize='sm' value={value} maxLength='25' onChange={handleChange}
							  disabled={mode === 'edit'}/>;
			case 'text':
				return <Input type='text' bsSize='sm' value={value} maxLength='25' onChange={handleChange}/>;
			case 'number':
				return <Input type='number' bsSize='sm' value={value} maxLength='7' onChange={handleChange}/>;
			case 'list':
				return (
					<div style={{display: 'inline-flex'}}>
						<Description text={this.buildList(array, object, nameObj)}/>
						{array.length > 0 &&
						<Button className='btn-outline-warning ml-2' onClick={handleClear}>Clear</Button>}
					</div>
				);
			case 'setting':
				return <Typeahead
					multiple={true}
					options={Object.values(settings)}
					selected={setting}
					placeholder='Choose a Setting...'
					clearButton={true}
					onChange={(selected) => setState(selected.includes('All') ? ['All'] : selected)}/>;
			case 'description':
				return (<Input onChange={handleChange}
							   type='textarea'
							   name='description'
							   rows='8'
							   maxLength='1000'
							   className='w-100'
							   value={value}/>
				);
			case 'inputSelect':
				return (<Input type='select' bsSize='sm' value={value} name={name} onChange={handleChange}>
					{blankOption && <option value=''>{blankText}</option>}
					{array.sort().map(key =>
						<option value={key}
								key={key}>{nameObj ? nameObj[key.toString()] ? nameObj[key.toString()].name : startCase(key) : startCase(key)}</option>
					)}
				</Input>);
			default:
				break;
		}
	};

	render() {
		const {name, type, title = name ? name : type} = this.props;
		return (
			<Row className='my-2 '>
				<Label for={title} sm='2' className={title === 'description' ? 'mt-0' : 'my-auto'}><b>{startCase(title)}</b></Label>
				<Col id={title}>
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