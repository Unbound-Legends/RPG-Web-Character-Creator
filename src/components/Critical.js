import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {changeData} from '../actions';
import {criticalText} from '../reducers';
import {Description} from './index';

class Critical extends React.Component {
    state = {value: '', modal: false};

    handleSubmit = (event) => {
        let newArr = [...this.props.critical];
        let value = this.state.value;
        if (value !== '') {
            newArr.push(value);
            this.props.changeData(newArr, 'critical');
        }
        this.setState({value: ''});
        event.preventDefault();
    };

    handleChange = (event) => {
        let number = +event.target.value.replace(/\D+/g, '');
        if (!(number > 999)) this.setState({value: number});
        event.preventDefault();
    };

    removeCritical = () => {
        let newArr = [...this.props.critical];
        newArr.splice(this.state.modal, 1);
        this.props.changeData(newArr, 'critical');
        this.setState({modal: false});
    };

    render() {
        const {value, modal} = this.state;
        const {critical} = this.props;
        return (
            <Col lg='12'>
                <Row className='justify-content-end'><h5>CRITICAL INJURES</h5></Row>
                <hr/>
                <Row className='my-2'>
                    <b className='my-auto'>Add a critical:&nbsp;</b>
                    <Input className='shortTextBox w-25' type='number' name='critical' value={value > 0 ? value : ''}
                           onChange={this.handleChange}/>
                    <Button onClick={this.handleSubmit}>Add Critical</Button>
                </Row>
                {critical.map((critRoll, index) =>
                    <Row className='my-2' key={index} onClick={() => this.setState({modal: index})}>
                        <span>{critRoll}:&emsp;<Description text={criticalText(critRoll)}/></span>
                        <hr/>
                    </Row>
                )}
                <Modal isOpen={modal !== false} toggle={() => this.setState({modal: false})}>
                    <ModalHeader toggle={() => this.setState({modal: false})}>Remove Critical Injury?</ModalHeader>
                    <ModalBody>
                        <span>{critical[modal]}:&emsp;<Description text={criticalText(critical[modal])}/></span>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.removeCritical}>Remove Critical</Button>
                        <Button onClick={() => this.setState({modal: false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        critical: state.critical,
        criticalText: criticalText(state),

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Critical);
