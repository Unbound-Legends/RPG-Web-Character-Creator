import React from 'react';
import {connect} from 'react-redux';
import {Button, Row} from 'reactstrap';
import {chars} from '../data/lists';
import {characteristics} from '../selectors'
import {Characteristics} from './';

class ShowCharacteristicsComponent extends React.Component {
	state = {modal: false};

	render() {
		const {characteristics} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'>
					<h5>CHARACTERISTICS</h5>
					<Button color='link' className='noUnderLine p-0' onClick={() => this.setState({modal: true})}>⚙</Button>
				</Row>
				<hr/>
				<Row className='justify-content-center'>
					{chars.map(stat =>
						<div className='imageBox' key={stat}>
							<img src={'/images/png/Characteristic.png'} alt='' className='png'/>
							<Row className='characteristicValue'>{characteristics[stat]}</Row>
							<Row className='characteristicTitle'>{stat}</Row>
						</div>
					)}
				</Row>
				<Characteristics modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		characteristics: characteristics(state),
	};
};

export const ShowCharacteristics = connect(mapStateToProps)(ShowCharacteristicsComponent);
