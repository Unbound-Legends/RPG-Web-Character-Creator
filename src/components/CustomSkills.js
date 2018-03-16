import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import {changeCustomData} from '../actions';

class CustomSkills extends React.Component {
    state = {name: '', type: '', characteristic: ''};

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSet = (event) => {
        const {customSkills, changeCustomData} = this.props;
        const {name, type, characteristic} = this.state;
        let newObj = {...customSkills};
        newObj[name.replace(/\s/g, '')] = {name, type, characteristic};
        changeCustomData(newObj, 'customSkills');
        this.setState({name: '', type: '', characteristic: ''});
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {customSkills, changeCustomData} = this.props;
        changeCustomData('', 'customSkills');
        let newObj = {...customSkills};
        delete newObj[event.target.name];
        changeCustomData(newObj, 'customSkills');
        event.preventDefault();
    };

    render() {
        const {customSkills, handleClose, modal} = this.props;
        const {name, type, characteristic} = this.state;
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Custom Skills</ModalHeader>
                <ModalBody className='m-1 text-left'>
                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>CHAR</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Input type='text' value={name} name='name' maxLength='25'
                                       onChange={this.handleChange}/>
                            </td>
                            <td>

                                <Input type='select' value={type} name='type' onChange={this.handleChange}>
                                    <option value=''/>
                                    {['General', 'Combat', 'Social', 'Magic', 'Knowledge'].map((key) =>
                                        <option value={key} key={key}>{key}</option>
                                    )}
                                </Input>
                            </td>
                            <td>
                                <Input type='select' value={characteristic} name='characteristic'
                                       onChange={this.handleChange}>
                                    <option value=''/>
                                    {['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'].map((key) =>
                                        <option value={key} key={key}>{key}</option>
                                    )}
                                </Input>
                            </td>
                            <td>
                                <Button onClick={this.handleSet}
                                        disabled={name === '' || type === '' || characteristic === ''}>Add</Button>
                            </td>
                        </tr>
                        {Object.keys(customSkills).map((key) =>
                            <tr key={key}>
                                <td>
                                    {customSkills[key].name}
                                </td>
                                <td>
                                    {customSkills[key].type}
                                </td>
                                <td>
                                    {customSkills[key].characteristic}
                                </td>
                                <td>
                                    <Button name={key} onClick={this.handleDelete}>Delete</Button>
                                </td>
                            </tr>
                        )}
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
        customSkills: state.customSkills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomSkills)
