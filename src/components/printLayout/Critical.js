import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {criticalText} from '../../selectors';
import {Description} from '../index';

class Component extends React.Component {

	render() {
		const {critical} = this.props;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>CRITICAL INJURES</h5></Row>
				<hr/>
				{critical.map((critRoll, index) =>
					<Row className='my-2' key={index}>
						<Col sm='2' className='text-right'>
							<b>{critRoll}:</b>
						</Col>
						<Col>
							<Description text={criticalText(critRoll)}/>
						</Col>
						<hr/>
					</Row>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		critical: state.critical,
	};
};

export const Critical = connect(mapStateToProps)(Component);