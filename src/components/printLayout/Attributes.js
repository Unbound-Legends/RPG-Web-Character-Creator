import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {encumbranceLimit, strainThreshold, totalDefense, totalEncumbrance, totalSoak, woundThreshold,} from "../../selectors";

class Component extends React.Component {

	render() {
		const {woundThreshold, strainThreshold, currentWound, currentStrain, totalSoak, totalDefense} = this.props;
		return (
			<div>
				<Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
				<hr/>
				<Row className='my-1 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={`/images/svg/blocks/Wounds.svg`} alt='' className='svg'/>
						<Row className='attributeValue'>
							{`${woundThreshold}   |   ${currentWound}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={`/images/svg/blocks/Strain.svg`} alt='' className='svg'/>
						<Row className='attributeValue'>
							{`${strainThreshold}   |   ${currentStrain}`}
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={`/images/svg/blocks/Soak.svg`} alt='' className='svg'/>
						<Row className='attributeValue'>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={`/images/svg/blocks/Defense.svg`} alt='' className='svg'/>
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