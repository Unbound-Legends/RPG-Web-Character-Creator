import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {chars} from '../../data/lists';
import {characteristics} from '../../selectors';

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
							<img src={`/images/svg/blocks/${stat}.svg`} alt='' className='svg'/>

							<Row className='characteristicValue'>{characteristics[stat]}</Row>
						</div>
					)}
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		characteristics: characteristics(state),
	};
};

export const Characteristics = connect(mapStateToProps)(Component);