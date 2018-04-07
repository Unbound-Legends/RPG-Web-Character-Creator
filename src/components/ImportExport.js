import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {importCharacter} from '../actions';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {dataTypes} from "../data/lists";
import {db} from "../firestore/db";

class ImportExport extends React.Component {
    state = {characters: []};

    generateFileName = () => {
        let time = new Date(Date.now())
            .toLocaleString()
            .replace(/[' ']/g, '')
            .replace(/[\D+]/g, '_')
            .slice(0, -2);
        return `GenesysEmporiumExport_${time}.json`
    };

    generateExport = () => {
        const {characterList, user} = this.props;
        const {characters} = this.state;
        new Promise(resolve => {
            let final = [];
            characters.forEach(character => {
                let file = {};
                file.name = characterList[character];
                dataTypes.forEach((type, index) => {
                    db.doc(`users/${user}/data/characters/${character}/${type}/`).get()
                        .then(doc => {
                            if (doc.exists) file[type] = doc.data().data;
                            else file[type] = null;
                            if (index + 1 >= dataTypes.length) final.push({character: file});
                            if (final.length === characters.length) resolve(final);
                        }, err => {
                            console.log(`Encountered error: ${err}`);
                        });
                });
            });
        }).then((finalExport) => {
            let element = document.createElement('a');
            let file = new Blob([JSON.stringify(finalExport)], {type: "application/json"});
            element.href = URL.createObjectURL(file);
            element.download = this.generateFileName();
            element.click();
        });
    };

    handleChange = (event) => {
        const {characters} = this.state;
        const {characterList} = this.props;
        let type = event.target.name;
        let value = event.target.value;
        let arr = [];
        if (value === 'all') {
            if (type === 'characters') {
                if (characters.length === Object.keys(characterList).length) arr = [];
                else arr = Object.keys(characterList);
            }
        } else {
            arr = this.state[type];
            if (arr.includes(value)) arr.splice(arr.indexOf(value), 1);
            else arr.push(value);
        }
        this.setState({[type]: arr});

    };

    handleFile = (event) => {
        let fileInput = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            try {
                let file = JSON.parse(event.target.result);
                if (!Array.isArray(file)) file = [file];
                file.forEach(data => {
                    switch (Object.keys(data)[0]) {
                        case 'character':
                            this.props.importCharacter(data.character);
                            alert(`${data.character.name} Imported!`);
                            break;
                        default:
                            alert('No Data Imported.');
                            break;
                    }
                });

            } catch (e) {
                alert(e);
            }
        };
        reader.onerror = () => alert('Bad File');
        reader.readAsText(fileInput);
    };

    render() {
        const {characterList} = this.props;
        const {characters} = this.state;
        return (
            <Col sm='auto' className='align-self-end align-self-middle'>
                <FormGroup check>
                    <Row>
                        <Label check>
                            <Input type="checkbox"
                                   value='all'
                                   name='characters'
                                   checked={characters.length === Object.keys(characterList).length}
                                   onChange={this.handleChange}
                            />
                            {' '} <b>All Characters</b>
                        </Label>
                    </Row>
                    {Object.keys(characterList).sort().map(character =>
                        <Row className='ml-2' key={character}>
                            <Label check>
                                <Input type='checkbox'
                                       checked={characters.includes(character)}
                                       value={character}
                                       name='characters'
                                       onChange={this.handleChange}
                                />
                                {' '} {characterList[character]}
                            </Label>
                        </Row>
                    )}
                </FormGroup>

                <Row>
                    <Button className='m-2 align-middle' onClick={this.generateExport}>Export Selected</Button>
                    {' '}
                    <Label for='import' className='btn-secondary py-2 px-3 m-2 align-middle rounded'>Import File</Label>
                    <Input type='file' accept='.json' onChange={this.handleFile} id='import' hidden/>
                </Row>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        characterList: state.characterList,
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({importCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ImportExport);
