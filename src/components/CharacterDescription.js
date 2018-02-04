import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class CharacterDescription extends React.Component {
    state = {description: this.props.description};

    componentWillReceiveProps(nextProps) {
        this.setState({description: nextProps.description});
    }

    handleChange = (type, event) => {
        let newObj = {...this.state.description};
        newObj[type] = event.target.value;
        this.setState({description: newObj});
        event.preventDefault();
    };

    handleBlur = (type, event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj[type] = this.state.description[type];
        changeData(newObj, 'description');
        event.preventDefault();
    };

    render() {
        const {description} = this.state;
        return (
            <div className='inlineblock' style={{width: '46%'}}>
                <div className='module-header'>CHARACTER DESCRIPTION</div>
                <hr />
                {['gender', 'age', 'height', 'build', 'hair', 'eyes'].map((aspect)=>
                    <div className='fieldLabel' key={aspect}>{aspect.toLocaleUpperCase()}:
                        <input type='text' value={description[aspect]}
                               maxLength='25'
                               onBlur={this.handleBlur.bind(this, `${aspect}`)}
                               onChange={this.handleChange.bind(this, `${aspect}`)}/>
                        <hr />
                    </div>
                )}
                <div className='fieldLabel'>NOTABLE FEATURES:</div>
                <textarea onChange={this.handleChange.bind(this, 'features')}
                          onBlur={this.handleBlur.bind(this, 'features')}
                          rows='10'
                          cols='45'
                          className='textField'
                          value={description.features ? description.features : ''}/>
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

export default connect(mapStateToProps, matchDispatchToProps)(CharacterDescription);