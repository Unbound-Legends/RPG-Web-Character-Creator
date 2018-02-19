import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCustomData, changeData} from '../actions';
import popup from 'react-popup';

class CustomCareers extends React.Component {
    state = {name: '', selectedSkills: []};

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    handleSelect = (event) => {
        let newArr = [...this.state.selectedSkills];
        newArr.push(event.target.value);
        newArr.sort();
        this.setState({selectedSkills: newArr});
        event.preventDefault();
    };

    addCustomCareer = (event) => {
        const {customCareers, changeCustomData} = this.props;
        const {name, selectedSkills} = this.state;
        if (name === "" || 0 >= selectedSkills.length) return;
        let newObj = {...customCareers};
        newObj[name.replace(/\s/g, '')] = {name, skills: selectedSkills};
        changeCustomData(newObj, 'customCareers');
        this.setState({name: '', selectedSkills: []});
        event.preventDefault();
    };

    handleDelete = (event) => {
        const {customCareers, changeCustomData, career, changeData} = this.props;
        if (career===event.target.name) changeData('', 'career');
        changeCustomData('', 'customCareers');
        let newObj = {...customCareers};
        delete newObj[event.target.name];
        changeCustomData(newObj, 'customCareers');
        event.preventDefault();
    };

    createOptions = () => {
        const {skills} = this.props;
        const {selectedSkills} = this.state;
        return Object.keys(skills).filter(skill => !selectedSkills.includes(skill)).sort();
    };

    render() {
        const {skills, customCareers} = this.props;
        const {name, selectedSkills} = this.state;
        return (
            <div style={{textAlign: 'left'}}>
                <div>Name:<input type='text' value={name} name='name' maxLength='25' onChange={this.handleChange}/>
                </div>
                <div>Career Skills:

                    <select value='' name='selectedSkills' onChange={this.handleSelect}>
                        <option value=''/>
                        {this.createOptions().map((key) =>
                            <option value={key} key={key}>{skills[key].name}</option>
                        )}
                    </select>
                    {selectedSkills.length} skills
                    <input type='button' onClick={() => this.setState({selectedSkills: []})} value='Clear'/>
                    <input type='button' onClick={this.addCustomCareer} value='Add'/>
                </div>
                <div>
                    {selectedSkills.map((skill)=>skills[skill] ? skills[skill].name : skill).join(', ')}

                </div>
                <div className='table'>
                    <div className='table-header'>
                        <div className='table-cell-no-border'>NAME</div>
                        <div className='table-cell-no-border'>SKILLS</div>
                        <div className='table-cell-no-border'/>

                    </div>
                    {Object.keys(customCareers).map((key) =>
                        <div key={key} className='table-row' style={{textAlign: 'left'}}>
                            <div className='table-cell-bottom-border'>
                                {customCareers[key].name}
                            </div>
                            <div className='table-cell-bottom-border'>
                                {customCareers[key].skills.map((skill)=>skills[skill] ? skills[skill].name : skill).join(', ')}
                            </div>
                            <div className='table-cell-bottom-border'>
                                <button type='sumbit' name={key} onClick={this.handleDelete}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
                <input type='button' onClick={popup.close} value='Close'/>
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        customCareers: state.customCareers,
        skills: state.skills,
        career: state.career,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeCustomData, changeData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CustomCareers)
