import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {importCharacter} from '../actions';
import {characterExport} from '../reducers';
import {Button, Col, Input, Label} from 'reactstrap';


class ImportExport extends React.Component {

    handleFile = (event) => {
        let fileInput = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            try {
                let data = JSON.parse(event.target.result);
                Object.keys(data).forEach((newData) => {
                    switch (newData) {
                        case 'character':
                            let importCharacter = data[newData];
                            this.props.importCharacter(importCharacter);
                            alert('Character Imported!');
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
        return (
            <Col sm='auto' className='align-self-end align-self-middle'>
                <Button color='link' className='p-0 m-2 align-middle' href={this.props.characterExport}
                        download='character'>Export Character</Button>
                {' '}
                <Label for='importCharacter' className='btn-link p-0 m-2 align-middle'>Import Character</Label>
                <Input type='file' accept='.json' onChange={this.handleFile} id='importCharacter' hidden/>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return {
        characterExport: characterExport(state),
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({importCharacter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ImportExport);
