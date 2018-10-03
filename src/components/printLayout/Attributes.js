import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import * as images from '../../images';
import {encumbranceLimit, strainThreshold, totalDefense, totalEncumbrance, totalSoak, woundThreshold,} from '../../selectors';

class Component extends React.Component {

	render() {
		const {woundThreshold, strainThreshold, currentWound, currentStrain, totalSoak, totalDefense} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
				<hr/>
				<Row className='my-1 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={images.CRB.Wounds} alt='' className='svg'/>
						<Row className='attributeValue'>
							{`${woundThreshold}   |   ${currentWound}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images.CRB.Strain} alt='' className='svg'/>
						<Row className='attributeValue'>
							{`${strainThreshold}   |   ${currentStrain}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images.CRB.Soak} alt='' className='svg'/>
						<Row className='attributeValue'>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images.CRB.Defense} alt='' className='svg'/>
						<Row className='attributeValue'>{`${totalDefense.ranged}  |  ${totalDefense.melee}`}</Row>
					</div>
				</Row>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		woundThreshold: woundThreshold(state),
		strainThreshold: strainThreshold(state),
		totalSoak: totalSoak(state),
		totalDefense: totalDefense(state),
		totalEncumbrance: totalEncumbrance(state),
		encumbranceLimit: encumbranceLimit(state),
		currentWound: state.currentWound,
		currentStrain: state.currentStrain,
	};
};

export const Attributes = connect(mapStateToProps)(Component);