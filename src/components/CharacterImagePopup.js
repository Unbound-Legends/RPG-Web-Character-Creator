import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import popup from 'react-popup';

class CharacterImagePopup extends React.Component {

    handleChange = (event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj.image = event.target.value;
        changeData(newObj, 'description');
        event.preventDefault();
    };


    render() {
        const {description} = this.props;
        return (
            <div>
                <div>CHARACTER IMAGE URL: </div>
                <input type='text' value={description.image}  onChange={this.handleChange}/>
                <input type='submit' onClick={popup.close}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CharacterImagePopup);