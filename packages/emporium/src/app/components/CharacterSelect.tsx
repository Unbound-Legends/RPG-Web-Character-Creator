import {
  addCharacter,
  changeCharacter,
  changeCharacterName,
  changeData,
  deleteCharacter,
  loadData
} from '@emporium/actions';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Col, Input, InputGroupAddon, Label, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Archetype } from './Archetype';
import { Career } from './Career';
import { ModalDeleteConfirm } from './ModalDeleteConfirm';

class CharacterSelectComponent extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            name: props.characterList
                ? props.characterList[props.character]
                : '',
            playerName: props.description.playerName,
            setting: props.setting,
            archetypeModal: false,
            careerModal: false,
            deleteModal: false
        };
    }

    public handleSelect = event => {
        const { changeCharacter, loadData } = this.props;
        changeCharacter(event.target.value);
        loadData();
        event.preventDefault();
    };

    public handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
    };

    public handleBlur = event => {
        const { changeData, description } = this.props;
        const type = event.target.name;
        const newObj = { ...description };
        newObj[type] = this.state[type];
        changeData(newObj, 'description');
        event.preventDefault();
    };

    public confirmedDelete = event => {
        this.props.deleteCharacter();
        this.setState({ deleteModal: false });
        event.preventDefault();
    };

    public render() {
        const {
            archetype,
            archetypes,
            careers,
            career,
            characterList,
            character,
            changeData,
            settings,
            theme
        } = this.props;
        const {
            name,
            playerName,
            archetypeModal,
            careerModal,
            deleteModal,
            setting
        } = this.state;
        return (
            <div className="w-100">
                <Row className="justify-content-end">
                    <div className={`header header-${theme}`}>CHARACTER</div>
                </Row>
                <hr />
                <Row className="align-items-center justify-content-between">
                    <Col>
                        <Input
                            type="select"
                            bsSize="sm"
                            value={character}
                            onChange={this.handleSelect}
                        >
                            {characterList &&
                                Object.keys(characterList)
                                    .sort((a, b) =>
                                        characterList[a] > characterList[b]
                                            ? 1
                                            : -1
                                    )
                                    .map(key => (
                                        <option value={key} key={key}>
                                            {characterList[key]}
                                        </option>
                                    ))}
                        </Input>
                    </Col>
                    <Col>
                        <InputGroupAddon
                            addonType="append"
                            className="justify-content-end"
                        >
                            <ButtonGroup>
                                <Button
                                    onClick={() => this.props.addCharacter()}
                                >
                                    New
                                </Button>
                                <Button
                                    onClick={() =>
                                        this.setState({ deleteModal: true })
                                    }
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </InputGroupAddon>
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Label for="characterName" sm={4}>
                        <b>CHARACTER NAME</b>
                    </Label>
                    <Col className="m-auto" id="characterName">
                        <Input
                            type="text"
                            bsSize="sm"
                            value={name ? name : ''}
                            maxLength="50"
                            name="name"
                            onChange={this.handleChange}
                            onBlur={() => this.props.changeCharacterName(name)}
                        />
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center justify-content-between">
                    <Label for="archetype" sm={4}>
                        <b>ARCHETYPE</b>
                    </Label>
                    <Col id="archetype">
                        {archetype && archetypes[archetype]
                            ? archetypes[archetype].name
                            : 'Missing Archetype Data'}
                    </Col>
                    <Col className="text-right">
                        <Button
                            name="archetype"
                            onClick={() =>
                                this.setState({ archetypeModal: true })
                            }
                        >
                            Select
                        </Button>
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center justify-content-between">
                    <Label for="career" sm="4">
                        <b>CAREER</b>
                    </Label>
                    <Col id="career">
                        {career && careers[career]
                            ? careers[career].name
                            : 'Missing Career Data'}
                    </Col>
                    <Col className="text-right">
                        <Button
                            name="career"
                            onClick={() => this.setState({ careerModal: true })}
                        >
                            Select
                        </Button>
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Label for="setting" sm="4">
                        <b>SETTING</b>
                    </Label>
                    <Col id="setting">
                        <Typeahead
                            id="characterSettingChoice"
                            multiple={true}
                            options={Object.values(settings)}
                            name="setting"
                            selected={setting}
                            placeholder="Choose a Setting..."
                            clearButton={true}
                            onChange={selected =>
                                this.setState({
                                    setting: selected.includes('All')
                                        ? ['All']
                                        : selected
                                })
                            }
                            onBlur={() => changeData(setting, 'setting', false)}
                        />
                    </Col>
                </Row>
                <hr />
                <Row className="align-items-center">
                    <Col sm="4">
                        <b>PLAYER NAME</b>
                    </Col>
                    <Col className="m-auto">
                        <Input
                            type="text"
                            bsSize="sm"
                            value={playerName}
                            maxLength="25"
                            name="playerName"
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    </Col>
                </Row>
                <hr />
                <Archetype
                    modal={archetypeModal}
                    handleClose={() => this.setState({ archetypeModal: false })}
                />
                <Career
                    modal={careerModal}
                    handleClose={() => this.setState({ careerModal: false })}
                />
                <ModalDeleteConfirm
                    deleteModal={deleteModal}
                    confirmedDelete={this.confirmedDelete}
                    handleClose={() => this.setState({ deleteModal: false })}
                    type="Character"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        archetype: state.archetype,
        archetypes: state.archetypes,
        career: state.career,
        careers: state.careers,
        character: state.character,
        characterList: state.characterList,
        description: state.description,
        setting: state.setting,
        user: state.user,
        settings: state.settings,
        theme: state.theme
    };
};

const matchDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeData,
            addCharacter,
            changeCharacter,
            deleteCharacter,
            changeCharacterName,
            loadData
        },
        dispatch
    );

export const CharacterSelect = connect(
    mapStateToProps,
    matchDispatchToProps
)(CharacterSelectComponent);
