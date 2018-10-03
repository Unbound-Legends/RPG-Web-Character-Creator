import clone from 'clone';
import {omit} from 'lodash-es';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {changeCustomData} from '../../actions';
import {Fragment} from './';

class CustomMotivationsComponent extends React.Component {
	state = {type: '', name: '', description: '', mode: 'add'};

	initState = () => {
		this.setState({type: '', name: '', description: '', mode: 'add'});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleSubmit = (event) => {
		const {customMotivations, changeCustomData} = this.props;
		const {name, type, description} = this.state;
		let obj = clone(customMotivations);
		obj[type] = {[name]: description};
		changeCustomData(obj, 'customMotivations');
		this.initState();
		event.preventDefault();
	};

	handleDelete = (event) => {
		const {customMotivations, changeCustomData} = this.props;
		let type = event.target.getAttribute('type');
		let obj = clone(customMotivations);
		obj[type] = omit(obj[type], event.target.name);
		changeCustomData(obj, 'customMotivations', false);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customMotivations} = this.props;
		const type = event.target.getAttribute('type');
		const name = event.target.name;
		this.setState({
			name: name,
			type: event.target.getAttribute('type'),
			description: customMotivations[type][name],
			mode: 'edit',
		});
	};

	render() {
		const {customMotivations, motivations} = this.props;
		const {name, type, description, mode} = this.state;
		return (
			<div>
				<Fragment type='name' value={name} mode={mode} handleChange={(event) => this.setState({name: event.target.value})}/>

				<Fragment type='inputSelect' name='type' value={type} array={Object.keys(motivations)}
						  handleChange={(event) => this.setState({type: event.target.value})}/>

				<Fragment type='text' value={description} mode={mode} handleChange={(event) => this.setState({description: event.target.value})}/>

				<ControlButtonSet mode={this.state.mode} type={'motivation'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState} disabled={name === '' || type === ''}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th>TYPE</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{Object.keys(customMotivations).map(type =>
						Object.keys(customMotivations[type]).map(name =>
							<tr key={type + name}>
								<td>
									{name}
								</td>
								<td>
									{type}
								</td>
								<td>
									<Button name={name} type={type} onClick={this.handleEdit}>Edit</Button>
								</td>
								<td>
									<DeleteButton name={name} type={type} onClick={this.handleDelete}/>
								</td>
							</tr>
						)
					)}
					</tbody>
				</Table>
			</div>
		)
			;
	}
}

const mapStateToProps = state => {
	return {
		customMotivations: state.customMotivations,
		motivations: state.motivations,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeCustomData}, dispatch);

export const CustomMotivations = connect(mapStateToProps, matchDispatchToProps)(CustomMotivationsComponent);
