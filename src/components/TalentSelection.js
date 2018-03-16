import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {changeData} from '../actions';
import {talentCount} from '../reducers';
import {Description, TalentDedication} from './index';

class TalentSelection extends React.Component {
    state = {
        talentSelection: this.props.talentKey,
        selection: this.props.talentModifiers.Dedication[this.props.row] ? this.props.talentModifiers.Dedication[this.props.row] : '',
    };

    makeOptions = () => {
        const {tier, talentCount, talentKey, talents} = this.props;
        let options = [];
        Object.keys(talents).forEach((key) => {
            //checked to make sure the improved and supreme talensts aren't selected first
            if (key.includes('Improved') || key.includes('Supreme')) {
                if ((key.includes('Improved') && talentCount[key.slice(0, -8)]) ||
                    (key.includes('Supreme') && talentCount[key.slice(0, -7)])) {
                    if (tier === talents[key].tier && !talentCount[key]) options.push(key);
                }
            }
            //talent from this tier and has not been selected already
            else if (tier === talents[key].tier && !talentCount[key]) options.push(key);
            //talent is ranked and has been selected enough for this tier
            else if (talents[key].ranked && ((talents[key].tier + talentCount[key]) === tier)) options.push(key);
            if (key === talentKey) options.push(key);
        });
        if (tier === 5 && !options.includes('Dedication')) options.push('Dedication');
        options.sort();
        return options;
    };

    handleSubmit = () => {
        const {row, tier, masterTalents, talentModifiers, changeData, handleClose} = this.props;
        const {talentSelection, selection} = this.state;
        let newObj = {...masterTalents};
        newObj[row][tier] = talentSelection;
        //if the new talents isn't blank make a new empty block
        if (talentSelection !== '') {
            //select tier 1 talent, add the next tier 1 row
            if (tier === 1 && !newObj[row + 1]) newObj[row + 1] = {1: ''};
            //if the row allows, add the next tier
            if (row > tier && 5 > tier) {
                if (masterTalents[row - 1][tier + 1] !== '' && !newObj[row][tier + 1]) newObj[row][tier + 1] = '';
            }
            //add the same tier in the next row if it wasn't allowed in a previous select
            if (masterTalents[row + 1]) {
                if (!masterTalents[row + 1][tier]) {
                    if (masterTalents[row + 1][tier - 1] && masterTalents[row + 1][tier - 1] !== '') newObj[row + 1][tier] = '';
                }
            }
        }

        changeData(newObj, 'masterTalents');
        //add dedication info to talentModifiers
        if (selection !== '') {
            let newObj2 = {...talentModifiers};
            newObj2.Dedication[row] = selection;
            changeData(newObj2, 'talentModifiers');
        }
        handleClose();
    };

    handleChange = (event) => {
        this.setState({talentSelection: event.target.value});
        event.preventDefault();
    };

    handleDedicationChange = (name) => {
        this.setState({selection: name})
    };

    render() {
        const {talents, talentKey, row, handleClose, modal} = this.props;
        const {talentSelection, selection} = this.state;
        const talent = talents[talentSelection];
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Select a Talent</ModalHeader>
                <ModalBody className='m-4'>
                    <Row>
                        <Input type='select' defaultValue={talentKey} onChange={this.handleChange}>
                            <option value=''/>
                            {this.makeOptions().map((key) =>
                                <option value={key} key={key}>{talents[key].name}</option>
                            )}
                        </Input>
                    </Row>
                    {talent &&
                    <div>
                        <Row><b>Name:&nbsp;</b> {talent.name}</Row>
                        <Row><b>Tier:&nbsp;</b> {talent.tier}</Row>
                        <Row><b>Activation:&nbsp;</b> {talent.activation ? 'Active' : 'Passive'}</Row>
                        {talent.turn ? <Row>{talent.turn}</Row> : null}
                        {talent.ranked ? <Row><b>Ranked</b></Row> : <Row><b>Not Ranked</b></Row>}
                        <Row><b>Setting:&nbsp;</b> {talent.setting}</Row>
                        <Row><b>Description:</b></Row>
                        <Row><Description text={talent.description}/></Row>
                        {talentSelection === 'Dedication' && <TalentDedication row={row} selection={selection}
                                                                               handleDedicationChange={this.handleDedicationChange}/>}
                    </div>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button disabled={talentSelection === 'Dedication' && selection === ''}
                            onClick={this.handleSubmit}>Sumbit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        masterTalents: state.masterTalents,
        talentCount: talentCount(state),
        talents: state.talents,
        talentModifiers: state.talentModifiers,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TalentSelection);
