import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class CharacterDescription extends React.Component {

    handleChange = (type, event) => {
        const {changeData, description} = this.props;
        let newObj = {...description};
        newObj[type] = event.target.value;
        changeData(newObj, 'description');
        event.preventDefault();
    };

    render() {
        const {description} = this.props;
        return (
            <div className='inlineblock' style={{width: '46%'}}>
                <div className='module-header'>CHARACTER DESCRIPTION</div>
                <hr />
                {['gender', 'age', 'height', 'build', 'hair', 'eyes'].map((aspect)=>
                    <div className='fieldLabel' key={aspect}>{aspect.toLocaleUpperCase()}:
                        <input type='text' value={description[aspect]} maxLength='25' onChange={this.handleChange.bind(this, `${aspect}`)}/>
                        <hr />
                    </div>
                )}
                <div className='fieldLabel'>NOTABLE FEATURES:</div>
                <textarea onChange={this.handleChange.bind(this, 'features')}
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