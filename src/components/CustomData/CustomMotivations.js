import React from 'react';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {ControlButtonSet, DeleteButton} from '../';
import {addDataSet, modifyDataSet, removeDataSet} from '../../redux/actions';
import {Fragment} from './';

const Type = 'customMotivations';


class CustomMotivationsComponent extends React.Component {
	state = {};

	componentWillMount = () => this.initState();

	initState = () => {
		this.setState({type: '', name: '', description: '', mode: 'add'});
	};

	handleClose = () => {
		this.initState();
		this.props.handleClose();
	};

	handleDuplicate = (event) => {
		const {customMotivations} = this.props;
		// noinspection JSUnusedLocalSymbols
		const {id, ...data} = {...customMotivations[event.target.name]};
		this.props.addDataSet(Type, {...data, name: `${data.name} (copy)`});
		event.preventDefault();
	};

	handleSubmit = () => {
		const {mode, ...data} = this.state;
		if (mode === 'add') this.props.addDataSet(Type, data);
		else if (mode === 'edit') this.props.modifyDataSet(Type, data);
		this.initState();
	};

	handleDelete = (event) => {
		this.props.removeDataSet(Type, this.props[Type][event.target.name].id);
		event.preventDefault();
	};

	handleEdit = (event) => {
		const {customMotivations} = this.props;
		// noinspection JSUnusedLocalSymbols
		const data = customMotivations[event.target.name];
		this.setState({
			...data,
			mode: 'edit',
		});
	};

	render() {
		const {customMotivations} = this.props;
		const {name, type, description, mode} = this.state;
		return (
			<div>
				<Fragment type='text' title='name' value={name} mode={mode} handleChange={(event) => this.setState({name: event.target.value})}/>

				<Fragment type='inputSelect' name='type' value={type} array={['Strength', 'Flaw', 'Desire', 'Fear']}
						  handleChange={(event) => this.setState({type: event.target.value})}/>

				<Fragment type='description' value={description} mode={mode}
						  handleChange={(event) => this.setState({description: event.target.value})}/>

				<ControlButtonSet mode={this.state.mode} type={'motivation'} handleSubmit={this.handleSubmit} onEditSubmit={this.handleSubmit}
								  onEditCancel={this.initState} disabled={name === '' || type === ''}/>

				<Table>
					<thead>
					<tr>
						<th>NAME</th>
						<th>TYPE</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{Object.keys(customMotivations).map(key =>
						<tr key={key}>
								<td>
									{customMotivations[key].name}
								</td>
								<td>
									{customMotivations[key].type}
								</td>
								<td>
									<ButtonGroup>
										<Button name={key} onClick={this.handleEdit}>Edit</Button>
										<Button name={key} onClick={this.handleDuplicate}>Duplicate</Button>
										<DeleteButton name={key} onClick={this.handleDelete}/>
									</ButtonGroup>
								</td>

							</tr>
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
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({removeDataSet, addDataSet, modifyDataSet}, dispatch);

export const CustomMotivations = connect(mapStateToProps, matchDispatchToProps)(CustomMotivationsComponent);
