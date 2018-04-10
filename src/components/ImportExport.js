import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {importCharacter, importCustomDataSet} from '../actions';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {customDataTypes, dataTypes} from "../data/lists";
import {db} from "../firestore/db";

class ImportExport extends React.Component {
    state = {characters: [], customDataSets: []};

    generateFileName = () => {
        let time = new Date(Date.now())
            .toLocaleString()
            .replace(/[' ']/g, '')
            .replace(/[\D+]/g, '_')
            .slice(0, -2);
        return `GenesysEmporiumExport_${time}.json`
    };

    generateExport = () => {
        const {characterList, customDataList, user} = this.props;
        const {characters, customDataSets} = this.state;
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
                            if (final.length === characters.length + customDataSets.length) resolve(final);
                        }, err => {
                            console.log(`Encountered error: ${err}`);
                        });
                });
            });
            customDataSets.forEach(customDataSet => {
                let file = {};
                file.name = customDataList[customDataSet];
                customDataTypes.forEach((type, index) => {
                    db.doc(`users/${user}/data/customDataSets/${customDataSet}/${type}/`).get()
                        .then(doc => {
                            if (doc.exists) file[type] = doc.data().data;
                            else file[type] = null;
                            if (index + 1 >= customDataTypes.length) final.push({customDataSet: file});
                            if (final.length === characters.length + customDataSets.length) resolve(final);
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
        const {characterList, customDataList} = this.props;
        let type = event.target.name;
        let value = event.target.value;
        let list;
        let arr = [];
        switch (type) {
            case 'characters':
                list = {...characterList};
                break;
            case 'customDataSets':
                list = {...customDataList};
                break;
            default:
                break;
        }

        if (value === 'all') {
            if (this.state[type].length === Object.keys(list).length) arr = [];
            else arr = Object.keys(list);
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
                        case 'customDataSet':
                            this.props.importCustomDataSet(data.customDataSet);
                            alert(`${data.customDataSet.name} Imported!`);
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
        const {characterList, customDataList} = this.props;
        return (
            <Col sm='auto' className='align-self-end align-self-middle'>
                <FormGroup check>
                    {['characters', 'customDataSets'].map(type => {
                        let list;
                        if (type === 'characters') list = {...characterList};
                        if (type === 'customDataSets') list = {...customDataList};

                        return (
                            <div key={type}>
                                <Row>
                                    <Label check>
                                        <Input type="checkbox"
                                               value='all'
                                               name={type}
                                               checked={this.state[type].length === Object.keys(list).length}
                                               onChange={this.handleChange}
                                        />
                                        {' '} <b>All {type}</b>
                                    </Label>
                                </Row>
                                {Object.keys(list).sort().map(item =>
                                    <Row className='ml-2' key={item}>
                                        <Label check>
                                            <Input type='checkbox'
                                                   checked={this.state[type].includes(item)}
                                                   value={item}
                                                   name={type}
                                                   onChange={this.handleChange}
                                            />
                                            {' '} {list[item]}
                                        </Label>
                                    </Row>
                                )}
                            </div>
                        )
                    })}

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
        customDataList: state.customDataList,
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({importCharacter, importCustomDataSet}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ImportExport);
