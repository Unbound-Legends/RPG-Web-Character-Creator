import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import {talentCount} from '../reducers';
import {TalentBlock} from './index';

class Talents extends React.Component {

    render() {
        const {masterTalents} = this.props;
        return (
            <Col lg='12'>
                <Row className='justify-content-end'><h5>TALENTS</h5></Row>
                <hr/>
                {Object.keys(masterTalents).map((row) =>
                    <Row key={row} className=''>
                        {Object.keys(masterTalents[row]).map((tier) =>
                            <TalentBlock key={row + tier}
                                         row={+row}
                                         tier={+tier}
                                         talentKey={masterTalents[row][tier]}/>
                        )}
                    </Row>
                )}
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        masterTalents: state.masterTalents,
        talents: state.talents,
        talentCount: talentCount(state),
    };
}

export default connect(mapStateToProps)(Talents);
