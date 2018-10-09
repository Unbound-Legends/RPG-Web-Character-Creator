import React from 'react';
import {connect} from 'react-redux';
import {Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import * as images from '../images';
import * as selectors from '../selectors';

class AttributesComponent extends React.Component {
	state = {currentStrain: this.props.currentStrain, currentWound: this.props.currentWound};

	componentWillReceiveProps(nextProps) {
		this.setState({currentStrain: nextProps.currentStrain, currentWound: nextProps.currentWound});
	}

	render() {
		const {woundThreshold, strainThreshold, totalSoak, totalDefense, theme} = this.props;
		const {currentStrain, currentWound} = this.state;
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
							<Input type='number'
								   name='currentWound'
								   maxLength='2'
								   className='attributeInput ml-2'
								   onChange={(event) => this.setState({currentWound: +event.target.value})}
								   onBlur={() => this.props.changeData(currentWound, 'currentWound')}
								   value={currentWound > 0 ? currentWound : ''}/>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Strain} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Strain`}>
							<div className='mr-2 p-1'>
								{strainThreshold}
							</div>
							<Input type='number'
								   name='currentStrain'
								   maxLength='2'
								   className='attributeInput ml-2'
								   onChange={(event) => this.setState({currentStrain: +event.target.value})}
								   onBlur={() => this.props.changeData(currentStrain, 'currentStrain')}
								   value={currentStrain > 0 ? currentStrain : ''}/>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Soak} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Soak`}>{totalSoak}</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images[theme].Defense} alt='' className='svg'/>
						<Row className={`attributeValue attributeValue-${theme}-Defense`}>
							<div className='mr-2'>
								{totalDefense.ranged}
							</div>
							<div className='ml-2'>
								{totalDefense.melee}
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
		woundThreshold: selectors.woundThreshold(state),
		strainThreshold: selectors.strainThreshold(state),
		totalSoak: selectors.totalSoak(state),
		totalDefense: selectors.totalDefense(state),
		currentWound: state.currentWound,
		currentStrain: state.currentStrain,
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Attributes = connect(mapStateToProps, matchDispatchToProps)(AttributesComponent);