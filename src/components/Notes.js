import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class Notes extends React.Component {
    state = {notes: this.props.description.notes};

    componentWillReceiveProps(nextProps) {
        this.setState({notes: nextProps.description.notes});
    }

    handleBlur = (event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj.notes = this.state.notes;
        changeData(newObj, 'description');
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({notes: event.target.value});
        event.preventDefault();
    };

    render() {
        const {notes} = this.state;
        return (
            <div className='inlineblock' style={{width: '46%', verticalAlign: 'top'}}>
                <div className='module-header'>NOTES: </div>
                <hr />
                    <textarea onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              rows='38'
                              cols='45'
                              className='textField'
                              value={notes}/>
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