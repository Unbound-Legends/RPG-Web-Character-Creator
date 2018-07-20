import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {characteristics} from '../../selectors';
import {chars} from '../../data/lists';

class Component extends React.Component {

	render() {
		const {characteristics} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>CHARACTERISTICS</h5></Row>
				<hr/>
				<Row className='justify-content-center'>
					{chars.map((stat) =>
						<div className='imageBox' key={stat}>
							<img src={'/images/png/Characteristic.png'} alt='' className='png'/>

							<Row className='characteristicValue'>{characteristics[stat]}</Row>
							<Row className='characteristicTitle'>{stat}</Row>
						</div>
					)}
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		characteristics: characteristics(state),
	};
}

export const Characteristics = connect(mapStateToProps)(Component);