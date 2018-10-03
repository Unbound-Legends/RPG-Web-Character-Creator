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
		const {woundThreshold, strainThreshold, totalSoak, totalDefense} = this.props;
		const {currentStrain, currentWound} = this.state;
		return (
			<div>
				<Row className='justify-content-end'><h5>ATTRIBUTES</h5></Row>
				<hr/>
				<Row className='my-2 justify-content-center'>
					<div className='imageBox attribute'>
						<img src={images.CRB.Wounds} alt='' className='svg'/>
						<Row className='attributeValue' style={{left: '59%'}}>
							{`${woundThreshold} |`}
							<Input type='number'
								   style={{fontSize: '1.5rem', width: '2.3rem', height: '1.8rem'}}
								   name='currentWound'
								   maxLength='2'
								   className='py-0 px-1 ml-1 my-auto d-inline-flex'
								   onChange={(event) => this.setState({currentWound: +event.target.value})}
								   onBlur={() => this.props.changeData(currentWound, 'currentWound')}
								   value={currentWound > 0 ? currentWound : ''}/>
						</Row>
					</div>
					<div className='imageBox attribute'>
						<img src={images.CRB.Strain} alt='' className='svg'/>
						<Row className='attributeValue' style={{left: '59%'}}>
							{`${strainThreshold} |`}
							<Input type='number'
								   style={{fontSize: '1.5rem', width: '2.3rem', height: '1.8rem'}}
								   name='currentStrain'
								   maxLength='2'
								   className='py-0 px-1 ml-1 my-auto d-inline-flex'
								   onChange={(event) => this.setState({currentStrain: +event.target.value})}
								   onBlur={() => this.props.changeData(currentStrain, 'currentStrain')}
								   value={currentStrain > 0 ? currentStrain : ''}/>
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
		woundThreshold: selectors.woundThreshold(state),
		strainThreshold: selectors.strainThreshold(state),
		totalSoak: selectors.totalSoak(state),
		totalDefense: selectors.totalDefense(state),
		currentWound: state.currentWound,
		currentStrain: state.currentStrain,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const Attributes = connect(mapStateToProps, matchDispatchToProps)(AttributesComponent);