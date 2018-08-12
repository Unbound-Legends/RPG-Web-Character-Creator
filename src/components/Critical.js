import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {criticalText} from '../selectors';
import {Description} from './index';

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

	removeCritical = () => {
		let newArr = [...this.props.critical];
		newArr.splice(this.state.modal, 1);
		this.props.changeData(newArr, 'critical');
		this.setState({modal: false});
	};

	render() {
		const {value, modal} = this.state;
		const {critical} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>CRITICAL INJURES</h5></Row>
				<hr/>
				<Row className='my-2'>
					<b className='my-auto'>Add a critical:</b>
					<Input className='w-10 mx-2' type='number' name='critical' value={value > 0 ? value : ''}
						   onChange={this.handleChange}/>
					<Button size='sm' onClick={this.handleSubmit}>Add Critical</Button>
				</Row>
				{critical.map((critRoll, index) =>
					<Row className='my-2' key={index} onClick={() => this.setState({modal: index})}>
						<Col xs='1' className='text-right p-0'><b>{critRoll}:</b></Col>
						<Col className='p-0'><Description text={criticalText(critRoll)}/></Col>
						<hr/>
					</Row>
				)}
				<Modal isOpen={modal !== false} toggle={() => this.setState({modal: false})}>
					<ModalHeader toggle={() => this.setState({modal: false})}>Remove Critical Injury?</ModalHeader>
					<ModalBody>
						<Row>
							<Col xs='1' className='text-right p-0'><b>{critical[modal]}:</b></Col>
							<Col className='p-0'><Description text={criticalText(critical[modal])}/></Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button onClick={this.removeCritical}>Remove Critical</Button>
						<Button onClick={() => this.setState({modal: false})}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		critical: state.critical,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Critical = connect(mapStateToProps, matchDispatchToProps)(CriticalComponent);
