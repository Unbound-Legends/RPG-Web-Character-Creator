import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData, addCharacter, changeCharacter, getData, deleteCharacter} from '../actions';

class CharacterSelect extends React.Component {

    componentWillMount() {

    }

    handleNewCharacter = () => {
        this.props.addCharacter();
        this.props.getData();
    };

    handleDeleteCharacter = () => {
        this.props.deleteCharacter();
        this.props.getData();
    };

    handleSelect = (event) => {
        const {getData, changeCharacter} = this.props;
        changeCharacter(event.target.value);
        getData();
        event.preventDefault();
    };

    handleChange = (type, event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj[type] = event.target.value;
        changeData(newObj, 'description');
        event.preventDefault();
    };

    render() {
        const {archetype, archetypes, careers, career, description, characterList, character} = this.props;
        if (character===null || characterList === null) return <div/>;
        return (
            <div className='module'>
                <div className='module-header'>CHARACTER</div>
                <hr />
                <select value={character} onChange={this.handleSelect}>
                    {Object.keys(characterList).map((key)=>
                        <option value={key} key={key}>{characterList[key].description ? characterList[key].description.name : ''}</option>
                    )}
                </select>
                <button onClick={this.handleNewCharacter}>New Character</button>
                <button onClick={this.handleDeleteCharacter}>Delete Character</button>
                <div>Character Name:
                    <input type='text' value={description.name} maxLength='25' onChange={this.handleChange.bind(this, 'name')}/>
                </div>
                <hr />
                <div>Archetype: {archetype===null ? '' : archetypes[archetype].name}
                </div>
                <hr />
                <div>Career: {career===null ? '' : careers[career].name}
                </div>
                <hr />
                <div>Player Name:
                    <input type='text' value={description.playerName} maxLength='25' onChange={this.handleChange.bind(this, 'playerName')}/>
                </div>
                <hr />
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

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData, addCharacter, changeCharacter, getData, deleteCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterSelect);