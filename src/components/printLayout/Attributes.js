import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import * as images from '../../images';
import {encumbranceLimit, strainThreshold, totalDefense, totalEncumbrance, totalSoak, woundThreshold,} from '../../selectors';

class Component extends React.Component {

	render() {
		const {woundThreshold, strainThreshold, currentWound, currentStrain, totalSoak, totalDefense, theme} = this.props;
		return (
			<div>
				<Row className='justify-content-end'>
					<div className={`header header-${theme}`}>ATTRIBUTES</div>
				</Row>
				<hr/>
				<Row className='my-2 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={images[theme].Wounds} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Wounds`}>
							<div className='mr-2 p-1'>
								{woundThreshold}
							</div>
							<div className='ml-2 p-1'>
								{currentWound}
							</div>

						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Strain} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Strain`}>
							<div className='mr-2 p-1'>
								{strainThreshold}
							</div>
							<div className='ml-2 p-1'>
								{currentStrain}
							</div>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Soak} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Soak`}>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Defense} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Defense`}>
							<div className='mr-2 p-1'>
								{totalDefense.melee}
							</div>
							<div className='ml-2 p-1'>
								{totalDefense.ranged}
							</div>
						</Row>
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
		theme: state.theme,
	};
};

export const Attributes = connect(mapStateToProps)(Component);