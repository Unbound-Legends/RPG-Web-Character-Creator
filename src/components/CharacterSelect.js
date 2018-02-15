import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData, addCharacter, changeCharacter, deleteCharacter} from '../actions';
import popup from 'react-popup';
import {Archetype, Career, CustomCareers} from './index';

class CharacterSelect extends React.Component {
    state = {
        name: this.props.description.name,
        playerName: this.props.description.playerName,
        character: this.props.character
    };

    componentWillReceiveProps(nextProps) {
        this.setState({character: nextProps.character});
        this.setState({playerName: nextProps.description.playerName});
        this.setState({name: nextProps.description.name});
    }

    handleClick = (event) => {
        let content = <div/>;
        if (event.target.name === 'archetype') content = <Archetype/>;
        if (event.target.name === 'career') content = <Career/>;
        popup.create({
            title: `Select ${event.target.name}`,
            className: 'alert',
            content: (content),
        })
    };

    handleSelect = (event) => {
        const {changeCharacter} = this.props;
        changeCharacter(event.target.value);
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
                    <input type='button' value='YES! I no longer want this character in my life' onClick={() => {
                        this.props.deleteCharacter();
                        popup.close();
                    }}/>
                </div>
            ),
        })
    };

    render() {
        const {archetype, archetypes, careers, career, characterList} = this.props;
        const {name, playerName, character} = this.state;
        return (
            <div className='inlineblock sideBySide' style={{textAlign: 'left'}}>
                <div className='module-header'>CHARACTER</div>
                <hr/>
                <select value={character ? character : ''} onChange={this.handleSelect}>
                    {Object.keys(characterList).map((key) =>
                        <option value={key}
                                key={key}>{characterList[key].description ? characterList[key].description.name : key}</option>
                    )}
                </select>
                <button onClick={() => this.props.addCharacter()}>New Character</button>
                <button onClick={this.handleDelete}>Delete Character</button>
                <div className='fieldLabel'>CHARACTER NAME:
                    <input type='text' value={name} maxLength='25' name='name' onChange={this.handleChange}
                           onBlur={this.handleBlur}/>
                </div>
                <hr/>
                <div className='fieldLabel'>ARCHETYPE:
                    <div className='fieldData'>{archetype === null ? '' : archetypes[archetype].name}</div>
                    <input type='button' name='archetype' onClick={this.handleClick} value='Select'/>
                </div>
                <hr/>
                <div className='fieldLabel'>CAREER:
                    <div className='fieldData'>{careers[career] && careers[career].name}</div>
                    <input type='button' name='career' onClick={this.handleClick} value='Select'/>
                    <input type='button' name='customCareer' onClick={this.handlePopup} value='Custom'/>

                </div>
                <hr/>
                <div className='fieldLabel'>PLAYER NAME:
                    <input type='text' value={playerName} maxLength='25' name='playerName' onChange={this.handleChange}
                           onBlur={this.handleBlur}/>
                </div>
                <hr/>
            </div>

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
    return bindActionCreators({changeData, addCharacter, changeCharacter, deleteCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterSelect);