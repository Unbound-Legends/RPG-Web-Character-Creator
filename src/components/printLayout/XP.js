import React from 'react';
import {connect} from 'react-redux';
import {Row} from 'reactstrap';
import {totalXP, usedXP} from '../../reducers';

class XP extends React.Component {

    render() {
        const {totalXP, usedXP} = this.props;
        return (
            <div className='w-100 break-after'>
                <Row className='justify-content-between'>
                    <div className='imageBox xpBox print-totalXP'>
                        <img src={'/images/png/TotalXP.png'} alt='' className='png'/>
                        <Row className='xpValue'>{totalXP}</Row>
                    </div>

                    <div className='imageBox xpBox print-availableXP'>
                        <img src={'/images/png/AvailableXP.png'} alt='' className='png'/>
                        <Row className='xpValue'>{totalXP - usedXP}</Row>
                    </div>
                </Row>
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

export default connect(mapStateToProps)(XP);