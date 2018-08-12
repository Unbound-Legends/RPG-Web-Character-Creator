import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {totalXP, usedXP} from '../selectors';
import {XPPopup} from './index';

class XPBoxesComponent extends React.Component {
	state = {modal: false};

	render() {
		const {totalXP, usedXP} = this.props;
		return (
			<div>
				<div className='imageBox xpBox totalXP' onClick={() => this.setState({modal: true})}>
					<img src={'/images/png/TotalXP.png'} alt='' className='png'/>
					<Row className='xpValue'>{totalXP}</Row>
				</div>

				<div className='imageBox xpBox availableXP' onClick={() => this.setState({modal: true})}>
					<img src={'/images/png/AvailableXP.png'} alt='' className='png'/>

					<Row className='xpValue'>{totalXP - usedXP}</Row>
				</div>
				<XPPopup modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>
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

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const XPBoxes = connect(mapStateToProps, matchDispatchToProps)(XPBoxesComponent);