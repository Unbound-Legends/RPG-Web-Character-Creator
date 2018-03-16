import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';
import {changeCustomData, changeData} from '../actions';

class CustomCareers extends React.Component {
    state = {name: '', selectedSkills: []};

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSelect = (event) => {
        let newArr = [...this.state.selectedSkills];
        newArr.push(event.target.value);
        newArr.sort();
        this.setState({selectedSkills: newArr});
        event.preventDefault();
    };

    addCustomCareer = (event) => {
        const {customCareers, changeCustomData} = this.props;
        const {name, selectedSkills} = this.state;
        if (name === "" || 0 >= selectedSkills.length) return;
        let newObj = {...customCareers};
        newObj[name.replace(/\s/g, '')] = {name, skills: selectedSkills};
        changeCustomData(newObj, 'customCareers');
        this.setState({name: '', selectedSkills: []});
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {customCareers, changeCustomData, career, changeData} = this.props;
        if (career === event.target.name) changeData('', 'career');
        changeCustomData('', 'customCareers');
        let newObj = {...customCareers};
        delete newObj[event.target.name];
        changeCustomData(newObj, 'customCareers');
        event.preventDefault();
    };

    createOptions = () => {
        const {skills} = this.props;
        const {selectedSkills} = this.state;
        return Object.keys(skills).filter(skill => !selectedSkills.includes(skill)).sort();
    };

    render() {
        const {skills, customCareers, modal, handleClose} = this.props;
        const {name, selectedSkills} = this.state;
        return (
            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Custom Careers</ModalHeader>
                <ModalBody className='m-3 text-left'>
                    <Row className='my-1'>
                        Name:
                        <Input type='text' value={name} name='name' maxLength='25' onChange={this.handleChange}/>
                    </Row>
                    <Row className='my-1'>
                        Career Skills:
                        <Input type='select' value='' name='selectedSkills' onChange={this.handleSelect}>
                            <option value=''/>
                            {this.createOptions().map((key) =>
                                <option value={key} key={key}>{skills[key].name}</option>
                            )}
                        </Input>
                    </Row>
                    <Row className='my-1'>
                        <span className='my-auto'>{selectedSkills.length} skills&emsp;</span>
                        <ButtonGroup>
                            <Button onClick={() => this.setState({selectedSkills: []})}>Clear</Button>
                            <Button onClick={this.addCustomCareer} disabled={name === ''}>Add</Button>
                        </ButtonGroup>
                    </Row>
                    <Row className='my-1'>
                        {selectedSkills.map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}

                    </Row>
                    <Table>
                        <thead>
                        <tr>
                            <th>NAME</th>
                            <th>SKILLS</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(customCareers).map((key) =>
                            <tr key={key} style={{textAlign: 'left'}}>
                                <td>{customCareers[key].name}</td>
                                <td>{customCareers[key].skills.map((skill) => skills[skill] ? skills[skill].name : skill).join(', ')}</td>
                                <td><Button name={key} onClick={this.handleDelete}>Delete</Button></td>
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
        customCareers: state.customCareers,
        skills: state.skills,
        career: state.career,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData, changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomCareers)
