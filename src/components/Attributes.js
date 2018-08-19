import React from 'react';
import {connect} from 'react-redux';
import {Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import * as selectors from '../selectors';

class AttributesComponent extends React.Component {
	state = {currentStrain: this.props.currentStrain, currentWound: this.props.currentWound};

	componentWillReceiveProps(nextProps) {
		this.setState({currentStrain: nextProps.currentStrain, currentWound: nextProps.currentWound});
	}

	render() {
		const {woundThreshold, strainThreshold, totalSoak, totalDefense, totalEncumbrance, encumbranceLimit} = this.props;
		const {currentStrain, currentWound} = this.state;
		return (
			<div className='w-100'>
				<Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
				<hr/>
				<Row className='my-2 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>WOUNDS</Row>
						<Row className='attributeValue' style={{left: '63%'}}>
							{woundThreshold} {' | '}
							<Input type='number'
								   style={{fontSize: '20px', width: '35px', height: '25px'}}
								   name='currentWound'
								   maxLength='2'
								   className='py-0 px-1 m-auto'
								   onChange={(event) => this.setState({currentWound: +event.target.value})}
								   onBlur={() => this.props.changeData(currentWound, 'currentWound')}
								   value={currentWound > 0 ? currentWound : ''}/>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>STRAIN</Row>
						<Row className='attributeValue' style={{left: '63%'}}>
							{strainThreshold} {' | '}
							<Input type='number'
								   style={{fontSize: '20px', width: '35px', height: '25px'}}
								   name='currentStrain'
								   maxLength='2'
								   className='py-0 px-1 m-auto'
								   onChange={(event) => this.setState({currentStrain: +event.target.value})}
								   onBlur={() => this.props.changeData(currentStrain, 'currentStrain')}
								   value={currentStrain > 0 ? currentStrain : ''}/>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/SingleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>SOAK</Row>
						<Row className='attributeValue'>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/Defense.png'} alt='' className='png'/>
						<Row className='attributeValue'>{`${totalDefense.ranged}  |  ${totalDefense.melee}`}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={'/images/png/DoubleAttribute.png'} alt='' className='png'/>
						<Row className='attributeTitle'>ENCUMBRANCE</Row>
						<Row
							className={`attributeValue text-${totalEncumbrance > encumbranceLimit ? 'danger' : 'dark'}`}>{`${encumbranceLimit}  |   ${totalEncumbrance}`}</Row>
					</div>
				</Row>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		woundThreshold: selectors.woundThreshold(state),
		strainThreshold: selectors.strainThreshold(state),
		totalSoak: selectors.totalSoak(state),
		totalDefense: selectors.totalDefense(state),
		totalEncumbrance: selectors.totalEncumbrance(state),
		encumbranceLimit: selectors.encumbranceLimit(state),
		currentWound: state.currentWound,
		currentStrain: state.currentStrain,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Attributes = connect(mapStateToProps, matchDispatchToProps)(AttributesComponent);