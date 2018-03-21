import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../actions';

class CustomTalents extends React.Component {
    state = {
        name: '',
        tier: 1,
        activation: true,
        turn: '',
        ranked: false,
        description: '',
    };

    handleChange = (event) => {
        let value = event.target.value;
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (event.target.name === 'tier') value = +value;
        this.setState({[event.target.name]: value});
        event.preventDefault();
    };

    handleSubmit = () => {
        const {name, tier, activation, turn, ranked, description} = this.state;
        const {customTalents, changeCustomData} = this.props;
        let Obj = {...customTalents};
        Obj[name.replace(/\s/g, '').replace(/[{()}]/g, '')] = {
            name, tier, activation, turn, ranked, description
        };
        changeCustomData(Obj, 'customTalents');
        this.setState({
            name: '',
            tier: 1,
            activation: true,
            turn: '',
            ranked: false,
            description: '',
        });
    };

    handleDelete = (event) => {
        const {customTalents, changeCustomData} = this.props;
        let Obj = {...customTalents};
        delete Obj[event.target.name];
        changeCustomData(Obj, 'customTalents', false);
        event.preventDefault();
    };

    render() {
        const {customTalents, modal, handleClose} = this.props;
        const {name, tier, ranked, activation, turn, description} = this.state;
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Custom Talents</ModalHeader>
                <ModalBody className='m-3 text-left'>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Name:</b>
                        </Col>
                        <Col>
                            <Input className='my-auto' type='text' value={name} name='name' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Tier:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={tier} name='tier'
                                   onChange={this.handleChange}>
                                {[1, 2, 3, 4, 5].map(number =>
                                    <option key={number} value={number}>{number}</option>
                                )}
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Activation:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={activation} name='activation'
                                   onChange={this.handleChange}>
                                <option value={true}>Active</option>
                                <option value={false}>Passive</option>
                            </Input>
                        </Col>
                    </Row>
                    {activation &&
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Slot:</b>
                        </Col>
                        <Col>
                            <Input className='my-auto' type='text' value={turn} name='turn' maxLength='25'
                                   onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    }
                    <Row className='mt-2'>
                        <Col xs='4' className='my-auto'>
                            <b>Ranked:</b>
                        </Col>
                        <Col>
                            <Input type='select' className='my-auto' value={ranked} name='ranked'
                                   onChange={this.handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='4'>
                            <b>Description:</b>
                        </Col>
                        <Col>
                            <textarea onChange={this.handleChange}
                                      name='description'
                                      rows='8'
                                      maxLength='200'
                                      className='w-100'
                                      value={description}/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className='my-4 justify-content-end'>
                        <Button onClick={this.handleSubmit} disabled={false}>Add Talent</Button>
                    </Row>
                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TIER</th>
                            <th>ACTIVE</th>
                            <th>SLOT</th>
                            <th>RANKED</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {customTalents &&
                        Object.keys(customTalents).map(key =>
                            <tr key={key}>
                                <td>{customTalents[key].name}</td>
                                <td>{customTalents[key].tier}</td>
                                <td>{customTalents[key].activation ? 'Active' : 'Passive'}</td>
                                <td>{customTalents[key].turn}</td>
                                <td>{customTalents[key].ranked ? 'Yes' : 'No'}</td>
                                <td><Button name={key} onClick={this.handleDelete}>Delete</Button></td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        customTalents: state.customTalents,
        talents: state.talents,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData, changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomTalents)
