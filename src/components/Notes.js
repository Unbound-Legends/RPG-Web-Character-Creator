import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class Notes extends React.Component {

    handleChange = (event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj.notes = event.target.value;
        changeData(newObj, 'description');
        event.preventDefault();
    };

    render() {
        const {description} = this.props;
        return (
            <div className='module'>
                <div className='module-header'>NOTES: </div>
                <hr />
                    <textarea onChange={this.handleChange}
                              rows='10'
                              cols='45'
                              className='textField'
                              value={description.notes ? description.notes : ''}/>
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

export default connect(mapStateToProps, matchDispatchToProps)(Notes);