import React from 'react';
import {connect} from 'react-redux';
import {Col, Input, Row} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';

class Component extends React.Component {
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
            <Col className='m-1'>
                <Row className='justify-content-end'><h5>CHARACTER DESCRIPTION</h5></Row>
                <hr/>
                {['gender', 'age', 'height', 'build', 'hair', 'eyes'].map((aspect) =>
                    <Row key={aspect} className='my-2'>
                        <b>{aspect.toLocaleUpperCase()}:</b>
                        <Input value={description[aspect]}
                               maxLength='25'
                               onBlur={this.handleBlur.bind(this, `${aspect}`)}
                               onChange={this.handleChange.bind(this, `${aspect}`)}/>
                        <hr/>
                    </Row>
                )}
                <Row className='my-2'>
                    <b>NOTABLE FEATURES:</b>
                    <textarea onChange={this.handleChange.bind(this, 'features')}
                              onBlur={this.handleBlur.bind(this, 'features')}
                              rows='12'
                              className='w-100'
                              maxLength='1000'
                              value={description.features ? description.features : ''}/>
                </Row>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        description: state.description,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export const CharacterDescription = connect(mapStateToProps, matchDispatchToProps)(Component);