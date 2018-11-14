import React from 'react';
import {connect} from 'react-redux';
import {Button, Input, Row, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {criticalText} from '../selectors';
import {DeleteButton, Description} from './index';

class CriticalComponent extends React.Component {
	state = {value: '', modal: false};

	handleSubmit = (event) => {
		let newArr = [...this.props.critical];
		let value = this.state.value;
		if (value !== '') {
			newArr.push(value);
			this.props.changeData(newArr, 'critical');
		}
		this.setState({value: ''});
		event.preventDefault();
	};

	handleChange = (event) => {
		let number = +event.target.value.replace(/\D+/g, '');
		if (!(number > 999)) this.setState({value: number});
		event.preventDefault();
	};

	handleDelete = (event) => {
		let newArr = [...this.props.critical];
		newArr.splice(event.target.value, 1);
		this.props.changeData(newArr, 'critical');
		this.setState({modal: false});
	};

	render() {
		const {value} = this.state;
		const {critical, theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>CRITICAL INJURES</div>
				</Row>
				<hr/>
				<Table className='bg-light'>
					<thead>
					<tr>
						<th>CRITICAL</th>
						<th>DESCRIPTION</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{critical.map((critRoll, index) =>
						<tr className='my-2' key={index}>
							<td><b>{critRoll}:</b></td>
							<td><Description text={criticalText(critRoll)}/></td>
							<td><DeleteButton value={index} onClick={this.handleDelete}/></td>
						</tr>
					)}
					</tbody>
				</Table>
				<Row className='my-2 justify-content-end'>
					<b className='my-auto'>Add Critical:</b>
					<Input className='w-20 mx-2' bsSize='sm' type='number' name='critical' value={value > 0 ? value : ''}
						   onChange={this.handleChange}/>
					<Button size='sm' onClick={this.handleSubmit}>Add</Button>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		critical: state.critical,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Critical = connect(mapStateToProps, matchDispatchToProps)(CriticalComponent);
