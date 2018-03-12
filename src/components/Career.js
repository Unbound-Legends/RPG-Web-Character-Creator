import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {maxCareerSkills} from '../reducers';
import {Description} from './index';
import {Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';

class Career extends React.Component {

    handleChange = (event) => {
        let value = event.target.value === '' ? null : event.target.value;
        this.props.changeData(value, 'career');
        this.props.changeData([], 'careerSkillsRank');
        event.preventDefault();
    };

    handleCheck = (event) => {
        let careerSkillsRank = [...this.props.careerSkillsRank];
        if (careerSkillsRank.includes(event.target.name)) {
            careerSkillsRank.forEach((skill, index) => {
                careerSkillsRank[skill] === event.target.name && careerSkillsRank.splice(index, 1);
            })
        } else careerSkillsRank.push(event.target.name);
        if (this.props.maxCareerSkills >= careerSkillsRank.length) this.props.changeData(careerSkillsRank, 'careerSkillsRank');
        else event.preventDefault();
    };

    render() {
        const {career, careers, skills, careerSkillsRank, modal, handleClose} = this.props;
        const masterCareer = careers[career];
        return (

            <Modal isOpen={modal} toggle={handleClose}>
                <ModalHeader toggle={handleClose}>Select Career</ModalHeader>
                <ModalBody>
                    <Input type='select' defaultValue={masterCareer && masterCareer.name} onChange={this.handleChange}>
                        <option value=''/>
                        {Object.keys(careers).sort().map((key) =>
                            <option value={key} key={key}>{careers[key].name}</option>
                        )}
                    </Input>
                    <hr/>

                    {masterCareer &&
                    <Col className='mt-2'>
                        <Row><h3>Career Skills:</h3></Row>
                        <Row>Select {this.props.maxCareerSkills} skills to start with 1 free rank</Row>
                        <Col sm={{size: 6, offset: 1}}>
                            {masterCareer.skills.map((skill) =>
                                <Row key={skill}><Label><Input type='checkbox' name={skill}
                                                               checked={careerSkillsRank.includes(skill)}
                                                               onChange={this.handleCheck}/>{skills[skill].name}
                                </Label></Row>
                            )}
                        </Col>
                        <Row>
                            <b>Setting:</b>
                            <Col sm='6'>
                                {masterCareer.setting}
                            </Col>
                        </Row>
                        <Row>
                            <b>Description:</b>
                            <Col sm='6'>
                                <Description text={masterCareer.description}/>
                            </Col>
                        </Row>
                    </Col>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color='secondary' onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        career: state.career,
        careerSkillsRank: state.careerSkillsRank,
        careers: state.careers,
        skills: state.skills,
        maxCareerSkills: maxCareerSkills(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Career);
