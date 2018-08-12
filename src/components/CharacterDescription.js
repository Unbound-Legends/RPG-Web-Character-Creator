import React from 'react';
import {connect} from 'react-redux';
import {Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

const clone = require('clone');

class CharacterDescriptionComponent extends React.Component {
	state = {description: this.props.description};

	componentWillReceiveProps(nextProps) {
		this.setState({description: nextProps.description});
	}

	handleChange = (event) => {
		let obj = clone(this.state.description);
		obj[event.target.name] = event.target.value;
		this.setState({description: obj});
		event.preventDefault();
	};

	handleBlur = (event) => {
		const {changeData, description} = this.props;
		let obj = clone(description);
		obj[event.target.name] = this.state.description[event.target.name];
		changeData(obj, 'description');
		event.preventDefault();
	};

	render() {
		const {description} = this.state;
		return (
			<div className='w-100 m-1'>
				<Row className='justify-content-end'><h5>CHARACTER DESCRIPTION</h5></Row>
				<hr/>
				{['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(aspect =>
					<Row key={aspect} className='my-2'>
						<b>{aspect.toLocaleUpperCase()}:</b>
						<Input value={description[aspect]}
							   maxLength='25'
							   name={aspect}
							   onBlur={this.handleBlur}
							   onChange={this.handleChange}/>
						<hr/>
					</Row>
				)}
				<Row className='my-2'>
					<b>NOTABLE FEATURES:</b>
					<textarea onChange={this.handleChange}
							  onBlur={this.handleBlur}
							  rows='12'
							  className='w-100'
							  maxLength='1000'
							  name='features'
							  value={description.features ? description.features : ''}/>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const CharacterDescription = connect(mapStateToProps, matchDispatchToProps)(CharacterDescriptionComponent);