import React from 'react';
import {connect} from 'react-redux';
import DynamicFont from 'react-dynamic-font';
import {Card, CardBody, CardHeader, CardText} from 'reactstrap';
import {talentCount} from '../reducers';
import {TalentSelection} from './index';

class TalentBlock extends React.Component {
    state = {modal: false};

    activation = () => {
        const {talents, talentKey} = this.props;
        if (talentKey === '') return 'var(--light)';
        if (talents[talentKey].activation) return 'var(--orange)';
        else return 'var(--lightblue)';
    };

    render() {
        const {talents, talentKey, row, tier} = this.props;
        const talent = talents[talentKey];
        const color = this.activation();
        return (
            <Card onClick={() => this.setState({modal: true})} className='m-1 talentCard'>
                <CardHeader className='p-1 text-center' style={{backgroundColor: color}}>
                    <DynamicFont content={talent ? talent.name : 'inactive'}/>
                </CardHeader>
                <CardBody className='p-1'>
                    <CardText>
                        {(talent ? talent.description + '\n' + (talent.activation ? talent.turn : '') : '')}
                    </CardText>
                </CardBody>
                <TalentSelection modal={this.state.modal}
                                 handleClose={() => this.setState({modal: false})}
                                 row={row}
                                 tier={tier}
                                 talentKey={talentKey}/>
            </Card>
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

export default connect(mapStateToProps)(TalentBlock);
