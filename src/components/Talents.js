import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row} from 'reactstrap';
import {talentCount} from '../selectors';
import {CustomTalents, TalentBlock} from './index';

class TalentsComponent extends React.Component {
    state = {modal: false};

    render() {
        const {masterTalents} = this.props;
        return (
            <Col lg='12'>
                <Row className='justify-content-end'><h5>TALENTS</h5><Button color='link'
                                                                             className='noUnderLine p-0 mt-1'
                                                                             onClick={() => this.setState({modal: true})}>⚙</Button></Row>
                <hr/>
                {Object.keys(masterTalents).map(row =>
                    <Row key={row} className=''>
                        {Object.keys(masterTalents[row]).map(tier =>
                            <TalentBlock key={row + tier}
                                         row={+row}
                                         tier={+tier}
                                         talentKey={masterTalents[row][tier]}/>
                        )}
                    </Row>
                )}
                <CustomTalents modal={this.state.modal} handleClose={() => this.setState({modal: false})}/>

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

export const Talents = connect(mapStateToProps)(TalentsComponent);
