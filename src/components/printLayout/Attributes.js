import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {encumbranceLimit, strainThreshold, totalDefense, totalEncumbrance, totalSoak, woundThreshold,} from "../../selectors";

class Component extends React.Component {

	render() {
		const {woundThreshold, strainThreshold, currentWound, currentStrain, totalSoak, totalDefense, totalEncumbrance, encumbranceLimit} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
				<hr/>
				<Row className='my-1 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>WOUNDS</Row>
						<Row className='attributeValue'>
							{`${woundThreshold}   |   ${currentWound}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>STRAIN</Row>
						<Row className='attributeValue'>
							{`${strainThreshold}   |   ${currentStrain}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>SOAK</Row>
						<Row className='attributeValue'>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>DEFENSE</Row>
						<Row className='attributeValue'>{`${totalDefense.ranged}  |  ${totalDefense.melee}`}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>ENCUMBRANCE</Row>
						<Row className='attributeValue'>{`${encumbranceLimit}  |   ${totalEncumbrance}`}</Row>
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