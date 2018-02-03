import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import popup from 'react-popup';
import {changeData} from '../actions';
import {criticalText} from '../reducers';
import {Description} from './index';

class Critical extends React.Component {
    state = {value: ''};

    handleSubmit = (event) => {
        let newArr = [...this.props.critical];
        let value = this.state.value.replace(/\D/g, '');
        if (value !== '') {
            newArr.push(value);
            this.props.changeData(newArr, 'critical');
        }
        this.setState({value: ''});
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
        event.preventDefault();
    };

    removeCritical = (index) => {
        let newArr = [...this.props.critical];
        newArr.splice(index, 1);
        this.props.changeData(newArr, 'critical');
        popup.close();
    };

    criticalPopup = (index) => {
        popup.create({
            title: `Critical Injury`,
            className: 'alert',
            content: (
                <div>
                    <div>Remove Critical Injury?</div>
                    <button onClick={this.removeCritical.bind(this, index)}>Remove Critical</button>
                    <button onClick={popup.close}>Cancel</button>
                </div>
            )
        })
    };


    render() {
    const {value} = this.state;
    const {critical} = this.props;
    return (
      <div className='module' style={{textAlign: 'left'}}>
          <div className='module-header'>CRITICAL INJURIES</div>
          <hr />
            <div>Add a critical:
                <input className='shortTextBox' type='text' name='critical' maxLength='3' value={value} onChange={this.handleChange}/>
                <input type='submit' onClick={this.handleSubmit}/>
            </div>
            {critical.map((critRoll, index)=>
                <div key={index} onClick={this.criticalPopup.bind(this, index)}>
                    <Description text={criticalText(critRoll)} />
                </div>
            )}
      </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        critical: state.critical,
        criticalText: criticalText(state),

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Critical);
