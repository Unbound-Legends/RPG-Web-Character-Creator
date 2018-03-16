import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {totalXP, usedXP} from '../reducers';
import {changeData} from '../actions';
import {bindActionCreators} from 'redux';
import {XPPopup} from './index';

class XPTotal extends React.Component {
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

function mapStateToProps(state) {
    return {
        totalXP: totalXP(state),
        usedXP: usedXP(state),

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(XPTotal);