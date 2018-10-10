import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import * as images from '../images';
import {totalXP, usedXP} from '../selectors';
import {XPPopup} from './';

class XPBoxesComponent extends React.Component {
	state = {modal: false};

	render() {
		const {totalXP, usedXP, theme} = this.props;
		return (
			<div>
				<div className={`imageBox xpBox totalXP`} onClick={() => this.setState({modal: true})}>
					<img src={images[theme].TotalXp} alt='' className='svg'/>
					<Row className={`xpValue xpValue-${theme}`}>{totalXP}</Row>
				</div>

				<div className={`imageBox xpBox availableXP availableXP-${theme}`} onClick={() => this.setState({modal: true})}>
					<img src={images[theme].AvailableXp} alt='' className='svg'/>

					<Row className={`xpValue xpValue-${theme}`}>{totalXP - usedXP}</Row>
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
		theme: state.theme,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({changeData}, dispatch);

export const XPBoxes = connect(mapStateToProps, matchDispatchToProps)(XPBoxesComponent);