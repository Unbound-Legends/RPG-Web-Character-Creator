import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonGroup, Col, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {addCharacter, changeCharacter, changeCharacterName, changeData, deleteCharacter, loadData} from '../actions';
import popup from 'react-popup';
import {Archetype, Career, CustomCareers} from './index';

class CharacterSelect extends React.Component {
    state = {
        name: this.props.characterList ? this.props.characterList[this.props.character] : '',
        playerName: this.props.description.playerName,
        archetypeModal: false,
        careerModal: false,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({playerName: nextProps.description.playerName});
        if (this.props.characterList) this.setState({name: this.props.characterList[nextProps.character]});
        if (nextProps.characterList) this.setState({name: nextProps.characterList[nextProps.character]});
    }

    handleSelect = (event) => {
        const {changeCharacter, loadData} = this.props;
        changeCharacter(event.target.value);
        loadData();
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {changeData, description} = this.props;
        let type = event.target.name;
        let newObj = {...description};
        newObj[type] = this.state[type];
        changeData(newObj, 'description');
        event.preventDefault();
    };

    handlePopup = () => {
        popup.create({
            title: `Customize Career`,
            className: 'alert',
            content: <CustomCareers/>,
        })
    };

    handleDelete = () => {
        popup.create({
            title: `BALETED WARNING`,
            className: 'alert',
            content: (
                <div>
                    <div>Are you super serious? This cannot be undone</div>
                    <input type='button' value='NO! I am not ready for this!' onClick={popup.close}/>
                    <input type='button' value='YES! I no longer want this character in my life'
                           onClick={this.confirmedDelete}/>
                </div>
            ),
        })
    };

    confirmedDelete = (event) => {
        this.props.deleteCharacter();
        event.preventDefault();
        popup.close();
    };

    handleNameChange = (event) => {
        event.preventDefault();
        this.props.changeCharacterName(this.state.name);
    };

    render() {
        const {archetype, archetypes, careers, career, characterList, character} = this.props;
        const {name, playerName, archetypeModal, careerModal} = this.state;
        return (
            <Col sm='7'>
                <Row className='justify-content-end'><b>CHARACTER</b></Row>
                <hr/>
                <Row className='my-2'>
                    <Col>
                        <InputGroup>
                            <Input type='select' value={character} onChange={this.handleSelect}>
                                {characterList && Object.keys(characterList).map((key) =>
                                    <option value={key}
                                            key={key}>{characterList[key]}</option>
                                )}
                            </Input>
                            <InputGroupAddon addonType='append'>
                                <ButtonGroup>
                                    <Button onClick={() => this.props.addCharacter()}>New</Button>
                                    <Button onClick={this.handleDelete}>Delete</Button>
                                </ButtonGroup>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col>
                        <b>CHARACTER NAME:</b>
                        <Input type='text' value={name} maxLength='25' name='name' onChange={this.handleChange}
                               onBlur={this.handleNameChange}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <b>ARCHETYPE:</b> {archetype === null ? '' : archetypes[archetype].name} {' '}
                        <Button name='archetype'
                                onClick={() => this.setState({archetypeModal: !this.state.archetypeModal})}>Select</Button>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <b>CAREER:</b> {careers[career] && careers[career].name} {' '}
                        <ButtonGroup>
                            <Button name='career'
                                    onClick={() => this.setState({careerModal: !this.state.careerModal})}>Select</Button>
                            <Button name='customCareer' onClick={this.handlePopup}>Custom</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <b>NAME:</b> <Input type='text' value={playerName} maxLength='25' name='playerName'
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}/>
                    </Col>
                </Row>
                <hr/>
                <Archetype modal={archetypeModal} handleClose={() => this.setState({archetypeModal: false})}/>
                <Career modal={careerModal} handleClose={() => this.setState({careerModal: false})}/>

            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        career: state.career,
        careers: state.careers,
        description: state.description,
        user: state.user,
        characterList: state.characterList,
        character: state.character,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changeData,
        addCharacter,
        changeCharacter,
        deleteCharacter,
        changeCharacterName,
        loadData
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterSelect);