import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCustomData} from '../actions';
import popup from 'react-popup';

class CustomSkills extends React.Component {
    state = {name: '', type: '', characteristic: ''};

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSet = (event) => {
        const {customSkills, changeCustomData} = this.props;
        const {name, type, characteristic} = this.state;
        let newObj = {...customSkills};
        newObj[name.replace(/\s/g,'')] = {name: name, type: type, characteristic: characteristic};
        changeCustomData(newObj, 'customSkills');
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {customSkills, changeCustomData} = this.props;
        let newObj = {...customSkills};
        delete newObj[event.target.name];
        changeCustomData(newObj, 'customSkills', false);
        event.preventDefault();
    };

    render() {
        const {customSkills} = this.props;
        const {name, type, characteristic} = this.state;
        return (
            <div style={{textAlign: 'left'}}>
                <div className='table'>
                    <div className='table-header'>
                        <div className='table-cell-no-border'>NAME</div>
                        <div className='table-cell-no-border'>TYPE</div>
                        <div className='table-cell-no-border'>CHAR</div>
                        <div className='table-cell-no-border'/>

                    </div>
                    <div className='table-row'>
                        <div className='table-cell-no-border'>
                            <input type='text' value={name} name='name' maxLength='25' onChange={this.handleChange}/>
                        </div>
                        <div className='table-cell-no-border'>

                            <select value={type} name='type' onChange={this.handleChange}>
                                <option value=''/>
                                {['General', 'Combat', 'Social', 'Magic', 'Knowledge'].map((key) =>
                                    <option value={key} key={key}>{key}</option>
                                )}
                            </select>
                        </div>
                        <div className='table-cell-no-border'>
                            <select value={characteristic} name='characteristic' onChange={this.handleChange}>
                                <option value=''/>
                                {['Brawn', 'Agility', 'Intellect', 'Cunning', 'Willpower', 'Presence'].map((key) =>
                                    <option value={key} key={key}>{key}</option>
                                )}
                            </select>
                        </div>
                        <div className='table-cell-no-border'>
                            <button type='sumbit' onClick={this.handleSet}>Add</button>
                        </div>
                    </div>
                    {Object.keys(customSkills).map((key)=>
                    <div key={key} className='table-row'>
                        <div className='table-cell-bottom-border'>
                            {customSkills[key].name}
                        </div>
                        <div className='table-cell-bottom-border'>
                            {customSkills[key].type}
                        </div>
                        <div className='table-cell-bottom-border'>
                            {customSkills[key].characteristic}
                        </div>
                        <div className='table-cell-bottom-border'>
                            <button type='sumbit' name={key} onClick={this.handleDelete}>Delete</button>
                        </div>
                    </div>
                    )}
                </div>
                <button onClick={popup.close}>Close</button>
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        customSkills: state.customSkills,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomSkills)
