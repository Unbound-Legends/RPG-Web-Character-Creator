import clone from 'clone';
import React from 'react';
import {connect} from 'react-redux';
import {Col, Input, Label, Row} from 'reactstrap';
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
		const {theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>CHARACTER DESCRIPTION</div>
				</Row>
				<hr/>
				{['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(aspect =>
					<Row key={aspect} className='align-items-center'>
						<Label for={aspect} sm={2}>
							<b>{aspect.toLocaleUpperCase()}</b>
						</Label>
						<Col md='10' className='align-self-center'>
							<Input value={this.state[aspect]}
								   id={aspect}
								   maxLength='25'
								   bsSize='sm'
								   name={aspect}
								   onBlur={this.handleBlur}
								   onChange={(event) => this.setState({[aspect]: event.target.value})}/>
						</Col>
						<hr/>
					</Row>
				)}
				<Row>
					<Label sm={6} for='features'><b>NOTABLE FEATURES</b></Label>
					<Col sm={12}>
						<Input onChange={(event) => this.setState({features: event.target.value})}
							   onBlur={this.handleBlur}
							   type='textarea'
							   rows='12'
							   className='w-100 my-auto'
							   maxLength='1000'
							   name='features'
							   id='features'
							   value={this.state.features}/>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		description: state.description,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const CharacterDescription = connect(mapStateToProps, matchDispatchToProps)(CharacterDescriptionComponent);