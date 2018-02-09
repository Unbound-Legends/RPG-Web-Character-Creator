import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUser, addCharacter} from '../actions';
import firebase from 'firebase';
import {characterExport} from '../reducers';

class Buttons extends React.Component {

    handleFile = (event) => {
        let fileInput = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            try {
                let data = JSON.parse(event.target.result);
                Object.keys(data).forEach((newData)=> {
                    switch (newData) {
                        case 'character':
                            let importCharacter = data[newData];
                            this.props.addCharacter(importCharacter);
                            alert('Character Imported!');
                            break;
                        default:
                            alert('No Data Imported.');
                            break;
                    }
                });
            } catch(e) {
                alert(e);
            }
        };
        reader.onerror = () => alert('Bad File');
        reader.readAsText(fileInput);
    };



    handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.changeUser(null);
            });
    };

    handleDonate = () => {
        window.open('https://paypal.me/SkyJedi');
    };

    render() {
        return (
          <div className='hidePrint' style={{textAlign: 'right'}}>
              <input type='file' accept='.json' onChange={this.handleFile}/>
              <a href={this.props.characterExport} download='character'><button type="button">Export</button></a>
              <input type='button' onClick={this.handleDonate} value="Donate" />
              <button onClick={this.handleClick}>Sign Out</button>
          </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        characterExport: characterExport(state),
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeUser, addCharacter}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Buttons);
