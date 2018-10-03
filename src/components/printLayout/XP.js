import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import * as images from '../../images';
import {totalXP, usedXP} from '../../selectors';

class Component extends React.Component {

	render() {
		const {totalXP, usedXP} = this.props;
		return (
			<div className='break-after'>
				<Row className='justify-content-between'>
					<div className='imageBox xpBox totalXP'>
						<img src={images.CRB.TotalXp} alt='' className='svg'/>
						<Row className='xpValue'>{totalXP}</Row>
					</div>

					<div className='imageBox xpBox availableXP'>
						<img src={images.CRB.AvailableXp} alt='' className='svg'/>
						<Row className='xpValue'>{totalXP - usedXP}</Row>
					</div>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		totalXP: totalXP(state),
		usedXP: usedXP(state),
	};
};

export const XP = connect(mapStateToProps)(Component);