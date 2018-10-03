import clone from 'clone';
import React from 'react';
import {connect} from 'react-redux';
import {Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class CharacterDescriptionComponent extends React.Component {
	state = {
		gender: this.props.description.gender ? this.props.description.gender : '',
		age: this.props.description.age ? this.props.description.age : '',
		height: this.props.description.height ? this.props.description.height : '',
		build: this.props.description.build ? this.props.description.build : '',
		hair: this.props.description.hair ? this.props.description.hair : '',
		eyes: this.props.description.eyes ? this.props.description.eyes : '',
		features: this.props.description.features ? this.props.description.features : '',
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			gender: nextProps.description.gender ? nextProps.description.gender : '',
			age: nextProps.description.age ? nextProps.description.age : '',
			height: nextProps.description.height ? nextProps.description.height : '',
			build: nextProps.description.build ? nextProps.description.build : '',
			hair: nextProps.description.hair ? nextProps.description.hair : '',
			eyes: nextProps.description.eyes ? nextProps.description.eyes : '',
			features: nextProps.description.features ? nextProps.description.features : '',
		});
	}

	handleBlur = (event) => {
		const {changeData, description} = this.props;
		let obj = clone(description);
		obj[event.target.name] = this.state[event.target.name];
		changeData(obj, 'description');
		event.preventDefault();
	};

	render() {
		return (
			<div>
				<Row className='justify-content-end'><h5>CHARACTER DESCRIPTION</h5></Row>
				<hr/>
				{['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(aspect =>
					<Row key={aspect} className='my-2'>
						<b>{aspect.toLocaleUpperCase()}:</b>
						<Input value={this.state[aspect]}
							   maxLength='25'
							   name={aspect}
							   onBlur={this.handleBlur}
							   onChange={(event) => this.setState({[aspect]: event.target.value})}/>
						<hr/>
					</Row>
				)}
				<Row className='my-2'>
					<b>NOTABLE FEATURES:</b>
					<textarea onChange={(event) => this.setState({features: event.target.value})}
							  onBlur={this.handleBlur}
							  rows='12'
							  className='w-100'
							  maxLength='1000'
							  name='features'
							  value={this.state.features}/>
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