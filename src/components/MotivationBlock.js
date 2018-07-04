import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, CardFooter, CardHeader, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {changeData} from '../actions';

const seedrandom = require('seedrandom');
let rng = seedrandom('added entropy.', {entropy: true});


class Component extends React.Component {
    state = {description: this.props.masterMotivations[this.props.type].description};

    componentWillReceiveProps(nextProps) {
        this.setState({description: nextProps.masterMotivations[nextProps.type].description});
    }

    handleChange = (event) => {
        this.setState({description: event.target.value});
        event.preventDefault();
    };

    handleSelect = (event) => {
        const {masterMotivations, type, motivations, changeData} = this.props;
        let newObj = {...masterMotivations};
        newObj[type] = {
            key: event.target.value,
            description: motivations[type][event.target.value] ? motivations[type][event.target.value] : ''
        };
        changeData(newObj, 'masterMotivations');
        event.preventDefault();
    };

    handleBlur = (event) => {
        const {masterMotivations, type, changeData} = this.props;
        let newObj = {...masterMotivations};
        newObj[type].description = this.state.description;
        changeData(newObj, 'masterMotivations');
        event.preventDefault();
    };

    handleClick = () => {
        const {motivations, type, masterMotivations, changeData} = this.props;
        const list = Object.keys(motivations[type]);
        let newKey = list[Math.floor(rng() * list.length)];
        let newObj = {...masterMotivations};
        newObj[type] = {key: newKey, description: motivations[type][newKey]};
        changeData(newObj, 'masterMotivations')
    };

    render() {
        const {type, masterMotivations, motivations} = this.props;
        const name = masterMotivations[type].key;
        const {description} = this.state;
        return (
            <Card className='m-2' style={{width: '350px'}}>
                <CardHeader>
                    <InputGroup>
                        <InputGroupAddon className='m-auto' addonType='prepend'>{type}:</InputGroupAddon>
                        <Input type='select' onChange={this.handleSelect} style={{marginLeft: '1vw'}} value={name}>
                            <option value=''/>
                            {Object.keys(motivations[type]).map((key) =>
                                <option key={key} value={key}>{key}</option>
                            )}
                        </Input>
                    </InputGroup>
                </CardHeader>
                <CardBody>
                    <textarea onBlur={this.handleBlur}
                              onChange={this.handleChange}
                              rows='10'
                              style={{width: '100%'}}
                              className='textField'
                              maxLength='1000'
                              placeholder={description ? '' : `Enter your ${type}...`}
                              value={description ? description : ''}>
                    </textarea>
                </CardBody>
                <CardFooter>
                    <button onClick={this.handleClick}>Random</button>
                </CardFooter>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        masterMotivations: state.masterMotivations,
        motivations: state.motivations,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export const MotivationBlock = connect(mapStateToProps, matchDispatchToProps)(Component);
