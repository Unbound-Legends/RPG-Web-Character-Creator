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
            <div className='module'>
                <div className='module-header'>CHARACTER DESCRIPTION</div>
                <hr />
                {['gender', 'age', 'height', 'build', 'hair', 'eyes', 'features'].map((aspect)=>
                    <div className='fieldLabel' key={aspect}>{aspect.toLocaleUpperCase()}:
                        <input type='text' value={description[aspect]} maxLength='25' onChange={this.handleChange.bind(this, `${aspect}`)}/>
                        <hr />
                    </div>
                )}

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