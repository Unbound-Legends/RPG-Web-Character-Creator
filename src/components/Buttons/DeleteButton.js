import React from 'react';
import {Button} from 'reactstrap';

export class DeleteButton extends React.Component {
	state = {confirmation: false};

	confirmDelete = () => {
		this.setState({confirmation: true});
		this.timer = setTimeout(() => this.setState({confirmation: false}), 2000);
	};

	componentWillUnmount() {
		clearTimeout(this.timer)
	}

	render() {
		if (this.state.confirmation) {
			return <Button {...this.props} className="btn btn-danger">✓</Button>
		}
		return <Button className='btn btn-outline-danger' onClick={this.confirmDelete}>X</Button>
	}
}